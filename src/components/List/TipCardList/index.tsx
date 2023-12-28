import { TipData } from '@constants/tip';
import styled from '@emotion/styled';
import React from 'react';

interface TipCardListProps {
  tipList: readonly TipData[];
  tipItemRenderer: (tipItem: TipData) => JSX.Element;
}

const TipCardList = ({ tipList, tipItemRenderer }: TipCardListProps) => {
  return <Grid>{tipList.map((tipItem) => tipItemRenderer(tipItem))}</Grid>;
};

export default TipCardList;

const Grid = styled.section`
  display: grid;
  padding: 0 20px 10px 20px;
  grid-template-columns: 1fr auto;
  gap: 10px;
`;
