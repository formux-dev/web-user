import { useContext } from "react";
import styled, { css } from "styled-components";

import { getBorderColor, getFontFamily } from "../styles/themeValues";
import { FormContext } from "../context/FormContext";

import Title from "../Title";
import ErrorViewer from "../ErrorViewer";

export default function Rating({ block }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <StyledRating>
      <Title>{block.data.title} *</Title>
      <Description>{block.data.description}</Description>

      <StarContainer>
        {[...Array(5)].map((_, i) => (
          <div key={i}>
            <HiddenInput
              type="radio"
              name={block.key}
              aria-label={"Rate " + (i + 1)}
              checked={userData[block.key] || ""}
              required={block.data.required}
              onChange={() => setUserDataByKey(block, i + 1)}
              onFocus={() => setUserDataByKey(block, i + 1)}
              onBlur={() => errorCheck(true, block)}
            />

            {userData[block.key] >= i + 1 ? (
              <Star
                aria-hidden
                src="/star-filled.svg"
                onClick={() => setUserDataByKey(block, i + 1)}
              />
            ) : (
              <Star aria-hidden src="/star.svg" onClick={() => setUserDataByKey(block, i + 1)} />
            )}
          </div>
        ))}
      </StarContainer>

      {userData[block.key] ? (
        <CurrentRating>
          {userData[block.key]}
          {block.data.total}
        </CurrentRating>
      ) : (
        <StarHelp>{block.data.help}</StarHelp>
      )}

      <ErrorViewer error={errors[block.key]} />
    </StyledRating>
  );
}

const StyledRating = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  border-top: 1.5px solid ${props => getBorderColor(props)};
`;

const Description = styled.p`
  margin-bottom: 16px;
  font-family: ${props => getFontFamily(props)};

  ${props =>
    props.theme.centerText &&
    css`
      text-align: center;
    `};
`;

const StarContainer = styled.fieldset`
  display: flex;
  flex-direction: row;
  border: none;

  ${props =>
    props.theme.centerText &&
    css`
      justify-content: center;
    `};
`;

const Star = styled.img`
  width: 40px;
  margin: 0 4px;
  cursor: pointer;
  border: 2px solid transparent;
`;

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:focus {
    & ~ ${Star} {
      border-radius: 4px;
      border: 2px solid ${props => getBorderColor(props)};
    }
  }
`;

const StarHelp = styled.p`
  margin-top: 16px;
  font-family: ${props => getFontFamily(props)};

  ${props =>
    props.theme.centerText &&
    css`
      text-align: center;
    `};
`;

const CurrentRating = styled.h2`
  font-size: 2em;
  margin-top: 8px;

  ${props =>
    props.theme.centerText &&
    css`
      text-align: center;
    `};
`;
