import Icon from '@components/Common/Icon';
import PATH from '@constants/path';
import PLCACEHOLDER_MESSAGES from '@constants/placeholder-message';
import TOAST_MESSAGES from '@constants/toast-message';
import styled from '@emotion/styled';
import useRouter from '@hooks/useRouter';
import useToasts from '@hooks/useToast';
import React, { useRef } from 'react';

interface InformSearchForm {
  category: 'school' | 'major' | 'language' | 'recruit';
}

const InformSearchForm = ({ category }: InformSearchForm) => {
  const { routerTo } = useRouter();
  const { addToast } = useToasts();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!inputRef.current) return;
    e.preventDefault();

    if (inputRef.current.value.length === 0) {
      addToast(TOAST_MESSAGES.SEARCH_KEYWORD);
      return;
    }

    routerTo(PATH.SEARCH_ANNOUNCEMENT(category, inputRef.current.value));
    inputRef.current.value = '';
    inputRef.current.blur();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput
        ref={inputRef}
        type="text"
        placeholder={PLCACEHOLDER_MESSAGES.SEARCH_TITLE}
      />
      <StyledIconWrapper onClick={() => handleSubmit}>
        <Icon kind="search" color="#7A9DD3" />
      </StyledIconWrapper>
    </StyledForm>
  );
};

export default InformSearchForm;

const StyledForm = styled.form`
  display: flex;
  position: relative;
`;

const StyledInput = styled.input`
  -webkit-appearance: none;
  appearance: none;

  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 15px;
  background-color: #7a9dd30f;
  color: #7a9dd366;
  font-size: 14px;
  text-indent: 5px;

  &::placeholder {
    color: #7a9dd366;
    font-size: 14px;
  }
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  &:focus {
    outline: none;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledIconWrapper = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
`;
