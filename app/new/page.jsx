"use client";

import { useEffect, useState } from "react";
import { useTasks } from "@/context/TaskContext";
import { useRouter } from "next/navigation";
import {useForm} from "react-hook-form"

function Page({ params }) {
  // si ponemos params y entramos desde edit recibiremos el parametro id, y si entramos por new no.

  const { tasks, createTask, editTask } = useTasks();
  
  const router = useRouter();
  const {register,handleSubmit,setValue, formState:{
    errors
  }} = useForm();
  

  const onSubmit = handleSubmit((data) => {

    if(params.id){
      editTask(params.id,data); //se le pasa el params para que actualice la tarea que yo deseo
    }else{
      createTask(data.title, data.description);
    }
    router.push("/");
  })
    

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);

      if (taskFound) {
        setValue('title',taskFound.title);
        setValue('description',taskFound.description);
      }
    }
  }, [setValue,params.id, tasks]);

  return (
    <form onSubmit={onSubmit}>
      <input
        
        type="text"
        placeholder="Write a title"
        {...register("title", {required:true})} //hace la funcion de onchange cuando escribo algo
      />

      {errors.title && (
        <span>
          This field is required
        </span>
      )}
      <textarea
        
        placeholder="write a description"
        {...register("description",{required:true})}
      />
      {errors.description && (
        <span>
          This field is required
        </span>
      )}
      <button type="submit">Save</button>
    </form>
  );
}

export default Page;
