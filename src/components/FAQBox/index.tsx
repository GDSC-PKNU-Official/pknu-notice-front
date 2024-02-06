import ToggleInfo from '@components/Common/ToggleInfo';
import { FAQ_CONSTANTS } from '@constants/FAQ';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import openLink from '@utils/router/openLink';
import React from 'react';

interface FAQBoxProps {
  readonly question: string;
  readonly answer: {
    readonly text: string;
    readonly link?: string;
  };
}

const FAQBox = ({ question, answer }: FAQBoxProps) => {
  const moveToLink = () => {
    if (!answer.link) return;

    openLink(answer.link);
  };

  const hasLink = !!answer.link;

  return (
    <>
      <ToggleInfo
        infoTitle={() => (
          <>
            <span
              css={css`
                font-weight: bold;
              `}
            >
              {FAQ_CONSTANTS.QUESTION_MARK}
            </span>
            <QuestionText>{question}</QuestionText>
          </>
        )}
        infoDesc={() => (
          <AnswerContainer>
            {answer.text}
            {hasLink && (
              <StyledLink onClick={moveToLink}>{FAQ_CONSTANTS.LINK}</StyledLink>
            )}
          </AnswerContainer>
        )}
      />
      <BoundaryLine />
    </>
  );
};

export default FAQBox;

const QuestionText = styled.span`
  text-indent: 1rem;
`;

const AnswerContainer = styled.div`
  background-color: #7a9dd31a;
  color: ${THEME.TEXT.BLACK};
  line-height: 1.8;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  white-space: pre-line;
`;

const StyledLink = styled.span`
  color: ${THEME.PRIMARY};
  border-bottom: 1px solid ${THEME.PRIMARY};
`;

const BoundaryLine = styled.hr`
  height: 1px;
  background-color: #ededed;
  border: none;
`;
