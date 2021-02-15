import { useContext, useState, useEffect } from "react";
import { Table, Space, Modal, Button } from "antd";
import TodoForm from "./TodoForm";
import { useTranslation } from "react-i18next";
import { TodoContext } from "../../context/TodoContext";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Moment from "react-moment";



const TodoList = () => {
  const { t } = useTranslation();

  const { Column } = Table;

  const { todos, deleteTodo, completedTodo, setTodoForm } = useContext(
    TodoContext
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const showModal = (key, todo, date, completed, isNew) => {
    if (isNew) {
      setTodoForm("", "", "", "", true);
      setModalTitle(t("todo-form-title.add_todo"));

    } else {
      date = <Moment format="YYYY/MM/DD">{date.props.children}</Moment>
      setTodoForm(key, todo, date, completed, false);
      setModalTitle(t("todo-form-title.update_todo"));
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    handleCancel();
  }, [todos]);

  return (
    <>
      <Space style={{ marginBottom: 10, marginTop: 15, marginLeft: 15 }}>
        <Button
          type="primary"
          onClick={() => showModal("", "", "", false, true)}
        >
          <PlusOutlined />
          <span>{t("buttons.addTodo")}</span>
        </Button>
        <Modal
          title={modalTitle}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <TodoForm />
        </Modal>
      </Space>
      <Table dataSource={todos}>
        <Column
          title="Todo"
          key="todo"
          render={(text, record) => (
            <Space className={record.completed ? "completed" : ""}>
              {record.todo}
            </Space>
          )}
        />
        <Column title="Due Date" key="date" render={(text, record) => (
          <Space>
            <Moment format="YYYY/MM/DD">{record.date.props.children}</Moment>
        </Space>
        )}/>

        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              {/* buraya i18n göre yapılcak */}
              {
                <EditOutlined
                  title={t("actions.edit")}
                  style={{ color: "blue" }}
                  onClick={() =>
                    showModal(
                      record.key,
                      record.todo,
                      record.date,
                      record.completed,
                      false
                    )
                  }
                />
              }

              {
                <DeleteOutlined
                  title={t("actions.delete")}
                  style={{ color: "red" }}
                  onClick={() => deleteTodo(record.key)}
                />
              }

              {
                <CheckOutlined
                  title={t("actions.completed")}
                  style={{ color: "green" }}
                  onClick={() => completedTodo(record.key)}
                />
              }
            </Space>
          )}
        />
      </Table>
    </>
  );
};
export default TodoList;