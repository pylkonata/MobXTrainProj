export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string,
}

export type PostPreview = Omit<IPost, 'id'| 'userId'>;

export type ModifiedFields = 
  | { title: string }
  | { body: string }
  | { title: string, body: string };
