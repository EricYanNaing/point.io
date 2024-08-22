import { Form, Input, message } from "antd";
import { loginUser, registerUser } from "../apicalls/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const AuthForm = ({ isLoginPage }) => {
  const [submitting, setSubmittting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOnFinish = async (values) => {
    setSubmittting(true);
    // Login
    if (isLoginPage) {
      try {
        const resposne = await loginUser(values);
        if (resposne.isSuccess) {
          message.success(resposne.message);
          localStorage.setItem("token", resposne.token);
          dispatch(setUser(resposne.token));
          navigate("/profile");
        } else {
          throw new Error(resposne.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    } else {
      // Register
      try {
        const resposne = await registerUser(values);
        if (resposne.isSuccess) {
          message.success(resposne.message);
          navigate("/login");
        } else {
          throw new Error(resposne.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }
    setSubmittting(false);
  };
  return (
    <section className="h-screen flex w-full items-center justify-center">
      <div className="w-[450px]">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">
          POINT.IO - {isLoginPage ? "Login" : "Register"}
        </h1>
        <Form layout="vertical" onFinish={handleOnFinish}>
          {!isLoginPage && (
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Name must be included." },
                { min: 3, message: "Name must have 3 words at least." },
              ]}
              hasFeedback
            >
              <Input placeholder="username..." />
            </Form.Item>
          )}
          <Form.Item
            hasFeedback
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email must be included." },
              { type: "email", message: "Enter a valid E-mail." },
            ]}
          >
            <Input placeholder="email..." />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password must be included." },
              { min: 5, message: "Password must have 5 words at least." },
            ]}
          >
            <Input.Password placeholder="password..." />
          </Form.Item>
          <Form.Item>
            <button
              className="w-full outline-none bg-blue-600 text-white py-2 rounded-md"
              disabled={submitting}
            >
              {isLoginPage && !submitting && "Login"}
              {!isLoginPage && !submitting && "Register"}
              {submitting && "Submitting"}
            </button>
          </Form.Item>
          <p>
            {isLoginPage ? (
              <p>
                Dont have an account ?
                <Link
                  to={"/register"}
                  className="underline font-medium hover:text-blue-800 text-blue-600"
                >
                  {" "}
                  Register Here
                </Link>
              </p>
            ) : (
              <p>
                {" "}
                Already have an account ?
                <Link
                  to={"/login"}
                  className="underline font-medium hover:text-blue-800 text-blue-600"
                >
                  {" "}
                  Login Here
                </Link>
              </p>
            )}
          </p>
        </Form>
      </div>
    </section>
  );
};

export default AuthForm;
