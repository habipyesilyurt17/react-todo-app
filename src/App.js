import Navi from "./components/navi/Navi";
import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/account/LoginForm";
import Register from "./components/account/Register";
import TodoList from "./components/todo/TodoList";
import DateBlock from "./components/calender/DateBlock";
import AuthContextProvider from "./context/AuthContext";
import TodoContextProvider from "./context/TodoContext";
import { Row, Col } from "antd";

const App = () => {

  return (
    <>
      <AuthContextProvider>
        <Navi />
        <Switch>
          <Route path="/" exact></Route>
          <Route path="/login" render={(props) => <LoginForm />} />
          <Route
            path="/todo"
            render={(props) => (
              <TodoContextProvider>
                <Row>
                  <Col span={8}>
                    <TodoList />
                  </Col>
                  <Col span={15} offset={1}>
                    <DateBlock />
                  </Col>
                </Row>
              </TodoContextProvider>
            )}
          />
          <Route path="/register" render={(props) => <Register />} />
        </Switch>
      </AuthContextProvider>
    </>
  );
};

export default App;