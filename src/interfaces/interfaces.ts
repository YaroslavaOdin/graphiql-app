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
