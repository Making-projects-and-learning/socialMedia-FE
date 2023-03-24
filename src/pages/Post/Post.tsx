/** Libraries */
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import moment from "moment";

/** Components */
import { CommentCreateArea } from "../../components";

/** Custom hooks */
import { useAuthStore, usePostStore } from "../../hooks";

/** Layouts */
import AppLayout from "../../layouts/AppLayout";

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
  CommentIconButton,
  CommentFont,
  LikeIconButton,
  CustomFavoriteIcon,
  UsernameFont,
  Dot,
  DateFont,
  DescriptionFont,
  FavoriteIconQuantityFont,
  BorderIconQuantityFont,
} from "./styled";
import { Comment } from "../../components/comments/Comment/Comment";

export const Post = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { _id } = useAuthStore();
  const { SocketLikeAPost, SocketUnLikeAPost, SocketDeletePost, posts } =
    usePostStore();

  /** Input focus ref */
  const inputCommentArea = useRef<HTMLInputElement>(null);

  const [isLiked, setIsLiked] = useState<boolean>(false);

  /** Get current post data */
  const currentPost = posts?.filter((e) => e._id === id)[0] ?? {
    description: "",
    imageUrl: "",
    owner: "",
    likedBy: [],
    createdAt: "",
    comments: [],
    _id: "",
  };

  const {
    description,
    imageUrl,
    owner: postOwner,
    likedBy,
    createdAt,
    comments,
    _id: post_id,
  } = currentPost;

  useEffect(() => {
    if (likedBy) {
      const user = likedBy.find((user) => user._id === _id);
      user ? setIsLiked(true) : setIsLiked(false);
    }
  }, [likedBy]);

  if (!currentPost._id) return <></>;

  /** Handle functions */
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

  const handleDelete = () => {
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

  /** Render component functions */
  const renderAvatar = () => (
    <AvatarContainer>
      <AvatarAndNameContainer>
        <Stack>
          <Avatar alt="Lucas Ojeda" src={postOwner.picture} />
        </Stack>
        <UsernameFont>{postOwner.username}</UsernameFont>
      </AvatarAndNameContainer>

      {_id === postOwner._id && (
        <Tooltip title="Delete post" arrow>
          <DeleteIconbutton onClick={handleDelete}>
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
      <Tooltip title="Make a comment" arrow>
        <CommentIconButton onClick={handleCommentClick}>
          <CommentIcon />
        </CommentIconButton>
      </Tooltip>
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
        </>
      ) : (
        <>
          <Tooltip title="Like" arrow>
            <LikeIconButton onClick={handleLike}>
              <FavoriteBorderIcon />
            </LikeIconButton>
          </Tooltip>
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
            post={e.post}
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
          {renderAvatar()}
          <SecondContainer>
            <DescriptionContainer>{renderDescription()}</DescriptionContainer>

            {imageUrl && <ImageContainer>{renderImage()}</ImageContainer>}
            <DateFont>
              {moment(createdAt).format("h:mm A · DD MMM YYYY")}
            </DateFont>
            <ItemsContainer sx={{ gap: "0.5vw" }}>
              <CommentFont>
                <strong>{comments?.length}</strong> comments
              </CommentFont>
              <Dot>·</Dot>
              <CommentFont>
                <strong>{likedBy?.length}</strong> likes
              </CommentFont>
            </ItemsContainer>
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
