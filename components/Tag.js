import styled from "styled-components";
import { getTagBackground, getTextColor } from "./styles/themeValues";

const Tag = styled.p`
  display: inline-block;
  background: ${props => getTagBackground(props)};
  color: ${props => getTextColor(props)};
  padding: 2px 6px;
  border-radius: 4px;
`;

export default Tag;
