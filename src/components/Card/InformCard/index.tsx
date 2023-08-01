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
import { setSize } from '@utils/styles/size';

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
        <Icon
          kind={icon}
          color={icon === 'school' ? THEME.TEXT.GRAY : THEME.TEXT.WHITE}
        />
        <span
          css={css`
            font-size: 18px;
            font-weight: bold;
          `}
        >
          {title}
        </span>
        <span
          css={css`
            font-size: 16px;
            margin: auto 0;
          `}
        >
          {title} 보러가기!
        </span>
      </Card>
    </>
  );
};

export default InformCard;

type CardProps = Pick<InformCardProps, 'icon'>;

const Card = styled.div<CardProps>(({ icon }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',

    borderRadius: '15px',

    backgroundColor: icon === 'school' ? THEME.BACKGROUND : THEME.PRIMARY,
    color: icon === 'school' ? THEME.TEXT.GRAY : THEME.TEXT.WHITE,

    '& > svg': {
      margin: '10px 0',
    },
    ...setSize(200, 150),
    cursor: 'pointer',
  };
});
