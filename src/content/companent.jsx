import { createContext, useState } from "react";

export const State = createContext();

export const StateProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const data = {
    count,
    setCount,
  };
  return <State.Provider value={data}>{children}</State.Provider>;
};
