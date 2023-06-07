// CustomContext.js
import React, { createContext, useState, useContext } from "react";

const itemContext = createContext();

function useValue() {
  const value = useContext(itemContext);
  return value;
}

function CustomContext({ children }) {
  const [userPresent, setUserPresent] = useState(false);

  return (
    <itemContext.Provider value={{ userPresent, setUserPresent }}>
      {children}
    </itemContext.Provider>
  );
}

export { useValue };
export default CustomContext;
