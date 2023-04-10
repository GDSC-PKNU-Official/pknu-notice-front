import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    background: string; // EAEAEA
    text: {
      black: string;
      gray: string;
      white: string;
    };

    primary: string; // 71BC5C

    button: {
      green: string;
      gray: string;
    };

    modalBackground: string;
  }
}
