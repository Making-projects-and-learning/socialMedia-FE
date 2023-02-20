/** Libraries */
import { Link, useNavigate } from "react-router-dom";

import { Grid, TextField, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";

import { useFormik } from "formik";

/** Custom hooks */
import { useAuthStore, usePostStore, useSocket, useUiStore } from "../hooks";

/** Utils */
import { YupLoginValidations } from "../utils";
import { PostCreateArea } from "../components";
import { Navbar } from "../components/ui/Navbar";

/** Material UI - Custom components */
const HomeContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#e6e8ea",
}));

const NavbarSectionContainer = styled("div")(({ theme }) => ({
  width: "7.5%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blue",
}));

const PostSectionContainer = styled("div")(({ theme }) => ({
  width: "62.5%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  // backgroundColor: "red",
}));

const ChatsSectionContainer = styled("div")(({ theme }) => ({
  width: "30%",
  height: "100vh",
  minHeight: "650px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "green",
}));

export const HomePage = (): JSX.Element => {
  const { startLogout } = useAuthStore();
  const {
    newPostsAlert: { status, quantity },
  } = useUiStore();
  const { SocketConnect, SocketDisconnect } = useSocket();
  const { SocketNewPost } = usePostStore();

  const handleLogout = () => {
    SocketDisconnect();
    startLogout();
  };

  const handleNewPost = () => {
    SocketNewPost();
  };

  const handleLoadPosts = () => {
    SocketNewPost();
  };

  return (
    <HomeContainer>
      <NavbarSectionContainer>
        <Navbar />
      </NavbarSectionContainer>
      <PostSectionContainer>
        <PostCreateArea />
      </PostSectionContainer>
      <ChatsSectionContainer>
        <h1>Chats/Groups</h1>
      </ChatsSectionContainer>
    </HomeContainer>
  );
  // return (
  //   <>
  //     <h1>Hola mundo</h1>
  //     <button onClick={handleNewPost}>NEW POST</button>
  //     <button onClick={handleLogout}>LOGOUT</button>
  //     {status && (
  //       <button onClick={handleLoadPosts}>
  //         There are {quantity} posts available - click here
  //       </button>
  //     )}
  //   </>
  // );
};
