import { Locale } from '../../i18n.config';

export interface FootherProps {
  lang: Locale;
}

export interface DictionaryType {
  navigation: Navigation;
  page: Page;
  foother: Foother;
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
}

export interface Home {
  nameOfPage: string;
  greeting: string;
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
