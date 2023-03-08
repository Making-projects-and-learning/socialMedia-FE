/** Libraries */
import { Link, useNavigate } from "react-router-dom";

import { Grid, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Components */
import { NewPostsButton, PostCreateArea } from "../components";
import { Navbar } from "../components/ui/Navbar";

/** Custom hooks */
import { useAuthStore, usePostStore, useSocket, useUiStore } from "../hooks";

/** Utils */
import { YupLoginValidations } from "../utils";
import { Post } from "../components/posts/Post";

/** Material UI - Custom components */
const HomeContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
}));

const TitleContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: "7.5%",
  width: "60%",
  height: "17.5vh",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  paddingTop: "1vw",
  paddingLeft: "1.5vw",
  borderBottom: "1px solid #E9E9E9",
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  backdropFilter: "blur(12px)",
  zIndex: "3000",
  [theme.breakpoints.down("md")]: {
    width: "92.5%",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NavbarSectionContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "7.5%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "7.5vh",
  },
}));

const PostSectionContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "17.5vh",
  left: "7.5%",
  width: "60%",
  height: "auto",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    width: "92.5%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    top: "7.5vh",
    left: 0,
  },
}));

const ChatsSectionContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  width: "32.5%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid #E9E9E9",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const HomePage = (): JSX.Element => {
  const { posts } = usePostStore();

  return (
    <HomeContainer>
      <NavbarSectionContainer>
        <Navbar />
      </NavbarSectionContainer>
      <PostSectionContainer>
        <TitleContainer>
          <Typography fontSize="20px" variant="subtitle1" fontWeight="700">
            Home
          </Typography>
        </TitleContainer>
        <PostCreateArea />
        <NewPostsButton />
        {posts.length >= 1 && (
          <>
            {posts.map((e) => (
              <Post
                key={e._id}
                description={e.description}
                owner={e.owner}
                imageUrl={e.imageUrl}
                likedBy={e.likedBy}
              />
            ))}
          </>
        )}
      </PostSectionContainer>
      <ChatsSectionContainer>
        <h1>Chats/Groups</h1>
      </ChatsSectionContainer>
    </HomeContainer>
  );
};
