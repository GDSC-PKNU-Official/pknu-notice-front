import MajorProvider from '@components/MajorProvider';
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

describe('마이 페이지 동작 테스트', () => {
  it('건의사항 남기기 버튼 클릭 시 모달 렌더링 테스트', async () => {
    render(
      <MajorProvider>
        <My />
      </MajorProvider>,
      { wrapper: MemoryRouter },
    );

    const modalButton = screen.getByTestId('modal');
    await act(async () => {
      await userEvent.click(modalButton);
    });

    expect(screen.getByText('건의사항')).toBeInTheDocument();
  });

  it('전공수정 버튼 클릭 시 페이지 이동 테스트', async () => {
    render(
      <MajorProvider>
        <My />
      </MajorProvider>,
      { wrapper: MemoryRouter },
    );

    const majorEditButton = screen.getByTestId('edit');
    await userEvent.click(majorEditButton);
    expect(mockRouterTo).toHaveBeenCalledWith('/major-decision');
  });
});
