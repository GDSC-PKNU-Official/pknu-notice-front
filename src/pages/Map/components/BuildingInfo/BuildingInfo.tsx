import styled from '@emotion/styled';
import useDragInfo from '@hooks/useDragInfo';
import React, { useRef } from 'react';

import Boundary from './Boundary';
import InfoContent from './InfoContent';

const shouldUnmountInfo = (className: string) => {
  return className === 'info-background' || className === 'info-boundary';
};

interface BuildingInfoProps {
  buildingNumber: string;
  unmountInfo: () => void;
}

const BuildingInfo = ({ buildingNumber, unmountInfo }: BuildingInfoProps) => {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const {
    currentPosition: { top, height },
    handleDrag,
  } = useDragInfo(boundaryRef);

  const handleUnmount = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = e.target as HTMLElement;
    const className = clickedElement.classList[0];

    if (!shouldUnmountInfo(className)) return;
    unmountInfo();
  };

  return (
    <BackGround onClick={handleUnmount} className="info-background">
      <Boundary ref={boundaryRef} className="info-boundary">
        <div style={{ height, top, position: 'relative' }}>
          <InfoContent buildingNumber={buildingNumber} />
          <CursorContainer {...handleDrag}>
            <Cursor />
          </CursorContainer>
        </div>
      </Boundary>
    </BackGround>
  );
};

export default BuildingInfo;

const BackGround = styled.div`
  position: absolute;
  min-height: calc(100vh - 90px);
  max-width: 480px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const CursorContainer = styled.div`
  position: absolute;
  z-index: 999;
  height: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  cursor: n-resize;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Cursor = styled.div`
  position: relative;
  height: 1.5px;
  width: 2rem;
  border-radius: 30px;
  background-color: black;
`;
