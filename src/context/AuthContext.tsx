import React from "react";
import { User } from "../types";
import AuthService from "../utils/authService";

interface AuthContextType {
  user: User | null;
  signin: (email: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  isFetching: boolean;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [isFetching, setIsFetching] = React.useState(true);

  React.useEffect(() => {
    const token = AuthService.getToken();

    if (token) {
      setUser({
        email: "talmeezahmed786@gmail.com",
        name: "Talmeez Ahmed",
        token,
      });
    }
    setIsFetching(false);
  }, []);

  const signin = async (
    email: string,
    password: string,
    callback: VoidFunction
  ) => {
    const token = await AuthService.login(email, password);
    setUser({
      email: email,
      name: "Talmeez Ahmed",
      token,
    });
    callback();
  };

  const signout = (callback: VoidFunction) => {
    AuthService.logout();
    setUser(null);
    callback();
  };

  const value = { user, signin, signout, isFetching };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be user within an AuthContextProvider");
  }

  return context;
}
