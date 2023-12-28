import Modal from '@components/Common/Modal';
import { MODAL_MESSAGE } from '@constants/modal-messages';
import styled from '@emotion/styled';
import useMap from '@hooks/useMap';
import useModals from '@hooks/useModals';
import useUserLocation from '@hooks/useUserLocation';
import { isUserInShcool } from '@utils/map';
import React, { useEffect } from 'react';

import { handleMapBoundary } from '../handlers';

const PknuMap = () => {
  const { openModal, closeModal } = useModals();
  const { map, setPknuMap } = useMap();
  const userLocation = useUserLocation();

  useEffect(() => {
    setPknuMap();
  }, []);

  useEffect(() => {
    if (!map) return;

    if (!userLocation) {
      openModal(
        <Modal>
          <Modal.ModalTitle title={MODAL_MESSAGE.ALERT.GET_LOCATION} />
        </Modal>,
      );
      return;
    }
    closeModal();

    if (!isUserInShcool(userLocation.LAT, userLocation.LNG)) return;

    const userLocationMarker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(
        userLocation.LAT,
        userLocation.LNG,
      ),
    });
    userLocationMarker.setMap(map);
  }, [map, userLocation]);

  handleMapBoundary(map);

  return <Map id="map" />;
};

export default PknuMap;

const Map = styled.div`
  height: calc(100vh - 90px);
  width: 100%;
`;
