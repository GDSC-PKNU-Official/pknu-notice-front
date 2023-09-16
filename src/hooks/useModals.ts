import AlertModal from '@components/Modal/AlertModal';
import ConfirmModal from '@components/Modal/ConfirmModal';
import SuggestionModal from '@components/Modal/SuggestionModal';
import ModalsContext from '@contexts/modals';
import {
  ComponentProps,
  FunctionComponent,
  useCallback,
  useContext,
} from 'react';

export const modals = {
  confirm: ConfirmModal as FunctionComponent<
    ComponentProps<typeof ConfirmModal>
  >,
  alert: AlertModal as FunctionComponent<ComponentProps<typeof AlertModal>>,
  suggestion: SuggestionModal as FunctionComponent<
    ComponentProps<typeof SuggestionModal>
  >,
} as const;

export type OpenModal = <T extends (typeof modals)[keyof typeof modals]>(
  Component: T,
  props: Omit<ComponentProps<T>, 'open'>,
) => void;

export type CloseModal = <T extends (typeof modals)[keyof typeof modals]>(
  Component: T,
) => void;

const useModals = () => {
  const setModals = useContext(ModalsContext.ModalDispatch);
  if (!setModals) {
    throw new Error('ModalContext does not exists.');
  }

  const openModal: OpenModal = useCallback(
    (Component, props) => {
      setModals((modals) => [
        ...modals,
        { Component, props: { ...props, open: true } },
      ]);
    },
    [setModals],
  );
  const closeModal: CloseModal = useCallback(
    (Component) => {
      setModals((modals) =>
        modals.filter((modal) => modal.Component !== Component),
      );
    },
    [setModals],
  );
  return {
    openModal,
    closeModal,
  };
};

export default useModals;
