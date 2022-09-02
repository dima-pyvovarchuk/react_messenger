import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>((): T => {
    const currentKey = localStorage.getItem(key);

    if (currentKey) {
      return JSON.parse(currentKey);
    }

    return initialValue;
  }); 

  const onSave = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  }

  return [value, onSave] as const;
}