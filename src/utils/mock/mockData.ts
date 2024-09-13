export const mockDataForRTKHookInMainPage = {
  data: {
    navigation: {
      home: 'Home',
      register: 'Sign Up',
      logIn: 'Sign In',
      logOut: 'Log Out',
    },
    page: {
      home: {
        nameOfPage: 'Main Page',
        greeting: 'Welcome Back',
        welcome: 'Welcome',
        team: 'Our team:',
      },
      graphiql: {
        title: 'GraphiQL Client',
        endpoint: 'Endpoint:',
        sdl: 'SDL Url:',
        headers: 'Headers:',
        key: 'Header key',
        value: 'Header value',
        add: 'Add header:',
        query: 'Query:',
        send: 'Send request',
        response: 'Response:',
      },
      register: {
        username: 'Username',
        password: 'Password',
        email: 'Email',
        submit: 'Submit',
        placeholderUsername: 'type your username',
        placeholderPassword: 'type your password',
        placeholderEmail: 'type your email',
      },
      restClient: {
        title: 'RESTFull Client',
        endpoint: 'Endpoint:',
        methods: 'Method:',
        requestBody: 'Request body:',
        sendBtn: 'Send',
        prettifyBtn: 'Prettify',
        response: 'Response:',
        variables: 'Variables:',
        buttonVariables: 'Add',
      },
      history: {
        title: 'History Requests',
        noRequests: "You haven't executed any requests. It's empty here. Try:",
      },
    },
    foother: {
      names: {
        alexander: 'Aleksandr',
        nikolai: 'Nikolai',
        yaraslava: 'Yaraslava',
      },
    },
    mainPage: {
      btn: {
        mainPageBtn: 'Main Page',
        restClient: 'REST Client',
        graphiqlClient: 'GraphiQL Client',
        history: 'History',
      },
      about: {
        project: 'About the project:',
        rss: 'About RS School:',
        projectText:
          'The project is the creation of an integrated web application that combines the functionality of two popular tools for working with APIs: Postman and GraphiQL. The goal of the project is to provide users with enhanced interaction with RESTful and GraphQL API through a single user-friendly interface. The app will be designed for developers, testers, and anyone else who works with APIs, while keeping the functionality they need simple and accessible.',
        rssText:
          'RS School offers a unique learning experience as a free, community-based online education initiative. The RS School has been run by the Rolling Scopes community since 2013. Today, over 600 developer-volunteers from various countries and companies assist as mentors. We believe in important ideas that guide our mission.',
      },
      teamMember: {
        names: {
          alexander: 'Aleksandr Kisel',
          nikolai: 'Nikolai Kaliganov',
          yaraslava: 'Yaraslava Adzinets',
        },
        specialization: {
          engineer: 'Software engineer',
          leadEngineer: 'Team Lead software engineer',
        },
      },
    },
  },
  isLoading: false,
  isError: false,
};

export const mockUser = {
  uid: 'ltrtzrvg66YaNSKUxa5HqM2kOkI2',
  email: 'sashe.1995@gmail.com',
  emailVerified: false,
  displayName: 'ALEX',
  isAnonymous: false,
  providerData: [
    {
      providerId: 'password',
      uid: 'sashe.1995@gmail.com',
      displayName: 'ALEX',
      email: 'sashe.1995@gmail.com',
      phoneNumber: null,
      photoURL: null,
    },
  ],
  stsTokenManager: {
    refreshToken:
      'AMf-vBwCwWBnXpeRIb1MrbsVz6GiqN9BnIjc_KuhoGX3C9nePoXYwXdk0lUl2BnisqVa7nkvhIouOTUlEuQ2fCKQXEhx570kZtDIP6aP1a4zwuYCqBdofcJoUIVUOWc8zyZ5xVPnSWSff3fE29nQSA7JjsyY27ZJyudIt7xZ0fCI1NRPW-tcm5MFAKbFpH8GWRFNmfZWepO3yD1BjX-_Kze7v_o1F2HgDyPv7TMP3HTwmLsMcdUPhW8',
    accessToken:
      'eyJhbGciOiJSUzI1NiIsImtpZCI6IjExYzhiMmRmNGM1NTlkMjhjOWRlNWQ0MTAxNDFiMzBkOWUyYmNlM2IiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdW5pdGVkLW1vbnVtZW50LTQwMzYxNiIsImF1ZCI6InVuaXRlZC1tb251bWVudC00MDM2MTYiLCJhdXRoX3RpbWUiOjE3MjUxMTA3NzQsInVzZXJfaWQiOiJsdHJ0enJ2ZzY2WWFOU0tVeGE1SHFNMmtPa0kyIiwic3ViIjoibHRydHpydmc2NllhTlNLVXhhNUhxTTJrT2tJMiIsImlhdCI6MTcyNTExMDc3NCwiZXhwIjoxNzI1MTE0Mzc0LCJlbWFpbCI6InNhc2hlLjE5OTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNhc2hlLjE5OTVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.RZtb6lq2F2mmJRv6lkEMGlzLfFGbC-ZskkLAj8Yws9R-bDBD9Bc-J7xS0LBcRlOFjVqgbdVj_SG8kaKgE8z97Yq0ldgwjs-jCAzOXuxXEGD6po_a07QNmU6E4qu-yJIBsXWcTziUH2glEGAxWQ1wVrqb5s1LzTiFl9Um0B4JDnE7HpH_7bF3ZA0xdAYRWzKwCctcHUtM5_mx6SmeA_ta8Zl2o8c4-44EFlFhwNoWmlfkx5fDErEN0flZw_UB0lDpoeJgGtU9chO2-Jn8dcsh17UuAKRnWvA0V_KIoWDxXHRsmps8hYbJKKY3GYUjpo-gA-vkTcBhlZtppNOGDTahBA',
    expirationTime: 1725114374227,
  },
  createdAt: '1725110774061',
  lastLoginAt: '1725110774061',
  apiKey: 'AIzaSyAhBsq48UCrjvkkbVnSHwi29yr9Gc3E0nA',
  appName: '[DEFAULT]',
};
