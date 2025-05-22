import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserStorage } from "@/hooks/use-storage";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  dateOfBirth: string;
  companyId: string;
};

type UserProviderProps = {
  children: ReactNode;
};

type UserContextProps = {
  userLogged: UserProps;
  setUserLogged: Dispatch<SetStateAction<UserProps>>;
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [userLogged, setUserLogged] = useState<UserProps>({} as UserProps);

  const userStorage = useCallback(async () => {
    const result = await getUserStorage();

    setUserLogged({
      id: result.data.id,
      name: result.data.name,
      email: result.data.email,
      dateOfBirth: result.data.dateOfBirth,
      phoneNumber: result.data.phoneNumber,
      role: result.data.role,
      companyId: result.data.companyId,
    });
  }, []);

  useEffect(() => {
    userStorage();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
