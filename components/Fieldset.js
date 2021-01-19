import styled from "styled-components";

export default function FieldSet({ children }) {
  return <StyledFieldset>{children}</StyledFieldset>;
}

const StyledFieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border: none;
`;
