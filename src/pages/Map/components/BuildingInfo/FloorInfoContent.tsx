import ToggleInfo from '@components/Common/ToggleInfo';
import styled from '@emotion/styled';
import { Floor, FloorInfo, Room } from '@type/building-info';
import { formatFloorTitle } from '@utils/map/building-info';
import React, { Fragment } from 'react';

interface FloorInfoContentProps {
  floorType: Floor;
  infoContent: FloorInfo | Record<string, never>;
}

const FloorInfoContent = ({
  floorType,
  infoContent,
}: FloorInfoContentProps) => {
  if (Object.keys(infoContent).length === 0) return <></>;

  return (
    <>
      {Object.keys(infoContent).map((floor, index) => (
        <Fragment key={index}>
          <ToggleInfo
            infoTitle={() => (
              <FloorText>
                {formatFloorTitle(floorType as Floor, floor)}
              </FloorText>
            )}
            infoDesc={() => (
              <RoomInfoContainer key={index}>
                {(infoContent[floor] as Room[]).map(
                  ({ roomNumber, roomName }, dataIndex) => (
                    <RoomInfo key={dataIndex}>
                      <RoomNumber>{roomNumber}</RoomNumber>
                      <Seperator />
                      <RoomName>{roomName}</RoomName>
                    </RoomInfo>
                  ),
                )}
              </RoomInfoContainer>
            )}
          />
          <BoundaryLine />
        </Fragment>
      ))}
    </>
  );
};

export default FloorInfoContent;

const FloorText = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
`;

const RoomInfoContainer = styled.section`
  border: 1px solid #e5e5e5;

  & :last-child {
    border-bottom: none;
  }
`;

const RoomInfo = styled.div`
  padding: 0.6rem;
  height: 2rem;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const RoomNumber = styled.span`
  width: 25%;
  margin-right: 0.7rem;
`;

const RoomName = styled.span`
  width: 75%;
  line-height: 1.4;
`;

const Seperator = styled.div`
  width: 1px;
  height: 3.2rem;
  background-color: #e5e5e5;
  margin-right: 1rem;
`;

const BoundaryLine = styled.hr`
  height: 1px;
  background-color: #ededed;
  border: none;
`;
