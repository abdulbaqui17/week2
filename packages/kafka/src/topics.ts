export const Topics = {
  ZapEvents: "zap-events",
  ZapRunRequested: "zap.run.requested",
  ZapRunCompleted: "zap.run.completed",
  ZapTrigger: "zap.trigger"
} as const;

export type Topic = typeof Topics[keyof typeof Topics];
