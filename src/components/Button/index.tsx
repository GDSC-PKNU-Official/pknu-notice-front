import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, disabled = false, ...props }: ButtonProps) => {
  return (
    <StyledButton type="button" disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  cursor: pointer;

  width: 100%;
  height: 50px;
  margin: 4px 0;

  border-radius: 8px;

  background-color: #71bc5c;
  color: #ffffff;
  font-weight: bold;

  &:disabled {
    background-color: #e7e7e7;
    color: #868686;
    cursor: auto;
  }
`;
