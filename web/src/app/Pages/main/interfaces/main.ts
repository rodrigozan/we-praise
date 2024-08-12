export interface IVersion {
    _id: string;
    interpreter: string[];
    link: string[];
  }
  
  export interface IAuthor {
    _id: string;
    name: string;
    role: string;
  }
  
  export interface ISong {
    _id: string;
    title: string;
    songAuthor: string;
    version: IVersion[];
    author: IAuthor;
    observations?: string;
  }
  
