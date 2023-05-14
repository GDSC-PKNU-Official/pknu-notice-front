import http from '@apis/http';
import Button from '@components/Button';
import { SERVER_URL } from '@config/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { areaResize } from '@utils/styles/textarea-resize';
import React, { useRef, useState } from 'react';

import Modal from '..';

interface SuggestionModalProps {
  onClose: () => void;
}

const SuggestionModal = ({ onClose }: SuggestionModalProps) => {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [isEmtpy, setIsEmpty] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value) setIsEmpty(false);
    else setIsEmpty(true);
  };
  const onResize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    areaResize(e.currentTarget);
  };

  const onSuggest = async () => {
    await http.post(
      `${SERVER_URL}/api/suggestion`,
      {
        content: areaRef.current?.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  };

  return (
    <Modal onClose={onClose}>
      <ModalContent>
        <span
          css={css`
            color: ${THEME.TEXT.BLACK};
            font-weight: bold;
            margin-bottom: 15px;
          `}
        >
          건의사항
        </span>
        <TextArea
          placeholder="건의사항을 남겨주세요."
          rows={1}
          ref={areaRef}
          onKeyDown={onResize}
          onKeyUp={onResize}
          onChange={onChange}
        ></TextArea>
        <Button onClick={onSuggest} disabled={isEmtpy}>
          보내기
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default SuggestionModal;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${THEME.TEXT.WHITE};
  padding: 30px;
  border-radius: 15px;
`;

const TextArea = styled.textarea`
  line-height: 1.5;
  padding: 10px;
  resize: none;
  overflow-y: hidden;

  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;

  &::placeholder {
    color: ${THEME.TEXT.GRAY};
    font-weight: lighter;
  }
`;
