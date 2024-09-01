import { Locale } from "../../i18n.config";

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
  register: Register;
}

export interface Home {
  nameOfPage: string;
  greeting: string;
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

export interface Home {
  title: string;
  description: string;
}

export interface IGithubLink {
  name: string;
  link: string;
}

export interface Foother {
  names: Names;
}

interface Names {
  alexandr: string;
  nikolai: string;
  yaraslava: string;
}

export interface FootherProps {
  lang: Locale;
>>>>>>> first-week-sprint
}
