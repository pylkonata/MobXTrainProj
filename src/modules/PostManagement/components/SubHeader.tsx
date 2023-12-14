import styled from 'styled-components';


interface Props {
  color?: string;
  fontSize?: string;
}

const StyledSubHeader = styled.h3<Props>`
  color: ${props => props.color || 'red'};
  font-size: ${props => props.fontSize || '1rem'};
`;

interface SubHeaderProps extends Props {
  children?: React.ReactNode;
}


const SubHeader = (props: SubHeaderProps) => {
  return (
    <StyledSubHeader {...props} />
  )
}

export default SubHeader;
