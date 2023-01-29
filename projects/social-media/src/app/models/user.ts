import { Post } from './post';

export interface User {
  username: string;
  name: string;
  following: boolean | null;
  data: {
    currentUser: string;
    followingList: number[];
    followerList: number[];
    posts: Post[];
  };
}
