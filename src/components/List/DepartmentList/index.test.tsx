import DepartmentList from '@components/List/DepartmentList';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@hooks/useMajor', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      setMajor: jest.fn(),
    })),
  };
});

describe('학과선택 테스트', () => {
  it('버튼 활성화 테스트', async () => {
    await act(async () => {
      render(<DepartmentList college="정보융합대학" />, {
        wrapper: MemoryRouter,
      });
    });
    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    expect(confirmButton).toBeDisabled();
    const college = await screen.queryByText(/컴퓨터인공지능학부/i);

    if (college === null) throw new Error('college is null');
    await act(async () => {
      await userEvent.click(college);
    });

    expect(confirmButton).toBeEnabled();
  });

  it.skip('버튼 클릭 테스트', async () => {
    await act(async () => {
      render(<DepartmentList college="정보융합대학" />, {
        wrapper: MemoryRouter,
      });
    });

    const confirmButton = await screen.findByRole('button');
    const college = await screen.getByLabelText('컴퓨터인공지능학부');
    await userEvent.click(college);
    await userEvent.click(confirmButton);

    expect(window.location.href).toBe('https://localhost');
  });
});
