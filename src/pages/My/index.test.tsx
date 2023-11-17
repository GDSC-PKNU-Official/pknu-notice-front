import MajorProvider from '@components/Providers/MajorProvider';
import ModalsProvider from '@components/Providers/ModalsProvider';
import useModals, { modals } from '@hooks/useModals';
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
  it('건의사항 남기기 버튼 클릭 시 모달 렌더링 테스트', async () => {
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

    expect(useModals().openModal).toHaveBeenCalledWith(modals.suggestion, {
      title: '건의사항',
      buttonMessage: '보내기',
      onClose: expect.any(Function),
    });
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
