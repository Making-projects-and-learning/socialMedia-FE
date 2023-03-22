/** Libraries */
import { Link } from "react-router-dom";

import { Grid, TextField, Typography } from "@mui/material";

import { useFormik } from "formik";

import { GoogleLogin } from "@react-oauth/google";

import { useGoogleOneTapLogin, CredentialResponse } from "@react-oauth/google";

/** Custom hooks */
import { useAuthStore } from "../../hooks";

/** Layouts */
import AuthLayout from "../../layouts/AuthLayout";

/** Utils */
import { YupLoginValidations } from "../../utils";

/** Material UI - Custom components */
import {
  LoginCard,
  FieldsContainer,
  TitleContainer,
  LoginButtonContainer,
  LoginButton,
} from "./styled";

export const Login = (): JSX.Element => {
  const { startLogin, startGoogleLogin } = useAuthStore();

  /** Google oauth */
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse: CredentialResponse) => {
      startGoogleLogin(credentialResponse.credential!);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const formik = useFormik({
    initialValues: {
      username: "homelander",
      password: "12345678",
    },

    validationSchema: YupLoginValidations,
    onSubmit: async ({ username, password }, { resetForm }) => {
      startLogin(username, password);
      resetForm();
    },
  });

  const handleGoogleLogin = (response: any) => {
    const { credential } = response;

    if (credential) return startGoogleLogin(credential);
  };

  const FIELDS = [
    {
      label: "Username",
      name: "username",
      value: formik.values.username,
      onChange: formik.handleChange,
      error: formik.touched.username && Boolean(formik.errors.username),
      helperText: formik.touched.username && formik.errors.username,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: formik.values.password,
      onChange: formik.handleChange,
      error: formik.touched.password && Boolean(formik.errors.password),
      helperText: formik.touched.password && formik.errors.password,
    },
  ];

  const renderTitle = () => (
    <TitleContainer>
      <Typography component="h1" variant="h4">
        Login
      </Typography>
    </TitleContainer>
  );

  const renderForm = () => (
    <FieldsContainer onSubmit={formik.handleSubmit}>
      {FIELDS.map((field) => (
        <TextField key={field.name} fullWidth variant="standard" {...field} />
      ))}
      <LoginButtonContainer>
        <LoginButton type="submit">Login</LoginButton>
      </LoginButtonContainer>
      <Grid container justifyContent="center" mt={3}>
        <Grid item>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            useOneTap
          />
        </Grid>
      </Grid>
    </FieldsContainer>
  );

  const renderLink = () => (
    <Grid container justifyContent="flex-end" mt={3}>
      <Grid item>
        <Link to="/register">
          <Typography variant="inherit" color="#000">
            You do not have an account?
          </Typography>
        </Link>
      </Grid>
    </Grid>
  );

  return (
    <AuthLayout>
      <LoginCard>
        {renderTitle()}
        {renderForm()}
        {renderLink()}
      </LoginCard>
    </AuthLayout>
  );
};
