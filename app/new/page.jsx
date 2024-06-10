"use client";

import { useEffect } from "react";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

function Page({ params }) {
  // si ponemos params y entramos desde edit recibiremos el parametro id, y si entramos por new no.

  const { tasks, createTask, editTask } = useTasks();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      editTask(params.id, data); //se le pasa el params para que actualice la tarea que yo deseo
      toast.success("task updated successfully");
    } else {
      createTask(data.title, data.description);
      toast.success("task created successfully");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);

      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, [setValue, params.id, tasks]);

  return (
    <div className="flex justify-center items-start h-screen w-full  ">
      <form onSubmit={onSubmit} className="bg-gray-700 p-10 sm: w-1/2 md:w-[70%] lg:w-2/6">
        <h2 className="m-2 text-2xl font-bold"> New Task</h2>
        <input
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })} //hace la funcion de onchange cuando escribo algo
        />

        {errors.title && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}
        <textarea
          className="bg-gray-800 py-3 px-4 mb-2 block focus:outline-none w-full h-[200px]"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}

        <div className="w-full flex justify-center">
          <button
            className=" w-1/2 mt-4 bg-green-500 hover:bg-green-400 px-2 py-3 rounded-sm disabled:opacity-30 "
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
