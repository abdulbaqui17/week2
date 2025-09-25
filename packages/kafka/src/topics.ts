export const Topics = {
  ZapEvents: "zap-events",
  ZapRunRequested: "zap.run.requested",
  ZapRunCompleted: "zap.run.completed"
} as const;

export type Topic = typeof Topics[keyof typeof Topics];
