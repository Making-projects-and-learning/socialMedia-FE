/** Libraries */
import { memo, useEffect, useRef, useState } from "react";

import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import useIntersectionObserver from "@react-hook/intersection-observer";

/** Components */
import { NewPostsButton, PostCreateArea } from "../../components";

/** Custom hooks */
import { usePostStore } from "../../hooks";

/** Utils */
import { Post } from "../../components/posts/Post/Post";
import AppLayout from "../../layouts/AppLayout";

/** Material UI - Custom components */
import {
  HomeContainer,
  ObserverContainer,
  LoaderContainer,
  TitleContainer,
} from "./styled";

export const Home: React.FC = memo(() => {
  const { posts, startLoadPosts, skip } = usePostStore();

  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const { isIntersecting } = useIntersectionObserver(ref);

  const arrPostLength = posts.length.toString().split("");
  const isTenMultiple = Number(arrPostLength[arrPostLength.length - 1]) === 0;

  useEffect(() => {
    if (
      posts.length >= 10 &&
      isIntersecting &&
      isTenMultiple &&
      posts.length !== 0
    ) {
      startLoadPosts(skip + 10);
    }
  }, [isIntersecting]);

  const renderTitle = () => (
    <TitleContainer>
      <Typography fontSize="20px" variant="subtitle1" fontWeight="700">
        Home
      </Typography>
    </TitleContainer>
  );

  const renderObserver = () =>
    posts.length !== 0 && (
      <ObserverContainer ref={setRef}>
        {isIntersecting && isTenMultiple && (
          <LoaderContainer>
            <CircularProgress size="30px" sx={{ color: "gray" }} />
            <Typography fontSize="16px" variant="subtitle1" fontWeight="700">
              Loading new posts
            </Typography>
          </LoaderContainer>
        )}
        {isIntersecting && !isTenMultiple && (
          <LoaderContainer>
            <Typography fontSize="16px" variant="subtitle1" fontWeight="700">
              There are no more posts to be loaded
            </Typography>
          </LoaderContainer>
        )}
      </ObserverContainer>
    );

  const renderPosts = () =>
    posts.length >= 1 && (
      <>
        {posts.map((e, i) => (
          <Post
            key={e._id}
            description={e.description}
            owner={e.owner}
            imageUrl={e.imageUrl}
            likedBy={e.likedBy}
            comments={e.comments}
            post_id={e._id}
            createdAt={e.createdAt}
          />
        ))}
      </>
    );

  return (
    <AppLayout>
      <HomeContainer>
        {renderTitle()}
        <PostCreateArea />
        <NewPostsButton />
        {renderPosts()}
        {renderObserver()}
      </HomeContainer>
    </AppLayout>
  );
});
