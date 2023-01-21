export interface Post {
  POST_ID: number;
  FROM_USER_ID: number;
  TO_USER_ID: number;
  MESSAGE: string;
  POSTED_ON: string;
  IS_ANON: boolean;
  IS_COMMENT: boolean;
  COMMENT_ON: number | null;
  COMMENTS: Post[];
}
