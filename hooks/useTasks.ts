import { useEffect, useState } from "react";

import { Tasks } from "@/lib/ablyConfig";
import { channel } from "@/lib/ablyClient";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Tasks | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      await channel.attach();
      const root = await channel.objects.getRoot();

      if (!root.get("tasks")) {
        await root.set("tasks", await channel.objects.createMap());
      }

      const tasksMap = root.get("tasks")! as Tasks;

      // subscribe to changes
      tasksMap.subscribe(() => {
        if (isMounted) setTasks(new Map(tasksMap.entries()) as any);
      });

      if (isMounted) setTasks(new Map(tasksMap.entries()) as any);
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  return tasks;
};
