import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TotalFloorInfo } from '@type/building-info';
import React from 'react';

import FloorInfoContent from './FloorInfoContent';

interface FloorInfoProps {
  floorInfo: TotalFloorInfo | Record<string, never>;
}

const FloorInfo = ({ floorInfo }: FloorInfoProps) => {
  if (Object.keys(floorInfo).length === 0) {
    return <></>;
  }

  const { basement, ground, rooftop } = floorInfo;

  return (
    <section
      css={css`
        padding: 20px 0px 0px 0px;
        line-height: 2;
      `}
    >
      <span
        css={css`
          font-size: 1rem;
        `}
      >
        층별 안내
      </span>
      <BoundaryLine />
      <FloorInfoContent floorType="basement" infoContent={basement} />
      <FloorInfoContent floorType="ground" infoContent={ground} />
      <FloorInfoContent floorType="rooftop" infoContent={rooftop} />
    </section>
  );
};

export default FloorInfo;

const BoundaryLine = styled.hr`
  height: 1px;
  background-color: #ededed;
  border: none;
`;
