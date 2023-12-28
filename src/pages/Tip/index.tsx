import TipCard from '@components/Card/TipCard';
import InformUpperLayout from '@components/InformUpperLayout';
import TipCardList from '@components/List/TipCardList';
import PATH from '@constants/path';
import {
  HONEY_TIP_DATA,
  SHORTCUT_DATA,
  TIP_PAGE,
  TIP_TYPE,
  TipData,
} from '@constants/tip';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import openLink from '@utils/router/openLink';
import React from 'react';
import { useParams } from 'react-router-dom';

const Tip = () => {
  const { type } = useParams();
  if (!type) return <></>;

  const { routerTo } = useRouter();
  const routerToShortcut = () => routerTo(PATH.TIP.SHORTCUT);
  const routerToHoneyTip = () => routerTo(PATH.TIP.HONEY_TIP);
  const tipList = type === TIP_TYPE.SHORTCUT ? SHORTCUT_DATA : HONEY_TIP_DATA;

  return (
    <Container>
      <InformUpperLayout>
        <InformUpperLayout.InformTitle title={TIP_PAGE.TITLE} />
        <InformUpperLayout.InformSubTitle subTitle={TIP_PAGE.SUB_TITLE} />
        <InformUpperLayout.InformTypeButton
          type={TIP_PAGE.BUTTON.SHORTCUT}
          isActive={type === TIP_TYPE.SHORTCUT}
          onClick={routerToShortcut}
        />
        <InformUpperLayout.InformTypeButton
          type={TIP_PAGE.BUTTON.HONEY_TIP}
          isActive={type === TIP_TYPE.HONEY_TIP}
          onClick={routerToHoneyTip}
        />
      </InformUpperLayout>
      <TipCardList
        tipList={tipList}
        tipItemRenderer={(tipItem: TipData) => (
          <TipCard onClick={() => openLink(tipItem.link)}>
            <TipCard.TipTitle title={tipItem.title} />
            <TipCard.TipSubTitle subTitle={tipItem.subTitle} />
            <TipCard.TipImage
              title={tipItem.title}
              webpPath={tipItem.webpPath}
              pngPath={tipItem.pngPath}
            />
          </TipCard>
        )}
      />
    </Container>
  );
};

export default Tip;

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;
