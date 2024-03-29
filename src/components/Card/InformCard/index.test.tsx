import Modal from '@components/Common/Modal';
import ModalsProvider from '@components/Providers/ModalsProvider';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import MajorContext from '@contexts/major';
import useModals from '@hooks/useModals';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconKind } from '@type/styles/icon';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import InformCard from './index';

type INFORM_CARD_TYPE = 'ANNOUNCEMENT' | 'GRADUATION';

type INFORM_CARD_DATA = {
  [key in INFORM_CARD_TYPE]: {
    title: string;
    icon: IconKind & ('school' | 'schoolBuilding');
    onClick: () => void;
  };
};

const graduationLink = 'https://ce.pknu.ac.kr/ce/2889';
const INFORM_CARD: INFORM_CARD_DATA = {
  ANNOUNCEMENT: {
    title: '학교 공지사항',
    icon: 'schoolBuilding',
    onClick: () => mockRouterTo('/announcement'),
  },
  GRADUATION: {
    title: '졸업요건',
    icon: 'school',
    onClick: () => (window.location.href = graduationLink),
  },
};

const setMajorMock = (isRender: boolean) => {
  const mockGetMajor = jest.fn();
  const mockSetMajor = jest.fn();

  mockGetMajor.mockReturnValue(isRender ? null : '컴퓨터인공지능학부');

  return {
    getMajor: mockGetMajor,
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
    openModal: jest.fn(),
    closeModal: jest.fn(),
  };

  const modalActuals = jest.requireActual('@hooks/useModals');

  return {
    ...modalActuals,
    default: () => modalsMock,
    modals: modalActuals.modals,
  };
});

describe('InformCard 컴포넌트 테스트', () => {
  const oldWindowLocation = window.location;

  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      enumerable: true,
      value: new URL(window.location.href),
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: false,
      enumerable: true,
      value: oldWindowLocation,
    });
    jest.clearAllMocks();
  });

  it('전역상태가 설정 됐을 경우, 페이지 이동 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock(false) }}>
        <ModalsProvider>
          <InformCard
            icon={INFORM_CARD['ANNOUNCEMENT'].icon}
            title={INFORM_CARD['ANNOUNCEMENT'].title}
            onClick={INFORM_CARD['ANNOUNCEMENT'].onClick}
            majorRequired={true}
          />
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

    expect(mockRouterTo).toHaveBeenCalled();
  });

  it('전역상태가 설정 안됐을 경우, 모달 렌더링 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock(true) }}>
        <ModalsProvider>
          <InformCard
            icon={INFORM_CARD['ANNOUNCEMENT'].icon}
            title={INFORM_CARD['ANNOUNCEMENT'].title}
            onClick={INFORM_CARD['ANNOUNCEMENT'].onClick}
            majorRequired={true}
          />
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

    expect(useModals().openModal).toHaveBeenCalledWith(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.SET_MAJOR} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.SET_MAJOR}
          iconKind="plus"
          onClick={expect.any(Function)}
        />
      </Modal>,
    );
  });

  it('전역상태가 설정 됐을 경우, 졸업요건 클릭 시 페이지 이동 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock(false) }}>
        <ModalsProvider>
          <InformCard
            icon={INFORM_CARD['GRADUATION'].icon}
            title={INFORM_CARD['GRADUATION'].title}
            onClick={INFORM_CARD['GRADUATION'].onClick}
            majorRequired={true}
          />
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

    expect(window.location.href).toBe(graduationLink);
  });
});
