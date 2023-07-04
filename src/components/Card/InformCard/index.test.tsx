import MajorContext from '@contexts/major';
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

const setMajorMock = (mode: string) => {
  const mockMajor: Major = mode === 'modal' ? null : '컴퓨터공학과';
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

describe('InformCard 컴포넌트 테스트', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('전역상태가 설정 됐을 경우, 페이지 이동 테스트', async () => {
    render(
      <MajorContext.Provider value={{ ...setMajorMock('not-modal') }}>
        <InformCard icon={ICON} title={TITLE} path={PATH} />
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
      <MajorContext.Provider value={{ ...setMajorMock('modal') }}>
        <InformCard icon={ICON} title={TITLE} path={PATH} />
      </MajorContext.Provider>,
      {
        wrapper: MemoryRouter,
      },
    );

    const card = screen.getByTestId('card');
    await act(async () => {
      await userEvent.click(card);
    });

    expect(
      screen.getByText('아직 학과를 알려주지 않았어요'),
    ).toBeInTheDocument();
  });
});
