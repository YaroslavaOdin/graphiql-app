/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'firebase-mock' {
  export class MockFirebase {
    constructor(...args: any[]);
    flush(): void;
    autoFlush(time?: number | boolean): void;
    getAuth(): any;
    child(path: string): MockFirebase;
    push(value?: any, onComplete?: (error: Error | null) => void): MockFirebase;
    set(value: any, onComplete?: (error: Error | null) => void): Promise<void>;
    update(value: any, onComplete?: (error: Error | null) => void): Promise<void>;
    remove(onComplete?: (error: Error | null) => void): Promise<void>;
    once(eventType: string, successCallback: (snapshot: any) => void, failureCallback?: (error: Error) => void): Promise<any>;
    on(eventType: string, callback: (snapshot: any) => void): void;
    off(eventType?: string, callback?: (snapshot: any) => void): void;
  }

  export class MockFirestore {
    constructor(...args: any[]);
    collection(name: string): any;
    doc(path: string): any;
    flush(): void;
    autoFlush(time?: number | boolean): void;
  }

  export class MockStorage {
    constructor(...args: any[]);
    ref(path: string): any;
    flush(): void;
    autoFlush(time?: number | boolean): void;
  }

  export class MockMessaging {
    constructor(...args: any[]);
    usePublicVapidKey(key: string): void;
    getToken(): Promise<string>;
    onMessage(callback: (payload: any) => void): void;
    onTokenRefresh(callback: () => void): void;
  }

  export class MockFirebaseSdk {
    constructor(
      auth?: () => MockFirebase,
      database?: () => MockFirebase,
      firestore?: () => MockFirestore,
      storage?: () => MockStorage,
      messaging?: () => MockMessaging
    );
    initializeApp(config: any): void;
    auth(): MockFirebase;
    database(): MockFirebase;
    firestore(): MockFirestore;
    storage(): MockStorage;
    messaging(): MockMessaging;
  }
}