"use client";

import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { createContext, useContext, useState } from "react";
import { v4 as uuid } from "uuid";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) throw new Error("useTasks must used within a provider");
  return context;
};

export const TaskProvider = ({ children }) => {
  //aqui le pouedo pasar una variable global y dentro del <> le doyy un value ={}

  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const createTask = (title, description) =>
    setTasks([
      ...tasks,
      {
        title,
        description,
        id: uuid(),
        isFinished: false,
        createdAt: new Date().toLocaleDateString(),
      },
    ]);

  const deleteTask = (id) => {
    setTasks([...tasks.filter((task) => task.id !== id)]); //recorre todo el arreglo y si encuentra la id que se pasa entonces no se agrega al arreglo
  };

  const editTask = (id, updatedTask) => {
    setTasks([
      ...tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    ]);
  };
  const makeToTaskFinish = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isFinished: !task.isFinished } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        deleteTask,
        editTask,
        makeToTaskFinish,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
