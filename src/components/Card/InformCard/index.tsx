import Icon from '@components/Icon';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals, { modals } from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';

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
  const { openModal, closeModal } = useModals();

  const routeToMajorDecisionPage = () => routerTo('/major-decision');

  const handleMajorModal = () => {
    if (!majorRequired || major) {
      onClick();
      return;
    }
    openModal<typeof modals.alert>(modals.alert, {
      message: MODAL_MESSAGE.ALERT.SET_MAJOR,
      buttonMessage: MODAL_BUTTON_MESSAGE.SET_MAJOR,
      iconKind: 'plus',
      onClose: () => closeModal(modals.alert),
      routerTo: () => {
        closeModal(modals.alert);
        routeToMajorDecisionPage();
      },
    });
  };

  return (
    <>
      <Card data-testid="card" onClick={handleMajorModal}>
        <IconContainer>
          <Icon kind={icon} color={THEME.TEXT.WHITE} />
        </IconContainer>
        <TextContainer>
          <span>{title}</span>
          <span>{title} 보러가기</span>
        </TextContainer>
      </Card>
    </>
  );
};

export default InformCard;

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 3% 1% 2% 0;
  height: 4rem;

  transition: all 0.2s ease-in-out;

  span:nth-of-type(1) {
    font-size: 12px;
    color: ${THEME.TEXT.GRAY};
  }

  span:nth-of-type(2) {
    font-size: 16px;
    font-weight: bold;
    color: ${THEME.TEXT.BLACK};
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const IconContainer = styled.div`
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  border-radius: 50%;
  background-color: ${THEME.PRIMARY};
`;
