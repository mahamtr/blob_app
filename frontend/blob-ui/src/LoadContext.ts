import { Dispatch, SetStateAction, createContext } from "react";

type LoadContextType = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoadContext = createContext<LoadContextType>({
  isLoading: false,
  setIsLoading: () => {},
});
