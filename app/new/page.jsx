"use client";

import { useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation"
function Page() {
  const { createTask } = useTasks();
  const [task, setTask] = useState();
  const router = useRouter();
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); //para que no se recarge la pagina\
    createTask(task.title, task.description)
    router.push('/')


  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        placeholder="Write a title"
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="write a description"
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default Page;
