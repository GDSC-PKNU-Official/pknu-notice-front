import MajorProvider from '@components/MajorProvider';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Major from '@type/major';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import MajorDecision from './index';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('학과선택 페이지 로직 테스트', () => {
  it('전공 선택 버튼 클릭 후, 상태 변경 테스트', async () => {
    render(
      <MemoryRouter>
        <MajorProvider>
          <MajorDecision />
        </MajorProvider>
      </MemoryRouter>,
    );

    const major = screen.getByRole('note');
    const majorButton = screen.getByText('컴퓨터공학과로 전공 선택하기');

    await userEvent.click(majorButton);
    expect(major).toHaveTextContent(('컴퓨터공학과' as Major) ?? '');
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

    await userEvent.click(majorButton);
    expect(mockAlert).toHaveBeenCalledWith('전공 선택 완료!');

    mockAlert.mockClear();
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });
});
