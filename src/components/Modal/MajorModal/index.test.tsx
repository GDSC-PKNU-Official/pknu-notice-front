// TODO
// 1. MajorModal 컴포넌트 호출할 때, onClose & routerTo 를 props 로 전달
// 2. 전달 받아서 호출 후, 테스트 할 내용은 2가지
// 2-a. 학과 선택하러가기 버튼을 클릭하면 페이지 이동이 제대로 되는지 확인
// 2-b. 모달 창 바깥 버튼 누르면 제대로 닫히는지 확인
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import MajorModal from '.';

const onCloseMock = jest.fn();
const routerToMock = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => routerToMock,
}));

describe('모달 컴포넌트 테스트', () => {
  it('학과 선택 페이지로의 이동이 제대로 되는지 테스트', async () => {
    render(
      <MajorModal
        onClose={onCloseMock}
        routerTo={routerToMock('major-decision')}
      />,
      {
        wrapper: MemoryRouter,
      },
    );

    const pageButton = screen.getByText('학과 선택하기');
    await userEvent.click(pageButton);

    expect(routerToMock).toHaveBeenCalledWith('major-decision');
  });
});
