import MajorProvider from '@components/MajorProvider';
import MajorContext from '@contexts/major';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import MajorDecision from './index';

const mockRouterTo = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockRouterTo,
}));

describe.skip('학과선택 페이지 로직 테스트', () => {
  const mockGraduationLink = 'https://ce.pknu.ac.kr/ce/2889';
  const mockSetMajor = jest.fn();

  beforeEach(() => {
    jest.mock('react', () => ({
      ...jest.requireActual('react'),
      useState: jest.fn(() => [null, mockSetMajor]),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('전공 선택 버튼 클릭 후, 상태 변경 테스트', async () => {
    render(
      <MemoryRouter>
        <MajorContext.Provider
          value={{
            major: null,
            setMajor: mockSetMajor,
            graduationLink: mockGraduationLink,
          }}
        >
          <MajorDecision />
        </MajorContext.Provider>
      </MemoryRouter>,
    );

    const majorButton = screen.getByText('컴퓨터공학과로 전공 선택하기');

    await act(async () => {
      await userEvent.click(majorButton);
    });
    expect(mockSetMajor).toHaveBeenCalledWith('컴퓨터공학과');
  });

  it('alert 창 메세지 확인, 메인페이지로 이동 잘 되는지 테스트', async () => {
    const mockAlert = jest.spyOn(window, 'alert');

    render(
      <MemoryRouter initialEntries={['/major-decision']}>
        <MajorProvider>
          <MajorDecision />
        </MajorProvider>
      </MemoryRouter>,
    );

    const majorButton = screen.getByText('컴퓨터공학과로 전공 선택하기');
    await act(async () => {
      await userEvent.click(majorButton);
    });

    expect(mockAlert).toHaveBeenCalledWith('전공 선택 완료!');
    mockAlert.mockClear();
    expect(mockRouterTo).toHaveBeenCalledWith('/');
  });
});
