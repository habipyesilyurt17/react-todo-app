import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Moment from "react-moment";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (todos === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  });

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos === null) {
      setTodos([]);
    } else {
      setTodos(
        todos.filter(
          (x) =>
            x.username === JSON.parse(localStorage.getItem("user")).username
        )
      );
    }
  }, []);

  const addTodo = (todo, date) => {
    setTodos([
      ...todos,
      {
        key: uuidv4(),
        todo,
        date: <Moment format="YYYY/MM/DD">{date["_d"]}</Moment>,
        completed: false,
        username: JSON.parse(localStorage.getItem("user")).username,
      },
    ]);
  };

  const [todo, setTodo] = useState({
    key: "",
    todo: "",
    date: "",
    completed: false,
    isNew: true,
  });

  const setTodoForm = (key, todos, date, completed, isNew) => {
    setTodo({ key, todo: todos, date, completed, isNew });
  };

  const deleteTodo = (key) => {
    setTodos(todos.filter((todo) => todo.key !== key));
  };

  const updateTodo = (key, todo, date) => {
    todos.find((x) => x.key === key).todo = todo;
    todos.find((x) => x.key === key).date = (
      <Moment format="YYYY/MM/DD">{date["_d"]}</Moment>
    );
    setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const completedTodo = (key) => {
    setTodos(
      todos.map((todo) =>
        todo.key === key ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        setTodoForm,
        todos,
        addTodo,
        deleteTodo,
        updateTodo,
        completedTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;