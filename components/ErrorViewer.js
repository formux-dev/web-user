import styled from "styled-components";

export default function ErrorViewer({ errors }) {
  if (errors && errors.length > 0) {
    return (
      <ErrorList>
        {errors.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </ErrorList>
    );
  }

  return false;
}

const ErrorList = styled.ul`
  margin-top: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  background: #d11e06;
  color: white;
`;
