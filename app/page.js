"use client";
import { useTasks } from "../context/TaskContext";
import { TaskCard } from "../components/TaskCard";

function Page() {
  const { tasks } = useTasks();
  
  return (
    <div>
      {tasks.map((task) => (
       <TaskCard key={task.id} task={task}/>
      ))}
    </div>
    
  );
}

export default Page;
