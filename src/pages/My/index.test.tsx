import Modal from '@components/Common/Modal';
import MajorProvider from '@components/Providers/MajorProvider';
import ModalsProvider from '@components/Providers/ModalsProvider';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import useModals from '@hooks/useModals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import My from '.';

const mockRouterTo = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockRouterTo,
}));

jest.mock('@hooks/useModals', () => {
  const modalsMock = {
    openModal: jest.fn(),
    closeModal: jest.fn(),
  };
  const modalsActual = jest.requireActual('@hooks/useModals');

  return {
    ...modalsActual,
    default: () => modalsMock,
    modals: modalsActual.modals,
  };
});

describe('마이 페이지 동작 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it.skip('건의사항 남기기 버튼 클릭 시 모달 렌더링 테스트', async () => {
    render(
      <MajorProvider>
        <ModalsProvider>
          <My />
        </ModalsProvider>
      </MajorProvider>,
    );

    const modalButton = screen.getByTestId('modal');
    await act(async () => {
      await userEvent.click(modalButton);
    });

    expect(useModals().openModal).toHaveBeenCalledWith(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.SET_MAJOR} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.CONFIRM}
          onClick={expect.any(Function)}
        />
      </Modal>,
    );
  });

  it('전공수정 버튼 클릭 시 페이지 이동 테스트', async () => {
    render(
      <MajorProvider>
        <ModalsProvider>
          <My />
        </ModalsProvider>
      </MajorProvider>,
      { wrapper: MemoryRouter },
    );

    const majorEditButton = screen.getByText('학과 선택하러가기');
    await userEvent.click(majorEditButton);
    expect(mockRouterTo).toHaveBeenCalledWith('/major-decision');
  });
});
