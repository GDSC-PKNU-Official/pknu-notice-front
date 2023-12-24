export type Modals =
  | Array<{
      Component: React.ReactElement<{ chidren: React.ReactNode }>;
    }>
  | [];
