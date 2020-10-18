import styled from "styled-components";

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
  background: rgba(209, 30, 6, 0.7);
`;

const Sign = styled.img`
  height: 1em;
  margin-right: 4px;
`;

const Message = styled.p`
  color: white;
`;
