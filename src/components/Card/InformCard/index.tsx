import Icon from '@components/Common/Icon';
import Modal from '@components/Common/Modal';
import { MODAL_BUTTON_MESSAGE, MODAL_MESSAGE } from '@constants/modal-messages';
import styled from '@emotion/styled';
import useMajor from '@hooks/useMajor';
import useModals from '@hooks/useModals';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';

interface InformCardProps {
  icon: IconKind & ('school' | 'schoolBuilding' | 'speaker');
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
  const { openModal } = useModals();

  const routeToMajorDecisionPage = () => routerTo('/major-decision');

  const handleMajorModal = () => {
    if (!majorRequired || major) {
      onClick();
      return;
    }

    openModal(
      <Modal>
        <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.SET_MAJOR} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.SET_MAJOR}
          iconKind="plus"
          onClick={routeToMajorDecisionPage}
        />
      </Modal>,
    );
  };

  return (
    <Card data-testid="card" onClick={handleMajorModal}>
      <IconContainer>
        <Icon kind={icon} color={THEME.TEXT.WHITE} />
      </IconContainer>
      <InfoTitle>{title}</InfoTitle>
    </Card>
  );
};

export default InformCard;

const Card = styled.div`
  padding: 5% 0 0 0;
  height: 4rem;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
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

const InfoTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;
