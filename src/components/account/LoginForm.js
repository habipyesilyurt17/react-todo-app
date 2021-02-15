import { useTranslation } from "react-i18next";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { withRouter } from "react-router-dom";

const Login = withRouter(({ history }) => {
  const { t } = useTranslation();

  const { Login } = useContext(AuthContext);

  const openNotificationWithIcon = (type) => {
    switch (type) {
      case "success":
        notification[type]({
          message: t("notification.success"),
          description: t("notification.success-desc"),
        });
        break;
      case "error":
        notification[type]({
          message: t("notification.fail"),
          description: t("notification.fail-desc"),
        });
        break;

      default:
        break;
    }
  };

  const onFinish = (values) => {
    Login(values.username, values.password).then((result) => {
      if (result) {
        openNotificationWithIcon("success");
        setTimeout(() => {
          history.push("/todo");
        }, 1000);
      } else {
        openNotificationWithIcon("error");
      }
    });
  };

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

  return (
    <Row>
      <Col span={8}></Col>
      <Col span={8}>
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: t("message-val.username"),
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: t("message-val.password"),
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {t("buttons.logedIn")}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});
export default Login;