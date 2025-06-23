"use client";

import type { Task } from "@/lib/types";
import { useState, useEffect, useMemo, useCallback } from "react";
import TaskCreator from "@/components/task-creator";
import ActiveTasksList from "@/components/active-tasks-list";
import ArchivedTasksList from "@/components/archived-tasks-list";

const TEMPORAL_HOUR_IN_MS = 48 * 60 * 60 * 1000; // 1 temporal hour = 48 real hours

export default function TemporalTwistApp() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("temporalTwistTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("temporalTwistTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) => {
        const now = Date.now();
        let hasChanges = false;
        const updatedTasks = prevTasks.map((task) => {
          if (task.status === 'active' && now >= task.expiresAt) {
            hasChanges = true;
            return {
              ...task,
              status: 'awaiting_action' as const,
              actionDeadline: now + 30 * 60 * 1000,
            };
          }
          if (
            task.status === 'awaiting_action' &&
            task.actionDeadline &&
            now >= task.actionDeadline
          ) {
            hasChanges = true;
            return { ...task, status: 'dead' as const };
          }
          return task;
        });

        return hasChanges ? updatedTasks : prevTasks;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCreateTask = useCallback((name: string, hours: number) => {
    const now = Date.now();
    const newTask: Task = {
      id: `task-${now}`,
      name,
      durationInAppHours: hours,
      expiresAt: now + hours * TEMPORAL_HOUR_IN_MS,
      status: "active",
    };
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const handleUpdateTaskStatus = useCallback((id: string, status: 'completed' | 'dead') => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  }, []);

  const activeTasks = useMemo(() =>
    tasks.filter((task) => task.status === "active" || task.status === "awaiting_action"),
    [tasks]
  );
  
  const archivedTasks = useMemo(() =>
    tasks.filter((task) => task.status === "completed" || task.status === "dead"),
    [tasks]
  );

  return (
    <div className="space-y-8">
      <TaskCreator onCreateTask={handleCreateTask} />
      <ActiveTasksList tasks={activeTasks} onUpdateTaskStatus={handleUpdateTaskStatus} />
      <ArchivedTasksList tasks={archivedTasks} />
    </div>
  );
}
