import { KEYWORD_PAGE } from '@constants/keyword';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';

interface RegisteredKeywordListProps {
  keywords: string[];
  deleteKeyword: (keyword: string) => void;
}

const RegisteredKeywordList = ({
  keywords,
  deleteKeyword,
}: RegisteredKeywordListProps) => {
  return (
    <Container>
      {KEYWORD_PAGE.REGISTERED_KEYWORD}
      {keywords && (
        <KeywordContainer>
          {keywords.map((keyword, index) => (
            <KeywordWrapper key={index}>
              {keyword}
              <KeywordCancel onClick={() => deleteKeyword(keyword)}>
                X
              </KeywordCancel>
            </KeywordWrapper>
          ))}
        </KeywordContainer>
      )}
    </Container>
  );
};

export default RegisteredKeywordList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5% 20px 0 20px;
`;

const KeywordContainer = styled.div`
  display: flex;
  padding-top: 10px;
  flex-wrap: wrap;
`;

const KeywordWrapper = styled.div`
  padding: 7px 7px 7px 14px;
  border: 1px solid ${THEME.TEXT.GRAY};
  border-radius: 15px;
  margin: 5px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const KeywordCancel = styled.button`
  background-color: transparent;
  border: none;
  line-height: 1px;
`;
