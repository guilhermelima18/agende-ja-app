import {
  createContext,
  ReactNode,
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
};

export const UserContext = createContext({} as UserContextProps);

export function UserProvider({ children }: UserProviderProps) {
  const [userLogged, setUserLogged] = useState<UserProps>({} as UserProps);

  useEffect(() => {
    (async () => {
      const user = await getUserStorage();
      setUserLogged({
        id: user.data.id,
        name: user.data.name,
        email: user.data.email,
        dateOfBirth: user.data.dateOfBirth,
        phoneNumber: user.data.phoneNumber,
        role: user.data.role,
        companyId: user.data.companyId,
      });
    })();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
