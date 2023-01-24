export interface PostForm {
  anon: boolean;
  comment: boolean;
  comment_on: number | null;
  content: string;
  from: string | null;
  to: string;
}
