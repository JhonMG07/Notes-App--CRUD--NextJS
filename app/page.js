"use client";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";

function Page() {
  const { tasks } = useTasks();

  return (
    <div className="flex justify-center">
      <div className="w-full h-screen">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Page;
