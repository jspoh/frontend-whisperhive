import { Post } from './post';

export interface User {
  username: string;
  name: string;
  data: {
    currentUser: string;
    followingList: number[];
    followerList: number[];
    posts: Post[];
  };
}
