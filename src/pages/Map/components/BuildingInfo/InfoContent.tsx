import Button from '@components/Common/Button';
import Icon from '@components/Common/Icon';
import Image from '@components/Common/Image';
import Modal from '@components/Common/Modal';
import { MODAL_BUTTON_MESSAGE } from '@constants/modal-messages';
import TOAST_MESSAGES from '@constants/toast-message';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useBuildingInfo from '@hooks/useBuildingInfo';
import useModals from '@hooks/useModals';
import useToasts from '@hooks/useToast';
import useUserLocation from '@hooks/useUserLocation';
import { THEME } from '@styles/ThemeProvider/theme';
import { forrmatRoutingUrl } from '@utils/map/building-info';
import { hasLocationPermission } from '@utils/map/user-location';
import openLink from '@utils/router/openLink';
import React, { CSSProperties } from 'react';

import FloorInfo from './FloorInfo';

interface InfoContentProps {
  buildingNumber: string;
}

const InfoContent = ({ buildingNumber }: InfoContentProps) => {
  const userLocation = useUserLocation();
  const { openModal } = useModals();
  const { addToast } = useToasts();
  const {
    floorInfo,
    buildingInfo: { buildingName, imgPath, color, latlng },
  } = useBuildingInfo(buildingNumber);

  const buildingLabel = `${buildingNumber} ${buildingName}`;

  const handleRoutingModal = () => {
    if (!hasLocationPermission(userLocation)) {
      addToast(TOAST_MESSAGES.SHARE_LOCATION);
      return;
    }

    const openUrl = forrmatRoutingUrl(userLocation, latlng, buildingName);

    openModal(
      <Modal>
        <Modal.ModalTitle
          title={`목적지(${buildingNumber})로 길찾기를 시작할까요?`}
        />
        <Modal.ModalButton text={MODAL_BUTTON_MESSAGE.NO} />
        <Modal.ModalButton
          text={MODAL_BUTTON_MESSAGE.YES}
          onClick={() => openLink(openUrl)}
        />
      </Modal>,
    );
  };

  return (
    <Wrapper>
      <ContentContainer>
        <ContentHeader>
          <BuildingLabel color={color}>{buildingLabel}</BuildingLabel>
          <Image src={imgPath} size="building" />
          <Button
            onClick={handleRoutingModal}
            css={css`
              border: 1px solid ${THEME.PRIMARY};
              background-color: ${THEME.TEXT.WHITE};
              font-weight: 300;
              height: 2.5rem;
              border-radius: 30px;
              margin: 0;
            `}
          >
            <Icon kind="location" color={THEME.TEXT.BLACK} size="24" />
            <ButtonText>도착</ButtonText>
          </Button>
        </ContentHeader>
        <FloorInfo floorInfo={floorInfo} />
      </ContentContainer>
    </Wrapper>
  );
};

// TODO : memo를 사용한 경우와 그렇지 않은 경우 렌더링 속도 비교하기
export default React.memo(InfoContent);

const Wrapper = styled.section`
  position: absolute;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  background-color: white;
  cursor: move;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ContentContainer = styled.div`
  position: relative;
  padding: 40px 30px 0px 30px;
`;

const ContentHeader = styled.header`
  padding: 0px 0px 20px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  row-gap: 1.2rem;
`;

const BuildingLabel = styled.span<{ color: CSSProperties['color'] }>`
  color: ${({ color }) => color};
  font-size: 1.2rem;
  font-weight: bold;
`;

const ButtonText = styled.span`
  color: ${THEME.TEXT.BLACK};
  font-size: 1rem;
`;
