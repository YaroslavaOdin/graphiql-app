export interface DictionaryType {
  navigation: Navigation;
  page: Page;
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
