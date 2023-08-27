import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

const INITIAL_STATE = { lightMode: false };

const themeReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE":
      return { lightMode: !state.lightMode };
    default:
      return state;
  }
};

export const ThemeProvider = (props) => {
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  // Load theme preference from local storage on app start
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch({ type: "TOGGLE" }); // Initialize the state with a dispatch
    }
  }, []);

  // Save theme preference to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.lightMode));
  }, [state.lightMode]);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
