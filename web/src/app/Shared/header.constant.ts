import { IListDictionary } from '../Interfaces/dictionary'; 

const dictionary: IListDictionary = new IListDictionary()

export const MENU_CONTENT = [
  { title: dictionary.titleScales.pt, route: dictionary.titleScales.en },
  //{ title: dictionary.titlePosts.pt, route: dictionary.titlePosts.en },
  //{ title: dictionary.titleMessages.pt, route: dictionary.titleMessages.en },
  { title: dictionary.titleSongs.pt, route: dictionary.titleSongs.en }
];

export const MENU_PROFILE = [
  { title: dictionary.titleProfile.pt, route: 'user/profile', btnClass: 'btn btn-outline-sucess', icon: 'person-circle' },
  { title: dictionary.btnLogout.pt, route: dictionary.btnLogout.en, btnClass: 'btn btn-outline-danger', icon: 'box-arrow-right' }
]
