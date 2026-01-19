
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../src/api/axios";

//export const AuthContext = createContext();

// export const ProtectContext = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         // Ensure cookies are sent
//         const { data } = await API.get("/users/profile", { withCredentials: true });
//         setUser(data.user);
//       } catch (err) {
//         setUser(null);
//         // Only navigate if not already on login
//         if (window.location.pathname !== "/login") navigate("/login");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [navigate]);

//   const login = async (credentials) => {
//     setLoading(true);
//     try {
//       const { data } = await API.post("/users/login", credentials, { withCredentials: true });
//       setUser(data.user);

//       const rolePath = {
//         admin: "/admin-dashboard",
//         customer: "/customer-dashboard",
//       };

//       const path = rolePath[data.user.role] || "/login";
//       navigate(path, { replace: true });
//       return data.user;
//     } catch (error) {
//       setUser(null);
//       if (error.response && error.response.data.error) {
//         throw new Error(error.response.data.error);
//       }
//       throw new Error("Something went wrong, please try again"); 
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     try {
//       await API.post("/users/logout", {}, { withCredentials: true });
//       setUser(null);
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout error:", err.message);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, setLoading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

//export const useAuth = () => useContext(AuthContext);


export const AuthContext = createContext();

export const ProtectContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // fetch profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/users/profile");
        setUser(data.user);
      } catch (err) {
        setUser(null);
        if (window.location.pathname !== "/login") navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await API.post("/users/login", credentials);
      setUser(data.user);
      localStorage.setItem("token", data.token); // store token
      const rolePath = { admin: "/admin-dashboard", customer: "/customer-dashboard" };
      navigate(rolePath[data.user.role] || "/login", { replace: true });
      return data.user;
    } catch (error) {
      setUser(null);
      if (error.response?.data?.error) throw new Error(error.response.data.error);
      throw new Error("Something went wrong, please try again");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token"); // remove token
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
