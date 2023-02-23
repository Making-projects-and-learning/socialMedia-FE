/** Libraries */
import React from "react";

import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { styled } from "@mui/material/styles";

/** Interfaces */
import { User } from "../../interfaces/user.interface";

/** Material UI - Custom components */
const PostContainer = styled("div")(({ theme }) => ({
  width: "100%",
  minHeight: "25vh",
  height: "auto",
  paddingTop: "1.5vh",
  borderBottom: "1px solid #E9E9E9",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "#fff",
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
  justifyContent: "center",
  alignItems: "center",
}));

const ItemsContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "5vh",
  marginTop: "5px",
  paddingTop: "20px",
  marginBottom: "10px",
  borderTop: "1px solid #E9E9E9",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const DescriptionContainer = styled("div")(({ theme }) => ({
  height: "auto",
  minHeight: "5vh",
  width: "100%",
  overflowY: "visible",
  padding: "10px",
  marginLeft: "-2.5vw",
  marginBottom: "10px",
  border: "none",
  fontFamily: "Arial",
  fontSize: "18px",
  resize: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",

  ":focus-visible": {
    outline: "none",
  },
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
}));

const DescriptionFont = styled(Typography)(({ theme }) => ({
  // color: "rgb(249, 24, 128)",
}));

interface Props {
  description: string;
  imageUrl: string;
  owner: User;
  likedBy: User[];
}

export const Post: React.FC<Props> = ({
  description,
  imageUrl,
  owner,
  likedBy,
}) => {
  return (
    <PostContainer>
      <AvatarContainer>
        <Stack>
          <Avatar
            alt="Lucas Ojeda"
            src="https://res.cloudinary.com/the-kings-company/image/upload/v1671396595/user-ecommerce/Avatar-Profile-PNG-Free-Image_yeonm0.png"
          />
        </Stack>
      </AvatarContainer>
      <SecondContainer>
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
          <LikeIconButton>
            {!likedBy ? <CustomFavoriteIcon /> : <FavoriteBorderIcon />}
          </LikeIconButton>
        </ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
