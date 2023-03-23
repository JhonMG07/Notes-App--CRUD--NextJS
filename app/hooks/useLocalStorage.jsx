import { useEffect, useState } from "react";

export function useLocalStorage(key, initialState) {

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const item = localStorage.getItem(key);
    const tasks = JSON.parse(item);
    if (tasks) {
      setState(tasks);
    }
  }, [key]);

  useEffect(() => {
    // cuando hay un cambio en el arreglo se va a guardar con el useEffect en el localStore
    localStorage.setItem(key, JSON.stringify(state));
  }, [key,state]);

  return [state, setState];
}
