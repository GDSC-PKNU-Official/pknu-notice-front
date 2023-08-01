import fetchAnnounceList from '@apis/Suspense/fetch-announce-list';
import Button from '@components/Button';
import AnnounceList from '@components/Card/AnnounceCard/AnnounceList';
import AnnounceCardSkeleton from '@components/Card/AnnounceCard/Skeleton';
import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { Suspense } from 'react';

const Announcement = () => {
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const { openModal, closeModal } = useModals();
  const routerToMajorDecision = () => routerTo('/major-decision');
  const announceKeyword = decodeURI(window.location.pathname.split('/')[2]);

  const handleMajorAnnouncements = () => {
    if (!major) {
      openModal(AlertModal, {
        message: MODAL_MESSAGE.ALERT.SET_MAJOR,
        buttonMessage: '전공선택하러 가기',
        iconKind: 'plus',
        onClose: () => closeModal(AlertModal),
        routerTo: () => {
          closeModal(AlertModal);
          routerToMajorDecision();
        },
      });
      return;
    }
    routerTo(`${major}`);
  };

  const isKeywordUndefined = () => announceKeyword === 'undefined';

  return (
    <>
      <div
        css={css`
          display: flex;
        `}
      >
        <Button
          onClick={() => routerTo('')}
          css={css`
            border-bottom: ${isKeywordUndefined() &&
            `3px solid ${THEME.PRIMARY}`};
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
            border-bottom: ${!isKeywordUndefined() &&
            `3px solid ${THEME.PRIMARY}`};
            border-radius: 0px;
            background-color: ${THEME.TEXT.WHITE};
            color: ${isKeywordUndefined() ? THEME.TEXT.BLACK : THEME.PRIMARY};
          `}
        >
          학과 공지사항
        </Button>
      </div>
      <Suspense fallback={<AnnounceCardSkeleton length={30} />}>
        <AnnounceList resource={fetchAnnounceList(announceKeyword)} />
      </Suspense>
    </>
  );
};
export default Announcement;
