import styles from "./Navigation.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Button from "../../shared/ui/Button/Button";
import { message as antMessage } from "antd";
import UserApi from "../../entities/user/UserApi";
import { setAccessToken } from "../../shared/lib/axiosInstance";
import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';

export default function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const signOutHandler = async () => {
    try {
      const { statusCode, error, message } = await UserApi.signOut();
      if (error) {
        antMessage.error(error);
        return;
      }

      antMessage.success(message);
      if (statusCode === 200) {
        setAccessToken("");
        setUser(null);
        navigate("/"); 
      }
    } catch (error) {
      antMessage.error(error.message);
      console.log(error);
    }
  };

  return (
    <div className={styles.navigationWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Button text="Книжный червь" onClick={() => navigate("/")} className={styles.logoButton} />
        </div>
        <div className={styles.userSection}>
          {user ? (
            <>
              <span className={styles.welcomeMessage}>Добро пожаловать, {user.username}</span>
              <Link to="/create_book" className={styles.link}>
                <Button 
                  text="Добавить новую книгу" 
                  icon={<PlusOutlined />} 
                  className={styles.authButton} 
                />
              </Link>
              <Button 
                text="Выход" 
                onClick={signOutHandler} 
                icon={<LogoutOutlined />} 
                className={`${styles.authButton} ${styles.signOutButton}`} 
              />
            </>
          ) : (
            <>
              <Link to="/signin" className={styles.link}>
                <Button text="Signin" className={styles.authButton} />
              </Link>
              <Link to="/signup" className={styles.link}>
                <Button text="Signup" className={styles.authButton} />
              </Link>
            </>
          )}
        </div>
      </nav>
      
      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <h3>Контактная информация</h3>
          <p>Электронная почта: <a href="mailto:support@bookworm.com">support@bookworm.com</a></p>
          <p>Телефон: <a href="tel:+18001234567">+1 (800) 123-4567</a></p>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; Книжный червь. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
