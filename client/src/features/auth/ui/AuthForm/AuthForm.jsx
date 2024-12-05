import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, message as antMessage } from "antd";
import UserValidator from "../../../../entities/user/User.validator";
import UserApi from "../../../../entities/user/UserApi";
import Button from "../../../../shared/ui/Button/Button";
import { setAccessToken } from "../../../../shared/lib/axiosInstance";

export default function AuthForm({ type, setUser }) {
  const [inputs, setInputs] = useState({
    email: "",
    phone: "",
    password: "",
    username: type === "signUp" ? "" : undefined,
    authMethod: "email",
  });

  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const changeHandler = ({ target }) => {
    setInputs((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const onRadioChange = (e) => {
    console.log("Selected authentication method", e.target.value);
    setInputs((prev) => ({
      ...prev,
      authMethod: e.target.value,
      email: "",
      phone: "",
    })); // Clear the corresponding input
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, phone, password, username, authMethod } = inputs;
    setLoading(true);

    const normalizedEmail = email.toLowerCase();

    try {
      let credentials;

      if (type === "signin") {
        credentials = authMethod === "email"
          ? { email: normalizedEmail, password }
          : { phone, password };

        const { isValid, error: validateError } = UserValidator.validateSignIn(credentials);
        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, message, data, error } = await UserApi.signIn(credentials);
        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 200) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "", phone: "" });
          navigate("/");
        }
      } else {
        credentials = {
          email: normalizedEmail,
          username,
          password,
          phone,
        };

        const { isValid, error: validateError } = UserValidator.validateSignUp(credentials);
        if (!isValid) {
          antMessage.error(validateError);
          return;
        }

        const { statusCode, message, data, error } = await UserApi.signUp(credentials);
        if (error) {
          antMessage.error(error);
          return;
        }

        antMessage.success(message);
        if (statusCode === 201) {
          setAccessToken(data.accessToken);
          setUser(data.user);
          setInputs({ email: "", password: "", username: "", phone: "", authMethod: "email" });
          navigate("/");
        }
      }
    } catch (error) {
      antMessage.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3>{type === "signin" ? "Вход" : "Регистрация"}</h3>
      <form onSubmit={submitHandler}>
        <Radio.Group onChange={onRadioChange} value={inputs.authMethod}>
          <Radio value="email">Email</Radio>
          <Radio value="phone">Phone</Radio>
        </Radio.Group>

        {inputs.authMethod === "email" && (
          <input
            onChange={changeHandler}
            type="email"
            name="email"
            value={inputs.email}
            placeholder="Email"
            required
            autoFocus
          />
        )}

        {inputs.authMethod === "phone" && (
          <input
            onChange={changeHandler}
            type="tel" // Changed to 'tel' for phone number input
            name="phone"
            value={inputs.phone}
            placeholder="Phone"
            required
          />
        )}
        
        <input
          onChange={changeHandler}
          type="password"
          name="password"
          value={inputs.password}
          placeholder="Password"
          required
        />
          <input
            onChange={changeHandler}
            name="username"
            value={inputs.username}
            placeholder="Username"
            required
          />
        
        
        <Button
          text={type === "signin" ? "Вход" : "Регистрация"}
          color="green"
          disabled={loading}
          type="submit"
        />
      </form>
    </>
  );
}
