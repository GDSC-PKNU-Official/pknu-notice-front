import Icon from '@components/Common/Icon';
import { FAQ_CONSTANTS } from '@constants/FAQ';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { THEME } from '@styles/ThemeProvider/theme';
import openLink from '@utils/router/openLink';
import React, { useState } from 'react';

interface FAQBoxProps {
  readonly question: string;
  readonly answer: {
    readonly text: string;
    readonly link?: string;
  };
}

const FAQBox = ({ question, answer }: FAQBoxProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const toggleAnswer = () => setShowAnswer((prevState) => !prevState);

  const answerTextSeperatedLine = answer.text.split(
    FAQ_CONSTANTS.LINE_SEPERATOR,
  );
  const moveToLink = () => {
    if (!answer.link) return;
    openLink(answer.link);
  };
  const hasAnswerLink = () => !!answer.link;

  return (
    <>
      <QuestionContainer onClick={toggleAnswer} showAnswer={showAnswer}>
        <QuestionMark>{FAQ_CONSTANTS.QUESTION_MARK}</QuestionMark>
        <QuestionText>{question}</QuestionText>
        <IconContainer>
          <Icon kind="arrowDown" size="24" />
        </IconContainer>
      </QuestionContainer>
      {showAnswer && (
        <AnswerContainer>
          {answerTextSeperatedLine.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          {hasAnswerLink() && (
            <StyledLink onClick={moveToLink}>{FAQ_CONSTANTS.LINK}</StyledLink>
          )}
        </AnswerContainer>
      )}
      <BoundaryLine />
    </>
  );
};

export default FAQBox;

const QuestionContainer = styled.div<{ showAnswer: boolean }>`
  position: relative;
  padding: 10px 0px 10px 0px;
  display: flex;
  align-items: center;

  ${({ showAnswer }) => css`
    & > span {
      color: ${showAnswer && THEME.PRIMARY};
    }
    & > div > svg {
      transform: ${showAnswer ? 'rotate(-180deg)' : 'rotate(0deg)'};
      transition: all ease 0.3s;
    }
  `}
`;

const QuestionMark = styled.span`
  font-weight: bold;
`;

const QuestionText = styled.span`
  text-indent: 1rem;
`;

const IconContainer = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const AnswerContainer = styled.div`
  background-color: #7a9dd31a;
  color: ${THEME.TEXT.BLACK};
  line-height: 1.8;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
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
