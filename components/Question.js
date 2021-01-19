import styled from "styled-components";

function Question({ block }) {
  return (
    <StyledQuestion>
      {block.data.question} {block.data.required && <span>*</span>}
    </StyledQuestion>
  );
}

const StyledQuestion = styled.p`
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
`;

export default Question;
