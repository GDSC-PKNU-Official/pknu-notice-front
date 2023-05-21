import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { IconKind } from '@type/styles/icon';
import React, { useState } from 'react';

interface ListProps {
  contents: string[];
  icon: IconKind;
  altIcon: IconKind;
  title: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const List = (props: ListProps) => {
  const [selected, setSelected] = useState<string | null>();
  const onClick = props.onClick
    ? props.onClick
    : (e: React.MouseEvent<HTMLElement>) => {
        setSelected(e.currentTarget.textContent);
      };

  return (
    <ListContainer>
      {props.contents.map((content) => (
        <ListWrapper key={content} onClick={onClick}>
          {content}
          <IconWrapper>
            <Icon
              kind={selected === content ? props.altIcon : props.icon}
              color={selected === content ? THEME.PRIMARY : THEME.TEXT.GRAY}
            />
          </IconWrapper>
        </ListWrapper>
      ))}
    </ListContainer>
  );
};

export default List;

const ListContainer = styled.div``;

const ListWrapper = styled.div`
  padding: 3%;
`;

const IconWrapper = styled.div`
  float: right;
`;
