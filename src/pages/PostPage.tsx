/** Libraries */
import React, { useState } from "react";

import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { styled } from "@mui/material/styles";

/** Components */
import { DeletePostModal } from "../components";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../hooks";

/** Interfaces */
import { User } from "../interfaces/user.interface";
import { useParams } from "react-router-dom";

/** Material UI - Custom components */
const PostContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    transition: "0.3s ease-out all",
    // transition: "opacity 0.3s ease-out 0s",
  },
}));

const AvatarContainer = styled("div")(({ theme }) => ({
  width: "10%",
  minHeight: "25vh",
  height: "max-content",
  paddingTop: "2.5vw",
  paddingLeft: "1vw",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  "& .MuiAvatar-root": {
    height: "50px",
    width: "50px",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: "3vw",
    paddingLeft: "2.5vw",
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: "5vw",
    paddingLeft: "2.5vw",
  },
}));

const SecondContainer = styled("form")(({ theme }) => ({
  width: "90%",
  minHeight: "20vh",
  height: "100%",
  margin: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
}));

const OptionsButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const DeleteIconbutton = styled(IconButton)(({ theme }) => ({
  position: "relative",
  right: "0",
  top: "0",
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

const ItemsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "5px",
  paddingTop: "20px",
  marginBottom: "10px",
  borderTop: "1px solid #E9E9E9",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const DescriptionContainer = styled("div")(({ theme }) => ({
  // height: "auto",
  minHeight: "10vh",
  width: "100%",
  overflowY: "visible",
  padding: "10px",
  marginLeft: "-2.5vw",
  marginBottom: "10px",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "start",
}));

const ImageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "95%",
  minHeight: "25ch",
  minWidth: "25ch",
  display: "flex",
  alignItems: "start",
  justifyContent: "flex-start",
  mb: 1,
  overflow: "hidden",
  border: "none",
}));

const Image = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "20% 10%",
  borderRadius: "15px",
  border: "1px solid #E9E9E9",
}));

const CommentIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

const CommentFont = styled(Typography)(({ theme }) => ({
  color: "rgb(83, 100, 113)",
  fontWeight: 700,
  fontSize: "18px",
}));

const LikeIconButton = styled(IconButton)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    fontSize: "25px",
  },
}));

const CustomFavoriteIcon = styled(FavoriteIcon)(({ theme }) => ({
  color: "rgb(249, 24, 128)",
}));

const UsernameFont = styled(Typography)(({ theme }) => ({
  color: "rgb(15, 20, 25)",
  fontWeight: 700,
  fontSize: "20px",
  marginTop: "-3.5vh",
  marginLeft: "-0.5vw",
  marginBottom: "5vh",
  [theme.breakpoints.down("sm")]: {
    marginTop: "-4vh",
    marginLeft: "2vw",
  },
}));

const DescriptionFont = styled(Typography)(({ theme }) => ({
  // color: "rgb(249, 24, 128)",
}));

const FavoriteIconQuantityFont = styled(Typography)(({ theme }) => ({
  color: "rgb(249, 24, 128)",
  fontWeight: 700,
  fontSize: "18px",
}));

const BorderIconQuantityFont = styled(Typography)(({ theme }) => ({
  color: "rgb(83, 100, 113)",
  fontWeight: 700,
  fontSize: "18px",
}));

/** Component props */
// interface Props {
//   description: string;
//   imageUrl: string;
//   owner: User;
//   likedBy: string[];
//   post_id: string;
//   createdAt: Date;
// }

export const PostPage = (): JSX.Element => {
  // export const PostPage: React.FC<Props> = ({
  //   description,
  //   imageUrl,
  //   owner,
  //   likedBy,
  //   post_id,
  //   createdAt,
  // }) => {
  const { id } = useParams();
  const { _id } = useAuthStore();
  const { SocketLikeAPost, SocketUnLikeAPost, posts } = usePostStore();

  const [openModal, setOpenModal] = useState<boolean>(false);
  if (posts.length === 0) return <h1>Loading...</h1>;

  const currentPost = posts.filter((e) => e._id === id)[0];

  const {
    description,
    imageUrl,
    owner,
    likedBy,
    createdAt,
    _id: post_id,
  } = currentPost;

  const handleLike = () => {
    SocketLikeAPost(currentPost);
  };

  const handleUnLike = () => {
    SocketUnLikeAPost(currentPost);
  };

  return (
    <PostContainer>
      <DeletePostModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        post_id={post_id}
      />
      <AvatarContainer>
        <Stack>
          <Avatar
            alt="Lucas Ojeda"
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1671396595/user-ecommerce/Avatar-Profile-PNG-Free-Image_yeonm0.png"
          />
        </Stack>
      </AvatarContainer>
      <SecondContainer>
        <OptionsButtonContainer>
          {_id === owner._id && (
            <DeleteIconbutton onClick={() => setOpenModal(true)}>
              <DeleteIcon />
            </DeleteIconbutton>
          )}
        </OptionsButtonContainer>
        <DescriptionContainer>
          <UsernameFont>{owner.username}</UsernameFont>
          <DescriptionFont>{description}</DescriptionFont>
        </DescriptionContainer>
        {imageUrl && (
          <ImageContainer>
            <Image src={imageUrl} alt="Image" />
          </ImageContainer>
        )}

        <ItemsContainer>
          <>
            <CommentIconButton>
              <CommentIcon />
            </CommentIconButton>
            <CommentFont>{0}</CommentFont>
          </>
          {likedBy.includes(_id) ? (
            <>
              <LikeIconButton onClick={handleUnLike}>
                <CustomFavoriteIcon />
              </LikeIconButton>
              <FavoriteIconQuantityFont>
                {likedBy.length}
              </FavoriteIconQuantityFont>
            </>
          ) : (
            <>
              <LikeIconButton onClick={handleLike}>
                <FavoriteBorderIcon />
              </LikeIconButton>
              <BorderIconQuantityFont>{likedBy.length}</BorderIconQuantityFont>
            </>
          )}
        </ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
