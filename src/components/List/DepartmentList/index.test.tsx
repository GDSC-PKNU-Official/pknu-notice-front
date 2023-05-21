import DepartmentList from '@components/List/DepartmentList';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

describe('학과선택 테스트', () => {
  it('버튼 활성화 테스트', async () => {
    await act(async () => {
      render(<DepartmentList college="정보융합대학" />, {
        wrapper: MemoryRouter,
      });
    });

    const confirmButton = await screen.findByRole('button');
    expect(confirmButton).toBeDisabled();
    const college = await screen.findByLabelText('컴퓨터인공지능학부');
    await userEvent.click(college);
    expect(confirmButton).toBeEnabled();
  });
});
