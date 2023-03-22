import { Grid, Typography } from "@mui/material";
import AuthLayout from "../../layouts/AuthLayout";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useFormik } from "formik";
import { YupRegisterValidations } from "../../utils";
import {
  Form,
  GridContainer,
  AuthTextField,
  AuthButton,
  AuthLink,
  RegisterCard,
} from "./styled";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeated_password: "",
    },
    validationSchema: YupRegisterValidations,
    onSubmit: (data, { resetForm }) => {
      console.log(data);
      resetForm();
    },
  });

  const FIELDS = [
    {
      label: "Name",
      type: "text",
      name: "name",
      value: formik.values.name,
      onChange: formik.handleChange,
      error: formik.touched.name && !!formik.errors.name,
      helperText: formik.touched.name && formik.errors.name,
    },
    {
      label: "Email",
      type: "text",
      name: "email",
      value: formik.values.email,
      onChange: formik.handleChange,
      error: formik.touched.email && !!formik.errors.email,
      helperText: formik.touched.email && formik.errors.email,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: formik.values.password,
      onChange: formik.handleChange,
      error: formik.touched.password && !!formik.errors.password,
      helperText: formik.touched.password && formik.errors.password,
    },
    {
      label: "Confirm password",
      type: "password",
      name: "repeated_password",
      value: formik.values.repeated_password,
      onChange: formik.handleChange,
      error:
        formik.touched.repeated_password && !!formik.errors.repeated_password,
      helperText:
        formik.touched.repeated_password && formik.errors.repeated_password,
    },
  ];

  const handleGoogleOnSuccess = (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
  };

  const renderTitle = () => {
    return (
      <Typography component="h1" variant="h4">
        Register
      </Typography>
    );
  };

  const renderForm = () => (
    <Form onSubmit={formik.handleSubmit}>
      <GridContainer container flexDirection="column">
        {FIELDS.map((field) => (
          <Grid item key={field.name}>
            <AuthTextField variant="standard" {...field} />
          </Grid>
        ))}
        <Grid item>
          <AuthButton type="submit">Register</AuthButton>
        </Grid>
      </GridContainer>
    </Form>
  );

  const renderGoogleLogin = () => (
    <Grid container justifyContent={"center"} marginTop="30px">
      <Grid item>
        <GoogleLogin onSuccess={handleGoogleOnSuccess} />
      </Grid>
    </Grid>
  );

  const renderLink = () => (
    <Grid
      container
      justifyContent="flex-end"
      marginTop="20px"
      marginRight="20px"
    >
      <Grid item>
        <AuthLink to="/login">Already has an account Sign up</AuthLink>
      </Grid>
    </Grid>
  );

  return (
    <AuthLayout>
      <RegisterCard>
        {renderTitle()}
        {renderForm()}
        {renderGoogleLogin()}
        {renderLink()}
      </RegisterCard>
    </AuthLayout>
  );
};

export default Register;
