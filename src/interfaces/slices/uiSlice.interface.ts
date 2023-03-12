export interface NewPostsAlert {
  status: boolean;
  quantity: number;
}

export interface LikeNotification {
  status: boolean;
  user: string;
}

export interface UiState {
  progressBackdrop: boolean;
  newPostsAlert: NewPostsAlert;
  likeNotification: LikeNotification;
}
