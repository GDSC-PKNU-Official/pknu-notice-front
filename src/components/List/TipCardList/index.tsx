import { TipData } from '@constants/tip';
import styled from '@emotion/styled';
import React from 'react';

interface TipCardListProps {
  tipList: TipData[];
  tipItemRenderer: (tipItem: TipData) => JSX.Element;
}

const TipCarList = ({ tipList, tipItemRenderer }: TipCardListProps) => {
  return (
    <Container>{tipList.map((tipItem) => tipItemRenderer(tipItem))}</Container>
  );
};

export default TipCarList;

const Container = styled.section`
  display: grid;
  padding: 0 20px 10px 20px;
  grid-template-columns: 1fr auto;
  gap: 10px;
`;
