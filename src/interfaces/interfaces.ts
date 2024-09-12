import { StaticImageData } from 'next/image';
import { Locale } from '../../i18n.config';

export interface FootherProps {
  lang: Locale;
}

export interface DictionaryType {
  navigation: Navigation;
  page: Page;
  foother: Foother;
  mainPage: IMainPage;
}

export interface Navigation {
  home: string;
  register: string;
  logIn: string;
  logOut: string;
}

export interface Page {
  home: Home;
  graphiql: Graphiql;
  register: Register;
  restClient: IRestClient;
}

export interface Home {
  nameOfPage: string;
  greeting: string;
  welcome: string;
  team: string;
}

export interface Graphiql {
  title: string;
  endpoint: string;
  sdl: string;
  headers: string;
  key: string;
  value: string;
  add: string;
  query: string;
  send: string;
  response: string;
}

export interface IGithubLink {
  name: string;
  link: string;
}

export interface Register {
  username: string;
  password: string;
  email: string;
  submit: string;
  placeholderUsername: string;
  placeholderPassword: string;
  placeholderEmail: string;
}

export interface Foother {
  names: Names;
}

export interface Names {
  alexander: string;
  nikolai: string;
  yaraslava: string;
}

export interface IGithubLink {
  name: string;
  link: string;
}

export interface TeamMemberProps {
  lang: Locale;
}

export interface ITeamMemberCard {
  name: string;
  specialization: string;
  photo: StaticImageData;
  about?: string;
}

export interface notSignInMainPageProps {
  lang: Locale;
}

interface IMainPage {
  btn: IMainPageBtn;
  about: IMainPageAbout;
  teamMember: {
    names: Names;
    specialization: {
      engineer: string;
      leadEngineer: string;
    };
  };
}

interface IMainPageBtn {
  mainPageBtn: string;
  restClient: string;
  graphiqlClient: string;
  history: string;
}

interface IMainPageAbout {
  project: string;
  rss: string;
  projectText: string;
  rssText: string;
}

interface IRestClient {
  title: string;
  endpoint: string;
  methods: string;
  requestBody: string;
  sendBtn: string;
  prettifyBtn: string;
  response: string;
}

export interface requestBody {
  method: string;
  headers: Headers;
  body: string | undefined;
}

export interface decodedQueryType {
  query: string;
  variables: string | undefined;
}
