/** Custom hooks */
import { useAuthStore, usePostStore, useSocket, useUiStore } from "../hooks";

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
    <>
      <h1>Hola mundo</h1>
      <button onClick={handleNewPost}>NEW POST</button>
      <button onClick={handleLogout}>LOGOUT</button>
      {status && (
        <button onClick={handleLoadPosts}>
          There are {quantity} posts available - click here
        </button>
      )}
    </>
  );
};
