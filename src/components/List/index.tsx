import Icon from '@components/Icon';
import styled from '@emotion/styled';
import { IconKind } from '@type/styles/icon';
import React from 'react';

interface ListProps {
  contents: string[];
  icon: IconKind;
  title: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const List = (props: ListProps) => {
  return (
    <ListContainer>
      {props.contents.map((content) => (
        <ListWrapper key={content} onClick={props.onClick}>
          {content}
          <IconWrapper>
            <Icon kind={props.icon} />
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
