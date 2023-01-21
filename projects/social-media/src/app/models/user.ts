import { Post } from './post';

export interface User {
  username: string;
  data: {
    followingList: number[];
    followerList: number[];
    posts: Post[];
  };
}
