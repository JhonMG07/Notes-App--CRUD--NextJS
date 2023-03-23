import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";

export const TaskCard = ({ task }) => {

  const router = useRouter();
  const { deleteTask } = useTasks(); //parente importantes para los hooks

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      style={{ background: "#202020", color: "white" }}
      onClick={() => router.push(`/edit/${task.id}`)}
    >
      <h1>{task.title}</h1>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();//para que no siga con el evento de atras, en este caso seria el evento edit
          
          const accept = window.confirm('Are you sure?');
          if (accept) deleteTask(task.id);
         
        }}
      >
        Delete
      </button>
      <p>{task.description}</p>
    </div>
  );
};
