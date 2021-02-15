import { createContext, useState } from "react";
import axios from "axios";
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const API_URL = "https://602159aaae8f8700177de3f1.mockapi.io/api/users";

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) !== null ? JSON.parse(localStorage.getItem("user")) : {
      name: "",
      surname: "",
      username: "",
      password: "",
      isLoggedIn: false,
    })


  const Login = async (username, password) => {
    const result = await axios(
      "https://602159aaae8f8700177de3f1.mockapi.io/api/users"
    );

    const user = result.data.find(
      (res) => res.username === username && res.password === password
    );
    if (user) {
      setUser({
        name: user.name,
        surname: user.surname,
        username: user.username,
        password: user.password,
        isLoggedIn: true,
      });
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const Logout = () => {
    setUser({
      name: "",
      surname: "",
      username: "",
      password: "",
      isLoggedIn: false,
    });
    localStorage.removeItem("user");
  };

  const Register = async (name, surname, username, password) => {
    const result = await axios(
      "https://602159aaae8f8700177de3f1.mockapi.io/api/users"
    );

    if (result.data.filter((x) => x.username === username).length > 0) {
      return false;
    } else {
      axios
        .post(API_URL, {
          name,
          surname,
          username,
          password,
          isLoggedIn: false,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
        });
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, Login, Register, Logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;