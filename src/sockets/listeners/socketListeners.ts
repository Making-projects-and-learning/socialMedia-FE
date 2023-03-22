import { commentListeners } from "./commentListeners";
import { postListeners } from "./postListeners";

const socketListeners = () => {
  /** Comments */
  commentListeners();

  /** Posts */
  postListeners();
};

export default socketListeners;
