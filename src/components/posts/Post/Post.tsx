/** Libraries */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import moment from "moment";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../../hooks";

/** Interfaces */
import { Comment } from "../../../interfaces/post.interface";
import { User } from "../../../interfaces/user.interface";

/** Material UI - Custom components */
import {
  PostContainer,
  AvatarContainer,
  AvatarAndNameContainer,
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
  UsernameContainer,
  Dot,
  DateFont,
  DescriptionFont,
  FavoriteIconQuantityFont,
  BorderIconQuantityFont,
} from "./styled";

/** Component props */
interface Props {
  description: string;
  imageUrl: string;
  owner: User;
  likedBy?: User[];
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
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { _id, picture } = useAuthStore();
  const { SocketLikeAPost, SocketUnLikeAPost, SocketDeletePost } =
    usePostStore();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const currentPost = {
    _id: post_id,
    description,
    imageUrl,
    owner,
    likedBy,
    createdAt,
  };

  useEffect(() => {
    if (likedBy) {
      const user = likedBy.find((user) => user._id === _id);
      user ? setIsLiked(true) : setIsLiked(false);
    }
  }, [likedBy]);

  /** Handle functions */
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    SocketLikeAPost(currentPost);
  };

  const handleUnLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    SocketUnLikeAPost(currentPost);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    Swal.fire({
      position: "center",
      title: "Are you sure you want to delete this post",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        if (pathname.split("/")[1] === "post") navigate("/");
        SocketDeletePost(post_id);
      }
    });
  };

  const handleGoToPost = () => {
    navigate(`/post/${post_id}`);
    window.scroll(0, 0);
  };

  /** Render component functions */
  const renderAvatar = () => (
    <AvatarContainer>
      <AvatarAndNameContainer>
        <Stack>
          <Avatar alt="Lucas Ojeda" src={owner.picture} />
        </Stack>
        <UsernameContainer>
          <UsernameFont>{owner.username}</UsernameFont>
          <Dot>·</Dot>
          <DateFont>{moment(createdAt).fromNow()}</DateFont>
        </UsernameContainer>
      </AvatarAndNameContainer>

      {_id === owner._id && (
        <Tooltip title="Delete post" arrow>
          <DeleteIconbutton
            id="deleteButton"
            sx={{
              visibility: "hidden",
            }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </DeleteIconbutton>
        </Tooltip>
      )}
    </AvatarContainer>
  );

  const renderDescription = () => (
    <DescriptionFont>{description}</DescriptionFont>
  );

  const renderImage = () => <Image src={imageUrl} alt="Image" />;

  const renderCommentButton = () => (
    <>
      <Tooltip title="Go to comments section" arrow>
        <CommentIconButton onClick={handleGoToPost}>
          <CommentIcon />
        </CommentIconButton>
      </Tooltip>
      <CommentFont>{comments ? comments.length : 0}</CommentFont>
    </>
  );

  const renderLikeButton = () => (
    <>
      {isLiked ? (
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
      onClick={handleGoToPost}
    >
      {renderAvatar()}
      <SecondContainer>
        <DescriptionContainer>{renderDescription()}</DescriptionContainer>

        {imageUrl && <ImageContainer>{renderImage()}</ImageContainer>}

        <ItemsContainer>
          {renderCommentButton()}
          {renderLikeButton()}
        </ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
