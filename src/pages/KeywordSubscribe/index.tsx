import {
  deleteSubscribeKeyword,
  fetchSubscribeKeyword,
  postSubscribeKeyword,
} from '@apis/subscribe/subscribeKeyword';
import InformUpperLayout from '@components/InformUpperLayout';
import { KEYWORD_PAGE } from '@constants/keyword';
import TOAST_MESSAGES from '@constants/toast-message';
import styled from '@emotion/styled';
import useInput from '@hooks/useInput';
import useToasts from '@hooks/useToast';
import RegisteredKeywordList from '@pages/KeywordSubscribe/components/RegisteredKeywordList';
import { THEME } from '@styles/ThemeProvider/theme';
import { KeyboardEventHandler, useEffect, useState } from 'react';

const KeywordSubscribe = () => {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputKeyword, setInputKeyword, resetKeywords] = useInput();
  const { addToast } = useToasts();

  const fetchKeywords = async () => {
    const data = await fetchSubscribeKeyword();
    if (data) setKeywords(data);
  };

  const deleteKeyword = async (keyword: string) => {
    const res = await deleteSubscribeKeyword(keyword);

    if (res?.status !== 200) {
      addToast(TOAST_MESSAGES.ERROR_MESSAGE);
      return;
    }

    setKeywords((prevKeyword) => prevKeyword.filter((key) => key !== keyword));
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== 'Enter' || e.nativeEvent.isComposing) return;
    e.preventDefault();
    onClickSubmit();
  };

  const onClickSubmit = async () => {
    if (keywords.length > 4) {
      addToast(TOAST_MESSAGES.EXCEED_SUBSCRIBE_MAX_COUNT);
      resetKeywords();
      return;
    }

    if (inputKeyword.length < 2) {
      addToast(TOAST_MESSAGES.NEED_MORE_TEXT);
      resetKeywords();
      return;
    }

    if (keywords.includes(inputKeyword)) {
      addToast(TOAST_MESSAGES.DUPLICATE_KEYWORD);
      resetKeywords();
      return;
    }

    const res = await postSubscribeKeyword(inputKeyword);
    if (res && res.status === 200) {
      setKeywords((prevKeywords) => [...prevKeywords, inputKeyword]);
      resetKeywords();
      return;
    }

    addToast(TOAST_MESSAGES.ERROR_MESSAGE);
  };

  useEffect(() => {
    fetchKeywords();
  }, []);

  const checkIsAvailable = () => (inputKeyword.length > 1 ? true : false);

  return (
    <>
      <InformUpperLayout>
        <InformUpperLayout.InformTitle title={KEYWORD_PAGE.TITLE} />
        <InformUpperLayout.InformSubTitle subTitle={KEYWORD_PAGE.SUB_TITLE} />
      </InformUpperLayout>

      <InputWrapper>
        <KeywordInput
          onChange={setInputKeyword}
          placeholder={KEYWORD_PAGE.PLACEHOLDER}
          maxLength={15}
          onKeyDown={handleKeyDown}
          value={inputKeyword}
        />
        <KeywordSubmit
          disabled={!checkIsAvailable()}
          isAvailable={checkIsAvailable()}
          onClick={onClickSubmit}
        >
          등록
        </KeywordSubmit>
      </InputWrapper>

      <RegisteredKeywordList
        keywords={keywords}
        deleteKeyword={deleteKeyword}
      />
    </>
  );
};

export default KeywordSubscribe;

const InputWrapper = styled.div`
  padding: 0 20px 0 20px;
  position: relative;
`;

const KeywordInput = styled.input`
  width: 90%;
  border: none;
  border-bottom: 1.5px solid;
  padding: 10px;

  &:focus {
    border: none;
    outline: none;
    border-bottom: 1.5px solid;
  }
`;

const KeywordSubmit = styled.button<{ isAvailable: boolean }>`
  color: ${(prop) => (prop.isAvailable ? THEME.PRIMARY : THEME.TEXT.GRAY)};
  border: none;
  background-color: transparent;
  position: absolute;
  top: 10px;
  right: 10%;

  &: hover {
    cursor: pointer;
  }
`;
