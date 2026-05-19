import type { KyInstance } from "ky";
import { z } from "zod";

import {
  taskCreateBodySchema,
  taskResponseSchema,
  type TaskCreateBody,
  type TaskResponse,
} from "../schemas/task.js";

const taskArraySchema = z.array(taskResponseSchema);

export async function createTask(
  client: KyInstance,
  input: TaskCreateBody
): Promise<TaskResponse> {
  const body = taskCreateBodySchema.parse(input);
  const raw: unknown = await client.post("tasks", { json: body }).json();
  return taskResponseSchema.parse(raw);
}

export async function listTasks(client: KyInstance): Promise<TaskResponse[]> {
  const raw: unknown = await client.get("tasks").json();
  return taskArraySchema.parse(raw);
}
