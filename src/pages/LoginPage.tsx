/** Libraries */
import { Link, useNavigate } from "react-router-dom";

import { Grid, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

import { GoogleLogin } from '@react-oauth/google';

import { useGoogleOneTapLogin } from '@react-oauth/google';

/** Custom hooks */
import { useAuthStore } from "../hooks";

/** Utils */
import { YupLoginValidations } from "../utils";

/** Material UI - Custom components */
const LoginContainer = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100vh",
    minHeight: "650px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e8ea"
}));

const SecondContainer = styled("div")(({ theme }) => ({
    width: "90%",
    height: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#fff",
}));

const FormContainer = styled("div")(({ theme }) => ({
    width: "45%",
    height: "95%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
        width: "95%",
    },
}));

const FieldsContainer = styled("form")(({ theme }) => ({
    width: "70%",
    height: "100%",
    marginTop: '7.5vh',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: '5vh'
}));

const TitleContainer = styled("div")(({ theme }) => ({
    width: "100%",
    height: "10vh",
    paddingLeft: '2.5vw',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
}));

const TitleFormContainer = styled("div")(({ theme }) => ({
    width: "100%",
    height: "5vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const ImageContainer = styled("div")(({ theme }) => ({
    width: "50%",
    height: "95%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '20px',
    mb: 1,
    overflow: 'hidden',
    border: 'none',
    [theme.breakpoints.down("sm")]: {
        display: "none",
    },
}));

const Image = styled("img")(({ theme }) => ({
    maxWidth: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "20% 10%",
    [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
        maxHeight: "100%",
    },
}));

const LoginButtonContainer = styled('div')(({ theme }) => ({
    width: '100%',
    height: "5vh",
    marginTop: '10px',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const LoginButton = styled('button')(({ theme }) => ({
    width: '100%',
    height: "5vh",
    color: '#fff',
    fontSize: '14px',
    backgroundColor: "#000",
    borderRadius: '20px',
    cursor: 'pointer',
    ":hover": {
        boxShadow: '5px 5px 5px 1px rgba(0, 0, 0, 0.2)',
        border: "none",
        transition: 'all 0.5s ease'
    },
}));

export const LoginPage = (): JSX.Element => {

    const { startLogin, startGoogleLogin } = useAuthStore();

    /** Google oauth */
    useGoogleOneTapLogin({
        onSuccess: credentialResponse => {
            startGoogleLogin(credentialResponse.credential!);
        },
        onError: () => {
            console.log('Login Failed');
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

    return (
        <LoginContainer>
            <SecondContainer>
                <FormContainer>
                    <TitleContainer>
                        <Typography variant="subtitle1">
                            Social media
                        </Typography>
                    </TitleContainer>
                    <FieldsContainer
                        onSubmit={formik.handleSubmit}
                    >
                        <TitleFormContainer>
                            <Typography variant="subtitle1" fontStyle="bold" fontSize="24px">
                                Login
                            </Typography>
                        </TitleFormContainer>
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.password && Boolean(formik.errors.password)
                            }
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <LoginButtonContainer>
                            <LoginButton type="submit">
                                Login
                            </LoginButton>
                        </LoginButtonContainer>
                        <Grid container justifyContent="center" mt={3}>
                            <Grid item>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handleGoogleLogin(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                    useOneTap
                                />
                            </Grid>
                        </Grid>
                    </FieldsContainer>
                    <Grid container justifyContent="flex-end" mt={3}>
                        <Grid item>
                            <Link to="/register">
                                <Typography variant="inherit" color="#1976D2">
                                    You do not have an account?
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </FormContainer>
                <ImageContainer>
                    <Image
                        src="https://insights.som.yale.edu/sites/default/files/styles/square_xl/public/2021-06/210606_AddictiveSocialMedia_FINAL_0.png?h=546ee6d1&itok=R_rj_X3q"
                        alt=""
                    />
                </ImageContainer>
            </SecondContainer>
        </LoginContainer>
    );
};
