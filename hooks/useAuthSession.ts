import { clearAuth, setToken, setUser } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const checkSession = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.status === 200) {
            dispatch(setUser(response.data));
            dispatch(setToken(token));
          }
        } catch (error) {
          dispatch(clearAuth());
        }
      }
    };

    checkSession();
  }, [dispatch]);

  return user;
};

export default useAuthSession;
