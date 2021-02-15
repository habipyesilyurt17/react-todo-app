import { Form, Input, Button, DatePicker, Col } from "antd";
import { TodoContext } from "../../context/TodoContext";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import moment from "moment";
import Moment from "react-moment";

const AddForm = () => {
  const { t } = useTranslation();

  const { addTodo, todo, updateTodo } = useContext(TodoContext);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const onFinish = (values) => {
    if (todo.isNew) {
      addTodo(values.todo, moment(values.date, "mm/dd/yyyy"));
    } else {
      updateTodo(todo.key, values.todo, moment(values.date, "mm/dd/yyyy"));
    }
  };

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      todo: todo.todo,
      date: todo.isNew
        ? ""
        : moment(
            <Moment format="YYYY/MM/DD">{todo.date.props.children}</Moment>
          ),
    });
  });

  return (
    <>
      <Form form={form} {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          name="todo"
          rules={[
            {
              required: true,
              message: "Please input a todo!",
            },
          ]}
        >
          <Input style={{width: '300px'}} placeholder={t("placeholder.add-todo")} />
        </Form.Item>
        <Form.Item
          name="date"
          rules={[
            {
              required: true,
              message: "Please input due date for your todo!",
            },
          ]}
        >
          <DatePicker style={{width: '300px'}} placeholder= {t("placeholder.add-due-date")} />
        </Form.Item>

        <Form.Item  {...tailLayout}>
          <Button style={{width: '140px' }} type="primary" htmlType="submit">
            {t("buttons.save")}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddForm;