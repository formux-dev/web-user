import styled from "styled-components";
import { getErrorColor } from "./styles/themeValues";

export default function ErrorViewer({ error }) {
  if (error) {
    return (
      <Box>
        <Sign alt="Warning" src="/warning.svg" />
        <Message>{error}</Message>
      </Box>
    );
  }

  return false;
}

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => getErrorColor(props)};
`;

const Sign = styled.img`
  height: 1em;
  margin-right: 4px;
`;

const Message = styled.p`
  color: white;
`;
