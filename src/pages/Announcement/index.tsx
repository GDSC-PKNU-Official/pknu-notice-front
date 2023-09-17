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
import { Suspense, useState } from 'react';

type AnimationType = 'bottomBar' | 'announce';
type GetAnimationType = (type: AnimationType) => string;

const Announcement = () => {
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const { openModal, closeModal } = useModals();
  const [activeAnimation, setActiveAnimation] = useState<boolean>(false);

  const routerToMajorDecision = () => routerTo('/major-decision');

  const announceKeyword = decodeURI(window.location.pathname.split('/')[2]);
  const isKeywordUndefined = () => announceKeyword === 'undefined';

  const getAnimationType: GetAnimationType = (type) => {
    if (!activeAnimation) return 'none';
    if (type === 'bottomBar') {
      return !isKeywordUndefined() ? BottomBarSlideRight : BottomBarSlideLeft;
    }
    return !isKeywordUndefined() ? AnnounceSlideRight : AnnounceSlideLeft;
  };

  const handleMajorAnnouncements = () => {
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
    if (!activeAnimation) {
      setActiveAnimation((prev) => !prev);
    }
    routerTo(`${major}`);
  };

  return (
    <Container>
      <div
        css={css`
          width: 100%;
          display: flex;
          position: relative;
          overflow-x: none;
        `}
      >
        <Button
          onClick={() => routerTo('')}
          css={css`
            border-radius: 0px;
            background-color: ${THEME.TEXT.WHITE};
            color: ${isKeywordUndefined() ? THEME.PRIMARY : THEME.TEXT.BLACK};
          `}
        >
          학교 공지사항
        </Button>
        <Button
          onClick={() => handleMajorAnnouncements()}
          css={css`
            border-radius: 0px;
            background-color: ${THEME.TEXT.WHITE};
            color: ${isKeywordUndefined() ? THEME.TEXT.BLACK : THEME.PRIMARY};
          `}
        >
          학과 공지사항
        </Button>
        <BottomBar getAnimationType={getAnimationType} />
      </div>
      <AnnounceContainer getAnimationType={getAnimationType}>
        <Suspense fallback={<AnnounceCardSkeleton length={30} />}>
          <AnnounceList
            resource={fetchAnnounceList(
              announceKeyword !== 'undefined' ? announceKeyword : '',
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

const BottomBar = styled.span<{ getAnimationType: GetAnimationType }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50%;
  height: 3px;
  background-color: ${THEME.PRIMARY};
  animation: ${({ getAnimationType }) => getAnimationType('bottomBar')} 0.3s
    forwards;
`;

const AnnounceContainer = styled.div<{ getAnimationType: GetAnimationType }>`
  width: 100%;
  overflow: hidden;
  animation: ${({ getAnimationType }) => getAnimationType('announce')} 0.3s
    forwards;
`;

const BottomBarSlideRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const BottomBarSlideLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
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
