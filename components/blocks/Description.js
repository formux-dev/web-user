import styled, { css } from "styled-components";
import { getFontFamily } from "../styles/themeValues";

export default function Description({ block }) {
  return <StyledDescription>{block.data.text}</StyledDescription>;
}

const StyledDescription = styled.p`
  font-family: ${props => getFontFamily(props)};

  ${props =>
    props.theme.centerText &&
    css`
      text-align: center;
    `};
`;
