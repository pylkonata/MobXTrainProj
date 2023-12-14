import styled, { css } from 'styled-components';
type PrimaryBtnProps = {
  primary?: boolean;
  bgColor?: string;
  color?: string;
};

const StyledButton = styled.button<PrimaryBtnProps>`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  ${(props) => props.primary && css<PrimaryBtnProps>`
    background-color: ${props => props.bgColor || 'blue'};
    color: ${props => props.color || 'white'};
    &:hover {
      background-color: red;
    };
    &:disabled {
      background-color: grey;
      cursor: not-allowed;
    }
  `}
`;
interface ButtonProps extends PrimaryBtnProps {
  children?: React.ReactNode;
  type: 'button' | 'submit';
  disabled?: boolean;
}
const Button = (props: ButtonProps) => {
  return (
    <StyledButton {...props} />
  )
};

export default Button;
