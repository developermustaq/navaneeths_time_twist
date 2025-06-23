"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlusCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Task name cannot be empty." }).max(100, { message: "Task name is too long." }),
  hours: z.coerce
    .number({ invalid_type_error: "Must be a number." })
    .min(0.01, { message: "Duration is too short." })
    .max(168, { message: "Duration is too long (max 168h)." }),
});

type TaskCreatorProps = {
  onCreateTask: (name: string, hours: number) => void;
};

export default function TaskCreator({ onCreateTask }: TaskCreatorProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hours: 1,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCreateTask(values.name, values.hours);
    form.reset();
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create a New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Task Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Master quantum mechanics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (in Navaneeth Hours)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.5" placeholder="e.g., 8" {...field} />
                  </FormControl>
                  <FormDescription>
                    Note: 1 Navaneeth Hour = 48 real-world hours.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <PlusCircle />
              Start Timer
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
