import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const TaskCard = ({ task }) => {
  const router = useRouter();
  const { deleteTask } = useTasks(); //parente importantes para los hooks
  const { makeToTaskFinish } = useTasks(); //parente importantes para los hooks

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <>
      <div className="bg-gray-700 hover:bg-slate-600 cursor-auto px-5 py-5 m-2 w-full">
        <div className="flex justify-between">
          <h1
            className={`font-bold text-2xl uppercase ${
              task.isFinished ? "line-through" : ""
            }`}
          >
            {task.title}
          </h1>
          {/* titulo */}
          <div className="w-[150px] flex justify-between">
            <button
              className="bg-red-700 hover:bg-red-600 px-3 py-1 "
              type="button"
              onClick={(e) => {
                e.stopPropagation(); //para que no siga con el evento de atras, en este caso seria el evento edit

                const accept = window.confirm("Are you sure?");
                if (accept) {
                  deleteTask(task.id);
                  toast.success("task deleted successfully");
                }
              }}
            >
              Delete
            </button>
            <button
              onClick={() => router.push(`/edit/${task.id}`)}
              type="button"
              className={`${
                task.isFinished
                  ? "bg-gray-500"
                  : "bg-yellow-700 hover:bg-yellow-600"
              }  px-3 py-1`}
              disabled={task.isFinished}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col">
            <p className="text-gray-300 first-letter:capitalize mb-4">{task.description}</p>
            <span className="text-gray-400 text-xs opacity-60">
              {" "}
              {task.createdAt}
            </span>
            <span className="text-gray-400 text-xs opacity-25"> {task.id}</span>
          </div>
          <div class="inline-flex items-center">
            <label
              class="relative flex cursor-pointer items-center rounded-full p-3"
              for="login"
              data-ripple-dark="true"
            >
              <input
                id="login"
                type="checkbox"
                checked={task.isFinished ? true : false}
                class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-green-500 checked:bg-green-500 checked:before:bg-green-500 hover:before:opacity-10"
                onChange={() => makeToTaskFinish(task.id)}
              />
              <div class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </label>
            <label class="mt-px cursor-pointer select-none text-sm" for="login">
              Task finished
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
