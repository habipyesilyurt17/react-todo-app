import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "antd";
import { TranslationOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const { SubMenu } = Menu;

const Navi = () => {

  const { user, Logout } = useContext(AuthContext);

  const { t, i18n } = useTranslation();
  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link to="/">{t("Navigation.todo_app")}</Link>
        </Menu.Item>
        <SubMenu style={{ float: "right" }} icon={<TranslationOutlined />}>
          <Menu.Item onClick={() => handleClick("tr")}>
            {t("langs.tr")}
          </Menu.Item>
          <Menu.Item onClick={() => handleClick("en")}>
            {t("langs.en")}
          </Menu.Item>
        </SubMenu>

        {user.isLoggedIn && (
          <Menu.Item style={{ float: "right" }} onClick={Logout} >
            <Link to="login">{t("Navigation.logout")}</Link>
          </Menu.Item>
        )}
        {!user.isLoggedIn && (
          <Menu.Item style={{ float: "right" }}>
            <Link to="register">{t("Navigation.register")}</Link>
          </Menu.Item>
        )}
        {!user.isLoggedIn && (
          <Menu.Item style={{ float: "right" }}>
            <Link to="login">{t("Navigation.login")}</Link>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
};

export default Navi;