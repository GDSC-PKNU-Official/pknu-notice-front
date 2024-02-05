import InformHalfCard from '@components/Card/InformHalfCard';
import Icon from '@components/Common/Icon';
import WebpImage from '@components/Common/WebpImage';
import {
  ANNOUNCEMENT_TITLE,
  ANNOUNCE_SUB_TITLE,
} from '@constants/announcement';
import PATH from '@constants/path';
import { TIP_ROUTING_CARD } from '@constants/tip';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

const ExtraInfo = () => {
  const { routerTo } = useRouter();

  return (
    <>
      <FlatContainer>
        <InformHalfCard
          asset={() => <Icon kind="account" size="45" color={THEME.PRIMARY} />}
          title={ANNOUNCEMENT_TITLE.RECRUIT}
          subTitle={ANNOUNCE_SUB_TITLE.RECURIT}
          onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('recruit'))}
        />
        <InformHalfCard
          asset={() => <Icon kind="language" size="45" color={THEME.PRIMARY} />}
          title={ANNOUNCEMENT_TITLE.LANGUAGE}
          subTitle={ANNOUNCE_SUB_TITLE.LANGUAGE}
          onClick={() => routerTo(PATH.NORMAL_ANNOUNCEMENT('language'))}
        />
      </FlatContainer>
      <InformHalfCard
        asset={() => (
          <WebpImage
            wepbPath={TIP_ROUTING_CARD.WEBP_PATH}
            normalPath={TIP_ROUTING_CARD.NORMAL_PATH}
            title="baekgyoung image"
            size="halfCard"
          />
        )}
        title={TIP_ROUTING_CARD.TITLE}
        subTitle={TIP_ROUTING_CARD.SUB_TITLE}
        onClick={() => routerTo(PATH.TIP.SHORTCUT)}
        css={css`
          h2 {
            font-size: 16px;
          }
          h3 {
            font-size: 12px;
          }
        `}
      />
    </>
  );
};

export default ExtraInfo;

const FlatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  margin-bottom: 5%;
  gap: 10px;
`;
