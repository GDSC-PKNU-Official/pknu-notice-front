import Icon from '@components/Icon';
import AlertModal from '@components/Modal/AlertModal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';

// TODO: InformCard 컴포넌트 Props 및 로직 수정

interface InformCardProps {
  icon: IconKind & ('school' | 'notification');
  title: string;
  majorRequired: boolean;
  onClick: () => void;
}

const InformCard = ({
  icon,
  title,
  majorRequired,
  onClick,
}: InformCardProps) => {
  const { major } = useMajor();
  const { routerTo } = useRouter();
  const routerToMajorDecision = () => routerTo('/major-decision');
  const { openModal, closeModal } = useModals();

  const handleMajorModal = () => {
    if (!majorRequired || major) {
      onClick();
      return;
    }
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
  };

  return (
    <>
      <Card data-testid="card" icon={icon} onClick={handleMajorModal}>
        <Wrapper>
          <div
            css={css`
              display: flex;
              border-radius: 50%;
              background-color: ${THEME.PRIMARY};
              height: 45px;
              width: 45px;
              justify-content: center;
              align-items: center;
            `}
          >
            <Icon kind={icon} color={THEME.TEXT.WHITE} />
          </div>
        </Wrapper>
        <Wrapper>
          <span
            css={css`
              font-size: 13px;
            `}
          >
            {title}
          </span>
          <span
            css={css`
              font-size: 15px;
              margin: auto 0;
              font-weight: bold;
            `}
          >
            {title} 보러가기
          </span>
        </Wrapper>
      </Card>
    </>
  );
};

export default InformCard;

type CardProps = Pick<InformCardProps, 'icon'>;

const Card = styled.div<CardProps>(({ icon }) => {
  return {
    display: 'flex',
    flexDirection: 'row',
    padding: '3% 1% 2% 0',

    // backgroundColor: THEME.BACKGROUND,
    color: THEME.TEXT.GRAY,
    // boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',

    height: '70px',

    '& > svg': {
      margin: '10px 0',
    },
    cursor: 'pointer',
  };
});

const Wrapper = styled.div`
  &: first-child {
    display: flex;
    align-items: center;
  }

  &: nth-child(2) {
    display: flex;
    flex-direction: column;
    padding: 15px 0 10px 10px;
  }
`;
