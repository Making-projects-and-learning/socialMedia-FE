/** Libraries */
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

/** Components */
import { CommentCreateArea, DeletePostModal } from "../../components";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../hooks";

/** Layouts */
import AppLayout from "../../layouts/AppLayout";

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
import { Comment } from "../../components/comments/Comment/Comment";

export const Post = (): JSX.Element => {
  const { id } = useParams();

  const { _id } = useAuthStore();
  const { SocketLikeAPost, SocketUnLikeAPost, posts } = usePostStore();

  const [openModal, setOpenModal] = useState<boolean>(false);
  if (posts.length === 0) return <h1></h1>;

  const inputCommentArea = useRef<HTMLInputElement>(null);

  const currentPost = posts.filter((e) => e._id === id)[0];

  // console.log(currentPost);

  const {
    description,
    imageUrl,
    owner: postOwner,
    likedBy,
    createdAt,
    comments,
    _id: post_id,
  } = currentPost;

  const handleLike = () => {
    SocketLikeAPost(currentPost);
  };

  const handleUnLike = () => {
    SocketUnLikeAPost(currentPost);
  };

  const handleCommentClick = () => {
    if (inputCommentArea.current) {
      inputCommentArea.current?.querySelector("textarea")?.focus();
    }
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
        <Avatar alt="Lucas Ojeda" src={postOwner.picture} />
      </Stack>
    </AvatarContainer>
  );

  const renderOptionsButton = () => (
    <Tooltip title="Delete post" arrow>
      <DeleteIconbutton onClick={() => setOpenModal(true)}>
        <DeleteIcon />
      </DeleteIconbutton>
    </Tooltip>
  );

  const renderUsername = () => (
    <UsernameFont>{postOwner.username}</UsernameFont>
  );

  const renderDescription = () => (
    <DescriptionFont>{description}</DescriptionFont>
  );

  const renderImage = () => <Image src={imageUrl} alt="Image" />;

  const renderCommentButton = () => (
    <>
      <Tooltip title="Make a comment" arrow>
        <CommentIconButton onClick={handleCommentClick}>
          <CommentIcon />
        </CommentIconButton>
      </Tooltip>
      <CommentFont>{comments?.length}</CommentFont>
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

  const renderComments = () =>
    comments &&
    comments.length >= 1 && (
      <>
        {comments.map((e, i) => (
          <Comment
            key={e._id}
            content={e.content}
            owner={e.owner}
            imageUrl={e.imageUrl}
            likedBy={e.likedBy}
            comment_id={e._id}
            createdAt={e.createdAt}
          />
        ))}
      </>
    );

  return (
    <AppLayout>
      <>
        <PostContainer>
          {renderPostModal()}
          {renderAvatar()}
          <SecondContainer>
            <OptionsButtonContainer>
              {_id === postOwner._id && renderOptionsButton()}
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
        <CommentCreateArea inputCommentArea={inputCommentArea} />
        {renderComments()}
      </>
    </AppLayout>
  );
};
