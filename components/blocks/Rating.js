import { useContext } from "react";
import styled from "styled-components";

import { getBorderColor, getFontFamily } from "../styles/themeValues";
import { FormContext } from "../context/FormContext";

import Title from "../Title";
import ErrorViewer from "../ErrorViewer";

export default function Rating({ block }) {
  const { userData, setUserDataByKey, errors, errorCheck } = useContext(FormContext);

  return (
    <RatingContainer>
      <Title>{block.data.title}</Title>
      <Description>{block.data.description}</Description>

      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <div key={index}>
            <HiddenInput
              type="radio"
              aria-label={"Rate " + (index + 1)}
              checked={userData[block.key] || ""}
              required={block.data.required}
              onChange={() => setUserDataByKey(block, index + 1)}
              onFocus={() => setUserDataByKey(block, index + 1)}
              onBlur={() => errorCheck(block)}
            />

            {userData[block.key] >= index + 1 ? (
              <Star
                aria-hidden
                src="/star-filled.svg"
                onClick={() => setUserDataByKey(block, index + 1)}
              />
            ) : (
              <Star
                aria-hidden
                src="/star.svg"
                onClick={() => setUserDataByKey(block, index + 1)}
              />
            )}
          </div>
        ))}
      </StarContainer>

      {userData[block.key] ? (
        <CurrentRating>{userData[block.key]}/5 stars</CurrentRating>
      ) : (
        <StarHelp>Click a star to rate</StarHelp>
      )}

      <ErrorViewer error={errors[block.key]} />
    </RatingContainer>
  );
}

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  border-top: 1.5px solid ${props => getBorderColor(props)};
`;

const Description = styled.p`
  margin-bottom: 16px;
  font-family: ${props => getFontFamily(props)};
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
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
`;

const CurrentRating = styled.h2`
  font-size: 2em;
  margin-top: 8px;
`;
