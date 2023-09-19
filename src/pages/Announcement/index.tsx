import fetchAnnounceList from '@apis/Suspense/fetch-announce-list';
import Button from '@components/Button';
import AnnounceList from '@components/Card/AnnounceCard/AnnounceList';
import AnnounceCardSkeleton from '@components/Card/AnnounceCard/Skeleton';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals, { modals } from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { Suspense } from 'react';

const Announcement = () => {
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const { openModal, closeModal } = useModals();

  const announceKeyword = decodeURI(window.location.pathname.split('/')[2]);
  const isActiveSchoolAnnouncement = () => announceKeyword === 'undefined';

  const routerToMajorDecision = () => routerTo('/major-decision');
  const routerToSchoolAnnouncement = () => routerTo('');
  const routerToMajorAnnouncement = () => {
    if (!major) {
      openModal<typeof modals.alert>(modals.alert, {
        message: MODAL_MESSAGE.ALERT.SET_MAJOR,
        buttonMessage: MODAL_BUTTON_MESSAGE.SET_MAJOR,
        iconKind: 'plus',
        onClose: () => closeModal(modals.alert),
        routerTo: () => {
          closeModal(modals.alert);
          routerToMajorDecision();
        },
      });
    }
    routerTo(`${major}`);
  };

  return (
    <Container>
      <ButtonContainer>
        <Button
          onClick={routerToSchoolAnnouncement}
          css={css`
            margin: 0px;
            height: 55px;
            border-radius: 0px;
            background-color: ${THEME.TEXT.WHITE};
            color: ${isActiveSchoolAnnouncement()
              ? THEME.PRIMARY
              : THEME.TEXT.BLACK};
          `}
        >
          학교 공지사항
        </Button>
        <Button
          onClick={() => routerToMajorAnnouncement()}
          css={css`
            margin: 0px;
            height: 55px;
            border-radius: 0px;
            background-color: ${THEME.TEXT.WHITE};
            color: ${isActiveSchoolAnnouncement()
              ? THEME.TEXT.BLACK
              : THEME.PRIMARY};
          `}
        >
          학과 공지사항
        </Button>
        <ButtonBottomBar isActiveSchool={isActiveSchoolAnnouncement()} />
      </ButtonContainer>
      <AnnounceContainer isActiveSchool={isActiveSchoolAnnouncement()}>
        <Suspense fallback={<AnnounceCardSkeleton length={30} />}>
          <AnnounceList
            resource={fetchAnnounceList(
              isActiveSchoolAnnouncement() ? '' : announceKeyword,
            )}
          />
        </Suspense>
      </AnnounceContainer>
    </Container>
  );
};

export default Announcement;

const Container = styled.div`
  overflow-x: hidden;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow-x: none;
`;

const ButtonBottomBar = styled.span<{ isActiveSchool: boolean }>`
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: ${({ isActiveSchool }) => (isActiveSchool ? '0' : '50%')};
    width: 50%;
    height: 3px;
    background-color: ${THEME.PRIMARY};
    transition: left 0.3s ease-in-out;
  }
`;

const AnnounceContainer = styled.div<{ isActiveSchool: boolean }>`
  width: 100%;
  overflow: hidden;
  animation: ${({ isActiveSchool }) =>
      isActiveSchool ? AnnounceSlideLeft : AnnounceSlideRight}
    0.3s forwards;
`;

const AnnounceSlideRight = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const AnnounceSlideLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;
