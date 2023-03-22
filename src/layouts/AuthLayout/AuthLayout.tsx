import { styled } from "@mui/system";
import { Box, Typography } from "@mui/material";
const AuthBgContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#e6e8ea",
}));

const AuthWrapperContainer = styled(Box)(({ theme }) => ({
  width: "90%",
  height: "90%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden",
  backgroundColor: "#fff",
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
  },
}));

const AuthFormContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "95%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    width: "75%",
  },
}));

const AuthTitleContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "10vh",
  paddingLeft: "2.5vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  height: "95%",
  width: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 1,
  overflow: "hidden",
  border: "none",
  paddingRight: "15px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "20% 10%",
  borderRadius: "5px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

type AuthLayoutType = {
  children: JSX.Element;
};

const AuthLayout = ({ children }: AuthLayoutType) => {
  const renderAuthTitle = () => (
    <AuthTitleContainer>
      <Typography variant="subtitle1">Social Media</Typography>
    </AuthTitleContainer>
  );

  const renderImageContainer = () => (
    <ImageContainer>
      <Image src="https://source.unsplash.com/N0g-deioHO4" />
    </ImageContainer>
  );

  return (
    <AuthBgContainer>
      <AuthWrapperContainer>
        <AuthFormContainer>
          {renderAuthTitle()}
          {children}
        </AuthFormContainer>
        {renderImageContainer()}
      </AuthWrapperContainer>
    </AuthBgContainer>
  );
};

export default AuthLayout;
