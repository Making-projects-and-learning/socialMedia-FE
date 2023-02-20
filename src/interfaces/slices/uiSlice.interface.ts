export interface NewPostsAlert {
  status: boolean;
  quantity: number;
}

export interface UiState {
  progressBackdrop: boolean;
  newPostsAlert: NewPostsAlert;
}
