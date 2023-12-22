import Modal from '@components/Common/Modal';
import DepartmentList from '@components/List/DepartmentList';
import MajorProvider from '@components/Providers/MajorProvider';
import ModalsProvider from '@components/Providers/ModalsProvider';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import { render, act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const routerToMock = jest.fn();

jest.mock('@hooks/useMajor');

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => routerToMock,
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

describe.skip('학과선택 테스트', () => {
  const mockGraduationLink = 'https://ce.pknu.ac.kr/ce/2889';
  const mockUseMajor = useMajor as jest.MockedFunction<typeof useMajor>;
  const mockSetMajor = jest.fn();

  beforeEach(() => {
    mockUseMajor.mockReturnValue({
      setMajor: mockSetMajor,
      major: '컴퓨터공학과',
      graduationLink: mockGraduationLink,
    });
  });

  it('버튼 활성화 테스트', async () => {
    const collegName = '정보융합대학';
    render(
      <ModalsProvider>
        <MemoryRouter initialEntries={[`/major-decision/${collegName}`]}>
          <Routes>
            <Route
              path="/major-decision/:college"
              element={<DepartmentList />}
            />
          </Routes>
        </MemoryRouter>
      </ModalsProvider>,
    );

    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    expect(confirmButton).toBeDisabled();

    const college = await screen.findByText('컴퓨터인공지능학부');

    if (college === null) throw new Error('college is null');

    await act(async () => {
      await userEvent.click(college);
    });

    expect(confirmButton).toBeEnabled();
  });

  it('버튼 클릭시 전공선택 확인 모달 렌더링 테스트', async () => {
    const collegName = '정보융합대학';
    render(
      <MajorProvider>
        <ModalsProvider>
          <MemoryRouter initialEntries={[`/major-decision/${collegName}`]}>
            <Routes>
              <Route
                path="/major-decision/:college"
                element={<DepartmentList />}
              />
            </Routes>
          </MemoryRouter>
        </ModalsProvider>
      </MajorProvider>,
    );

    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    const college = await screen.findByText('컴퓨터인공지능학부');
    await act(async () => {
      await userEvent.click(college);
    });
    await act(async () => {
      await userEvent.click(confirmButton);
    });

    expect(useModals().openModal).toHaveBeenCalledWith(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.SUCCEED.SET_MAJOR} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.GO_HOME}
          onClick={expect.any(Function)}
        />
      </Modal>,
    );
  });

  it('학과 이름에 스페이스가 있는 경우 (학부, 전공이 모두 있는경우) 테스트', async () => {
    const collegName = '정보융합대학';
    render(
      <MemoryRouter initialEntries={[`/major-decision/${collegName}`]}>
        <Routes>
          <Route path="/major-decision/:college" element={<DepartmentList />} />
        </Routes>
      </MemoryRouter>,
    );

    const confirmButton = await screen.findByRole('button', {
      name: '선택완료',
    });
    const college = await screen.findByText('조형학부 건축학전공');
    await act(async () => {
      await userEvent.click(college);
    });
    await userEvent.click(confirmButton);

    expect(mockSetMajor).toBeCalledWith('건축학전공');
  });
});
