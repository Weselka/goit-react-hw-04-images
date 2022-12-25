import styled from '@emotion/styled';

export const ErrorText = styled.p`
  color: ${props => props.theme.colors.red};
  letter-spacing: ${props => props.theme.spacing(0.2)};
  padding-bottom: ${props => props.theme.spacing(5)};
  padding-top: ${props => props.theme.spacing(5)};
  font-size: ${props => props.theme.spacing(6)};
`;

export const ErrorBox = styled.div`
  text-align: center;
`;
