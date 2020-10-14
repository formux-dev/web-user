import styled from "styled-components";
import { getFontFamily, getBoldFontWeight } from "./styles/themeValues";

export default function Title({ children }) {
  return <StyledTitle>{children}</StyledTitle>;
}

const StyledTitle = styled.h1`
  font-size: 2.5em;
  margin-top: 32px;
  margin-bottom: 16px;
  font-weight: ${props => getBoldFontWeight(props)};
  font-family: ${props => getFontFamily(props)};
`;
