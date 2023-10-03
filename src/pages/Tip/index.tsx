import Icon from '@components/Icon';
import Image from '@components/Image';
import TIP_CONTENT from '@constants/tip';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import React from 'react';

const Tip = () => {
  const moveToPath = (path: string) => {
    window.open(path, '_blank');
  };

  return (
    <Container>
      {TIP_CONTENT.map((item) => {
        return (
          <TipItem key={item.id} onClick={() => moveToPath(item.path)}>
            {item.iconKind && (
              <IconContainer>
                <Icon kind={item.iconKind} color={THEME.TEXT.WHITE} />
              </IconContainer>
            )}
            {item.imagePath && (
              <Image
                src={item.imagePath}
                size="tiny"
                outline={false}
                css={css`
                  border-radius: 50%;
                `}
              />
            )}
            {item.title}
          </TipItem>
        );
      })}
    </Container>
  );
};

export default Tip;

const Container = styled.section`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;

  line-height: 4;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  border-radius: 50%;
  background-color: ${THEME.PRIMARY};
  height: 45px;
  width: 45px;
  justify-content: center;
  align-items: center;
`;

const TipItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${THEME.IVORY};
  padding: 5px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
