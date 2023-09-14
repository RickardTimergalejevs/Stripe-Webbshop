import { useState, useEffect, Dispatch, SetStateAction } from "react";

function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(defaultValue);
  
    useEffect(() => {
      try {
        const item = window.localStorage.getItem(key);
        setValue(item ? JSON.parse(item) : defaultValue);
      }
      catch (error) {
        setValue(defaultValue);
      }
      
    }, [key, defaultValue]);
  
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
  
    return [value, setValue];
  };

  export default useLocalStorage