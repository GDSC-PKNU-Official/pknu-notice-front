import AlertModal from '@components/Modal/AlertModal';
import ModalsProvider from '@components/ModalsProvider';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import MajorContext from '@contexts/major';
import useModals from '@hooks/useModals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Major from '@type/major';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import InformCard from './index';

const ICON = 'notification';
const TITLE = '공지사항';
const PATH = '/announcement';

const setMajorMock = (isRender: boolean) => {
  const mockMajor: Major = isRender ? null : '컴퓨터공학과';
  const mockSetMajor = jest.fn();

  jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useState: () => [mockMajor, mockSetMajor],
  }));

  return {
    major: mockMajor,
    setMajor: mockSetMajor,
  };
};

const mockRouterTo = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockRouterTo,
}));

jest.mock('@hooks/useModals', () => {
  const modalsMock = {
    modals: [],
    openModal: jest.fn(),
    closeModal: jest.fn(),
  };
  return {
    __esModule: true,
    default: () => modalsMock,
  };
});

describe('InformCard 컴포넌트 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('전역상태가 설정 됐을 경우, 페이지 이동 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock(false) }}>
        <ModalsProvider>
          <InformCard icon={ICON} title={TITLE} path={PATH} />
        </ModalsProvider>
      </MajorContext.Provider>,
      {
        wrapper: MemoryRouter,
      },
    );

    const card = screen.getByTestId('card');
    await act(async () => {
      await userEvent.click(card);
    });

    expect(mockRouterTo).toHaveBeenCalledWith(`${PATH}`);
  });

  it('전역상태가 설정 안됐을 경우, 모달 렌더링 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock(true) }}>
        <ModalsProvider>
          <InformCard icon={ICON} title={TITLE} path={PATH} />
        </ModalsProvider>
      </MajorContext.Provider>,
      {
        wrapper: MemoryRouter,
      },
    );

    const card = screen.getByTestId('card');
    await act(async () => {
      await userEvent.click(card);
    });

    expect(useModals().openModal).toHaveBeenCalledWith(AlertModal, {
      message: MODAL_MESSAGE.ALERT.SET_MAJOR,
      buttonMessage: '전공선택하러 가기',
      iconKind: 'plus',
      onClose: expect.any(Function),
      routerTo: expect.any(Function),
    });
  });
});
