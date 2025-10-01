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

// New utility functions
const KAFKA_BROKER = process.env.KAFKA_BROKER || 'kafka:9092';

export async function waitForKafka(maxMs: number = 30000): Promise<void> {
  const kafka = new Kafka({
    clientId: 'kafka-wait',
    brokers: [KAFKA_BROKER],
  });
  const admin = kafka.admin();
  const startTime = Date.now();
  let delay = 1000; // Start with 1s

  while (Date.now() - startTime < maxMs) {
    try {
      await admin.connect();
      await admin.disconnect();
      return;
    } catch (error) {
      if (Date.now() - startTime + delay >= maxMs) {
      throw new Error(`Failed to connect to Kafka at ${KAFKA_BROKER} within ${maxMs}ms: ${error instanceof Error ? error.message : String(error)}`);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error(`Failed to connect to Kafka at ${KAFKA_BROKER} within ${maxMs}ms`);
}

export function makeProducer(): Producer {
  const kafka = new Kafka({
    clientId: 'producer-client',
    brokers: [KAFKA_BROKER],
  });
  return kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
}
