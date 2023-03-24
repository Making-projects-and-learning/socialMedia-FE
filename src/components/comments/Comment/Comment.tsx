/** Libraries */
import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import moment from "moment";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../../hooks";

/** Interfaces */
import { User } from "../../../interfaces/user.interface";

/** Material UI - Custom components */
import {
  PostContainer,
  AvatarContainer,
  AvatarAndNameContainer,
  SecondContainer,
  DeleteIconbutton,
  ItemsContainer,
  DescriptionContainer,
  ImageContainer,
  Image,
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
import { Post } from "../../../interfaces/post.interface";

/** Component props */
interface Props {
  content: string;
  imageUrl: string;
  owner: User;
  post: Post;
  likedBy?: User[];
  comment_id: string;
  createdAt: Date;
}

export const Comment: React.FC<Props> = ({
  content,
  imageUrl,
  owner,
  post,
  likedBy,
  comment_id,
  createdAt,
}) => {
  const { _id } = useAuthStore();
  const { SocketLikeAComment, SocketUnLikeAComment, SocketDeleteComment } =
    usePostStore();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const currentComment = {
    _id: comment_id,
    content,
    imageUrl,
    owner,
    post,
    likedBy,
    createdAt,
  };

  useEffect(() => {
    if (likedBy) {
      const user = likedBy.find((user) => user._id === _id);
      user ? setIsLiked(true) : setIsLiked(false);
    }
  }, [likedBy]);

  const handleLike = () => {
    SocketLikeAComment(currentComment);
  };

  const handleUnLike = () => {
    SocketUnLikeAComment(currentComment);
  };

  const handleDelete = () => {
    Swal.fire({
      position: "center",
      title: "Are you sure you want to delete this comment?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        SocketDeleteComment(comment_id);
      }
    });
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

  const renderDescription = () => <DescriptionFont>{content}</DescriptionFont>;

  const renderImage = () => <Image src={imageUrl} alt="Image" />;

  const renderLikeButton = () => (
    <>
      {isLiked ? (
        <>
          <Tooltip title="Unlike" arrow>
            <LikeIconButton onClick={handleUnLike}>
              <CustomFavoriteIcon />
            </LikeIconButton>
          </Tooltip>
          <FavoriteIconQuantityFont>
            {likedBy ? likedBy.length : 1}
          </FavoriteIconQuantityFont>
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
      {renderAvatar()}
      <SecondContainer>
        <DescriptionContainer>{renderDescription()}</DescriptionContainer>

        {imageUrl && <ImageContainer>{renderImage()}</ImageContainer>}

        <ItemsContainer>{renderLikeButton()}</ItemsContainer>
      </SecondContainer>
    </PostContainer>
  );
};
