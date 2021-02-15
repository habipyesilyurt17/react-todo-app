import { useTranslation } from "react-i18next";
import { Form, Input, Button, Row, Col, notification } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { withRouter } from "react-router-dom";

const Register = withRouter(({ history }) => {
  const { t } = useTranslation();

  const { Register } = useContext(AuthContext);


  const openNotificationWithIcon = (type) => {
    switch (type) {
      case "success":
        notification[type]({
          message: t("notification.success"),
          description: t("notification.record-success"),
        });
        break;
      case "error":
        notification[type]({
          message: t("notification.fail"),
          description: t("notification.record-fail"),
        });
        break;

      default:
        break;
    }
  };

  const onFinish = (values) => {
    Register(
      values.name,
      values.surname,
      values.username,
      values.password,
      values.isLoggedIn
    ).then((result) => {
      if (result) {
        openNotificationWithIcon("success");
        setTimeout(
          () => {
            history.push("/login");
          },1000
        );
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: t("message-val.name"),
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: t("message-val.surname"),
              },
            ]}
          >
            <Input />
          </Form.Item>

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
              {t("buttons.save")}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});

export default Register;