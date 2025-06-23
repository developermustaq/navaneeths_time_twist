"use client";

import type { Task } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TimerDisplay from "@/components/timer-display";
import { Check, X } from "lucide-react";

type TaskItemProps = {
  task: Task;
  onUpdateStatus: (id: string, status: 'completed' | 'dead') => void;
};

export default function TaskItem({ task, onUpdateStatus }: TaskItemProps) {
  return (
    <Card className="w-full transition-all duration-300 ease-in-out hover:shadow-primary/10 hover:shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <CardHeader>
        <CardTitle className="font-body font-semibold">{task.name}</CardTitle>
        <CardDescription>
          Original Duration: {task.durationInAppHours} Navaneeth hour(s)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {task.status === "active" && <TimerDisplay expiresAt={task.expiresAt} />}
        {task.status === "awaiting_action" && (
          <div className="text-center p-4 bg-accent rounded-md">
            <p className="font-semibold text-accent-foreground">Time's up! What's the verdict?</p>
            {task.actionDeadline && (
              <p className="text-sm text-accent-foreground/80">
                This task will die in <TimerDisplay expiresAt={task.actionDeadline} isActionDeadline={true} />
              </p>
            )}
          </div>
        )}
      </CardContent>
      {task.status === "awaiting_action" && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={() => onUpdateStatus(task.id, 'dead')}>
            <X className="mr-1 h-4 w-4" /> Not Completed
          </Button>
          <Button size="sm" onClick={() => onUpdateStatus(task.id, 'completed')}>
            <Check className="mr-1 h-4 w-4" /> Mark as Completed
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
