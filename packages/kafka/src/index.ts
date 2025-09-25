import { Kafka, Partitioners, type Producer, type Consumer } from "kafkajs";

const { KAFKA_BROKERS = "localhost:9092", KAFKA_CLIENT_ID = "week2" } = process.env;

let _kafka: Kafka | null = null;
let _producer: Producer | null = null;

export function getKafka(): Kafka {
  if (_kafka) return _kafka;
  _kafka = new Kafka({
    clientId: KAFKA_CLIENT_ID,
    brokers: KAFKA_BROKERS.split(",").map(b => b.trim())
  });
  return _kafka;
}

export async function getProducer(): Promise<Producer> {
  if (_producer) return _producer;
  _producer = getKafka().producer({ createPartitioner: Partitioners.DefaultPartitioner });
  await _producer.connect();
  return _producer;
}

export async function createConsumer(groupId: string): Promise<Consumer> {
  const c = getKafka().consumer({ groupId });
  await c.connect();
  return c;
}
