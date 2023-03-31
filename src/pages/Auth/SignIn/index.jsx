import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import styled from "styled-components";
import { usePostData } from "../../../utils/hooks";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../utils/axios";
import { queryClient } from "../../../index";
import { useUser } from "../../../utils/state";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999999999999999999999999;
  background-color: #fff;
`;
const Head = styled.div`
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  font-family: "Courier New", Courier, monospace;
  color: rgba(0, 80, 54, 0.9);
`;

const SignIn = () => {
  const nav = useNavigate();
  const setUser = useUser((s) => s.setUser);

  const postMut = usePostData("/auth/signin");

  const { t } = useTranslation();

  const onFinish = (values) => {
    postMut.mutate(
      {
        ...values,
      },
      {
        onSuccess: (d) => {
          setUser(d);
          localStorage.setItem(
            "access_token",
            JSON.stringify(d?.data?.access_token)
          );
          queryClient.invalidateQueries(["userGetMe"]);
          nav("/");
        },
        onError: (d) => {
          alert(d?.message);
        },
      }
    );
  };

  return (
    <Container>
      <>
        <Head>Sign In</Head>

        <Form
          name="normal_login"
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          style={{
            minWidth: 500,
          }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: t("Please, input your ", { text: t("username") }),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder={t("username")}
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: t("Please, input your ", { text: t("Email") }),
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder={t("email")}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("Please, input your ", { text: t("password") }),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder={t("password")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={postMut.isLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </>
    </Container>
  );
};

export default SignIn;
