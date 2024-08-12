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

  export interface IMember {
    _id: string;
    name: string;
    instruments: string[]
  }

  export interface IMembers {
    minister?: IMember;
    minister_two?: IMember;
    back_one?: IMember;
    back_two?: IMember;
    back_three?: IMember;
    keyboard?: IMember;
    acoustic_guitar?: IMember;
    guitar?: IMember;
    bass?: IMember;
    drums?: IMember;
    audio_tech?: IMember;
    _id: string;
  }

  export interface IScale {
    _id: string;
    title: string;
    songs: ISong[];
    author: IAuthor;
    members: IMembers;
    observations?: string;
    date: Date
    comments: string[]
  }
  
