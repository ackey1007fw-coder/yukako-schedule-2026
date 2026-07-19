import { useEffect, useState } from "react";
import { fetchSchedule, getInitialSchedule } from "./scheduleApi";
import type { ScheduleData } from "../types/schedule";

export function useSchedule() {
  const [schedule, setSchedule] = useState<ScheduleData>(() => getInitialSchedule());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchSchedule().then((data) => {
      if (!isMounted) return;
      setSchedule(data);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { schedule, isLoading };
}
