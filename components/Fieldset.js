import styled from "styled-components";

export default function FieldSet({ children }) {
  return <StyledFieldSet>{children}</StyledFieldSet>;
}

const StyledFieldSet = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
`;
