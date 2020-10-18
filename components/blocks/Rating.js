import { useState, useContext } from "react";
import styled, { css } from "styled-components";

import { getBorderColor, getFontFamily } from "../styles/themeValues";
import { FormContext } from "../context/FormContext";
import Title from "../Title";

export default function Rating() {
  const { rating, setRating } = useContext(FormContext);
  // const [focused, setFocused] = useState(false);

  return (
    <RatingContainer>
      <Title>Give us feedback</Title>
      <Description>
        Please rate the overall design of this form. Your response will help us make better form
        designs for future users
      </Description>

      <StarContainer>
        {[...Array(5)].map((_, index) => (
          <div key={"rating" + index}>
            <HiddenInput
              type="radio"
              id={"rating" + index}
              aria-label={"Rate " + (index + 1)}
              onFocus={() => setRating(index + 1)}
              onChange={() => setRating(index + 1)}
            />

            {rating >= index + 1 ? (
              <Star
                aria-hidden={true}
                src="/star-filled.svg"
                onClick={() => setRating(index + 1)}
              />
            ) : (
              <Star aria-hidden={true} src="/star.svg" onClick={() => setRating(index + 1)} />
            )}
          </div>
        ))}
      </StarContainer>

      {rating ? (
        <CurrentRating>{rating}/5 stars</CurrentRating>
      ) : (
        <StarHelp>Click a star to rate</StarHelp>
      )}
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
