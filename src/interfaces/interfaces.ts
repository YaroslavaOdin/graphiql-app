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
}

export interface Page {
  home: Home;
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
}
