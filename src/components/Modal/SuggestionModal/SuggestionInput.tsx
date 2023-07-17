import http from '@apis/http';
import Button from '@components/Button';
import { SERVER_URL } from '@config/index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import { areaResize } from '@utils/styles/textarea-resize';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

interface SuggestionInputProps {
  setIsSended: Dispatch<SetStateAction<boolean>>;
}

const SuggestionInput = ({ setIsSended }: SuggestionInputProps) => {
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(true);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value || e.currentTarget.value.length < 5) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
  };
  const onResize = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    areaResize(e.currentTarget);
  };

  const onSuggest = async () => {
    setIsSended((prev) => !prev);
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
    <>
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
        minLength={5}
        placeholder="건의사항을 5글자 이상 남겨주세요."
        rows={1}
        ref={areaRef}
        onKeyDown={onResize}
        onKeyUp={onResize}
        onChange={onChange}
      ></TextArea>
      <Button onClick={onSuggest} disabled={isInvalid}>
        보내기
      </Button>
    </>
  );
};

export default SuggestionInput;

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
