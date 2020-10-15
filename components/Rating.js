import { useState, useContext } from "react";
import styled, { css } from "styled-components";

import { getBorderColor, getFontFamily } from "./styles/themeValues";
import { FormContext } from "./context/FormContext";
import Title from "./Title";

export default function Rating() {
  const { rating, setRating } = useContext(FormContext);
  const [focused, setFocused] = useState(false);

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
              name="rating"
              aria-label={"Rate " + index + 1}
              name="rating"
              id={"rating" + index}
              onChange={() => setRating(index + 1)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
            />

            {rating >= index + 1 ? (
              <Star
                focused={focused && rating == index + 1}
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

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Description = styled.p`
  margin-bottom: 16px;
  font-family: ${props => getFontFamily(props)};
`;

const StarHelp = styled.p`
  margin-top: 16px;
  font-family: ${props => getFontFamily(props)};
`;

const CurrentRating = styled.h2`
  font-size: 2em;
  margin-top: 8px;
`;

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Star = styled.img`
  width: 40px;
  margin: 0 4px;
  cursor: pointer;

  ${props =>
    props.focused &&
    css`
      border-radius: 4px;
      border: 2px solid ${props => getBorderColor(props)};
    `};
`;
