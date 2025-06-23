"use client";

import type { Task } from "@/lib/types";
import TaskItem from "@/components/task-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

type ActiveTasksListProps = {
  tasks: Task[];
  onUpdateTaskStatus: (id: string, status: 'completed' | 'dead') => void;
};

export default function ActiveTasksList({ tasks, onUpdateTaskStatus }: ActiveTasksListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Active Timers</CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onUpdateStatus={onUpdateTaskStatus} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-12 text-center">
            <p className="text-muted-foreground">No active tasks.</p>
            <p className="text-sm text-muted-foreground/80">Create a new task to start a timer.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
