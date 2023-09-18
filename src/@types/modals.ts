import { modals } from '@hooks/useModals';

export type Modals =
  | Array<{
      Component: (typeof modals)[keyof typeof modals];
      props: object;
    }>
  | [];
