/** Libraries */
import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/** Components */
import { DeleteCommentModal } from "../DeleteCommentModal/DeleteCommentModal";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../../hooks";

/** Interfaces */
import { User } from "../../../interfaces/user.interface";
import { useNavigate } from "react-router-dom";

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
  content: string;
  imageUrl: string;
  owner: User;
  likedBy?: string[];
  comment_id: string;
  createdAt: Date;
}

export const Comment: React.FC<Props> = ({
  content,
  imageUrl,
  owner,
  likedBy,
  comment_id,
  createdAt,
}) => {
  const navigate = useNavigate();

  const { _id } = useAuthStore();
  const { SocketLikeAComment, SocketUnLikeAComment } = usePostStore();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const currentComment = {
    _id: comment_id,
    content,
    imageUrl,
    owner,
    likedBy,
    createdAt,
  };

  // console.log(imageUrl);

  const handleLike = () => {
    SocketLikeAComment(currentComment);
  };

  const handleUnLike = () => {
    SocketUnLikeAComment(currentComment);
  };

  const renderPostModal = () => (
    <DeleteCommentModal
      openModal={openModal}
      setOpenModal={setOpenModal}
      comment_id={comment_id}
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
    <Tooltip title="Delete comment" arrow>
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

  const renderUsername = () => <UsernameFont>{owner.username}</UsernameFont>;

  const renderDescription = () => <DescriptionFont>{content}</DescriptionFont>;

  const renderImage = () => <Image src={imageUrl} alt="Image" />;

  const renderLikeButton = () => (
    <>
      {likedBy?.includes(_id) ? (
        <>
          <Tooltip title="Unlike" arrow>
            <LikeIconButton onClick={handleUnLike}>
              <CustomFavoriteIcon />
            </LikeIconButton>
          </Tooltip>
          <FavoriteIconQuantityFont>{likedBy.length}</FavoriteIconQuantityFont>
        </>
      ) : (
        <>
          <Tooltip title="Like" arrow>
            <LikeIconButton onClick={handleLike}>
              <FavoriteBorderIcon />
            </LikeIconButton>
          </Tooltip>
          <BorderIconQuantityFont>
            {likedBy ? likedBy.length : 0}
          </BorderIconQuantityFont>
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
          {_id === owner._id && renderOptionsButton()}
        </OptionsButtonContainer>
        <DescriptionContainer>
          {renderUsername()}
          {renderDescription()}
        </DescriptionContainer>
        {imageUrl && <ImageContainer>{renderImage()}</ImageContainer>}

        <ItemsContainer>{renderLikeButton()}</ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
