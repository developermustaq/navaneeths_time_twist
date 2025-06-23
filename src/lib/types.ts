export type TaskStatus = 'active' | 'awaiting_action' | 'completed' | 'dead';

export type Task = {
  id: string;
  name: string;
  durationInAppHours: number;
  expiresAt: number;
  status: TaskStatus;
  actionDeadline?: number;
};
