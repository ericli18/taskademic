"use server";
import { revalidateTag } from "next/cache";

export const revalidate = () => {
  revalidateTag("todos");
};

export const deleteTodo = async (id) => {
  const url = 'http://localhost:9000' //TODO: CHANGE
  await fetch(`${url}/deletePersonalTask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ personalTaskId: id }),
  });
  revalidate();
};