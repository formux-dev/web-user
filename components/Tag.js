import styled from "styled-components";

const Tag = styled.p`
  display: inline-block;
  background: ${props => (props.theme.colorTheme == "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")};
  color: ${props => (props.theme.colorTheme == "dark" ? "white" : "black")};
  padding: 2px 6px;
  border-radius: 4px;
`;

export default Tag;
