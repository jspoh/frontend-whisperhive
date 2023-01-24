import { Post } from './post';

export interface Feed {
  username: string;
  data: Post[];
}
