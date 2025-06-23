"use client";

import type { Task, TaskStatus } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle } from "lucide-react";

type ArchivedTasksListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks, status }: { tasks: Task[]; status: TaskStatus }) => (
  <div className="space-y-2">
    {tasks.filter(t => t.status === status).length > 0 ? (
      tasks.filter(t => t.status === status).map(task => (
        <div key={task.id} className="flex items-center justify-between rounded-md border p-3 bg-muted/50 animate-in fade-in-50 duration-300">
          <div>
            <p className="font-medium">{task.name}</p>
            <p className="text-xs text-muted-foreground">Original duration: {task.durationInAppHours} hour(s)</p>
          </div>
        </div>
      ))
    ) : (
      <p className="py-8 text-center text-sm text-muted-foreground">No {status} tasks yet.</p>
    )}
  </div>
);

export default function ArchivedTasksList({ tasks }: ArchivedTasksListProps) {
  if (tasks.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Archived Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="completed">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed">
              <CheckCircle className="mr-2" /> Completed
            </TabsTrigger>
            <TabsTrigger value="dead">
              <XCircle className="mr-2" /> Dead
            </TabsTrigger>
          </TabsList>
          <TabsContent value="completed">
            <TaskList tasks={tasks} status="completed" />
          </TabsContent>
          <TabsContent value="dead">
            <TaskList tasks={tasks} status="dead" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
