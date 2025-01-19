"use client";

import { Task } from "@/components/Task/Task";
import { useParams } from "next/navigation";

export default function TaskPage() {
  const { id } = useParams();
  const numericId = Number(id);

  return <Task id={numericId} />;
}
