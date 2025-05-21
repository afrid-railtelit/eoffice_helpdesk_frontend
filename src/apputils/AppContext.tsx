/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer, type ReactNode } from "react";

export type dispatchDataType = {
  type: string;
  payload: any;
};
export type contextType = {
  dispatch: React.Dispatch<dispatchDataType>;
  refresh: boolean;
  selectedPage: {
    title: string;
    desc: string;
    index: number;
  };
};

const initState: contextType = {
  dispatch: () => {},
  refresh: false,
  selectedPage: {
    title: "Dashboard",
    desc: "View,edit and more ..(Coming soon)",
    index: 0,
  },
};

const contextProvider = createContext(initState);

function reducer(state: contextType, action: dispatchDataType) {
  switch (action?.type) {
    case "setRefresh":
      return {
        ...state,
        refresh: !state?.refresh,
      };

    case "setPage":
      return {
        ...state,
        selectedPage: action?.payload,
      };

    default:
      throw new Error("Action unkonwn");
  }
}
export default function AppContext({ children }: { children: ReactNode }) {
  const [{ refresh, selectedPage }, dispatch] = useReducer(reducer, initState);

  return (
    <contextProvider.Provider
      value={{
        dispatch,
        selectedPage,
        refresh,
      }}
    >
      {children}
    </contextProvider.Provider>
  );
}

export function useAppContext() {
  const context = useContext(contextProvider);
  if (!context) throw new Error("Unable to use!");
  return context;
}
