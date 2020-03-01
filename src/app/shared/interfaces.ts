export interface IFirebaseResponse {
  idToken: string;
  expiresIn: string;
}

export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface IPost {
  id?: string;
  text: string;
  author: string;
  title: string;
  date: Date;
}

export interface IFbCreateResponse {
  name: string;
}
