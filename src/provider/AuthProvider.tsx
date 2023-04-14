import { FC, PropsWithChildren } from "react";
import { useQuery } from "react-query";
import { refreshUserFn } from "../service/user.service";
import { useAuthStore } from "../store/useAuthStore";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  /* checking if user token still alive and on success getting user's data */

  const { setUser } = useAuthStore();
  useQuery(["authUser"], () => refreshUserFn(), {
    onSuccess: data => {
      setUser(data.user);
    },
  });

  return <>{children}</>;
};

export default AuthProvider;
