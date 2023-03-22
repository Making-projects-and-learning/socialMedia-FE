/** Libraries */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/** Components */
import { DeletePostModal } from "../DeletePostModal/DeletePostModal";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../../hooks";

/** Interfaces */
import { Comment } from "../../../interfaces/post.interface";
import { User } from "../../../interfaces/user.interface";

/** Material UI - Custom components */
import {
  PostContainer,
  AvatarContainer,
  SecondContainer,
  OptionsButtonContainer,
  DeleteIconbutton,
  ItemsContainer,
  DescriptionContainer,
  ImageContainer,
  Image,
  CommentIconButton,
  CommentFont,
  LikeIconButton,
  CustomFavoriteIcon,
  UsernameFont,
  DescriptionFont,
  FavoriteIconQuantityFont,
  BorderIconQuantityFont,
} from "./styled";

/** Component props */
interface Props {
  description: string;
  imageUrl: string;
  owner: User;
  likedBy?: string[];
  comments?: Comment[];
  post_id: string;
  createdAt: Date;
}

export const Post: React.FC<Props> = ({
  description,
  imageUrl,
  owner,
  likedBy,
  post_id,
  comments,
  createdAt,
}) => {
  const navigate = useNavigate();

  const { _id, picture } = useAuthStore();
  const { SocketLikeAPost, SocketUnLikeAPost } = usePostStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentPost = {
    _id: post_id,
    description,
    imageUrl,
    owner,
    likedBy,
    createdAt,
  };

  const handleLike = () => {
    SocketLikeAPost(currentPost);
  };

  const handleUnLike = () => {
    SocketUnLikeAPost(currentPost);
  };

  const renderPostModal = () => (
    <DeletePostModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      post_id={post_id}
    />
  );

  const renderAvatar = () => (
    <AvatarContainer>
      <Stack>
        <Avatar alt="Lucas Ojeda" src={owner.picture} />
      </Stack>
    </AvatarContainer>
  );

  const renderOptionsButton = () => (
    <Tooltip title="Delete post" arrow>
      <DeleteIconbutton
        id="deleteButton"
        onClick={() => setOpenModal(true)}
        sx={{
          visibility: "hidden",
        }}
      >
        <DeleteIcon />
      </DeleteIconbutton>
    </Tooltip>
  );

  const renderUsername = () => <UsernameFont>{owner?.username}</UsernameFont>;

  const renderDescription = () => (
    <DescriptionFont>{description}</DescriptionFont>
  );

  const renderImage = () => <Image src={imageUrl} alt="Image" />;

  const renderCommentButton = () => (
    <>
      <Tooltip title="Go to comments section" arrow>
        <CommentIconButton onClick={() => navigate(`post/${post_id}`)}>
          <CommentIcon />
        </CommentIconButton>
      </Tooltip>
      <CommentFont>{comments ? comments.length : 0}</CommentFont>
    </>
  );

  const renderLikeButton = () => (
    <>
      {likedBy?.includes(_id) ? (
        <>
          <Tooltip title="Unlike" arrow>
            <LikeIconButton onClick={handleUnLike}>
              <CustomFavoriteIcon />
            </LikeIconButton>
          </Tooltip>
          <FavoriteIconQuantityFont>{likedBy?.length}</FavoriteIconQuantityFont>
        </>
      ) : (
        <>
          <Tooltip title="Like" arrow>
            <LikeIconButton onClick={handleLike}>
              <FavoriteBorderIcon />
            </LikeIconButton>
          </Tooltip>
          <BorderIconQuantityFont>{likedBy?.length}</BorderIconQuantityFont>
        </>
      )}
    </>
  );

  return (
    <PostContainer
      sx={{
        ":hover": {
          "#deleteButton": {
            visibility: "visible",
          },
        },
      }}
    >
      {renderPostModal()}
      {renderAvatar()}
      <SecondContainer>
        <OptionsButtonContainer>
          {_id === owner?._id && renderOptionsButton()}
        </OptionsButtonContainer>
        <DescriptionContainer>
          {renderUsername()}
          {renderDescription()}
        </DescriptionContainer>
        {imageUrl && <ImageContainer>{renderImage()}</ImageContainer>}

        <ItemsContainer>
          {renderCommentButton()}
          {renderLikeButton()}
        </ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
