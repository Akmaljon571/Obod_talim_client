import { useContext } from "react";
import { State } from "../content/companent";

function useComponent() {
  const { count, setCount } = useContext(State);
  return {
    count,
    setCount,
  };
}

export default useComponent;
