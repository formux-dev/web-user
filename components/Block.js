import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import beautify from "json-beautify";

import { FormContext } from "./context/FormContext";
import { getBorderColor } from "./styles/themeValues";

import Switch from "./Switch";
import CheckboxInput from "./blocks/CheckboxInput";
import Description from "./blocks/Description";
import MultipleChoiceInput from "./blocks/MultipleChoiceInput";
import ParagraphInput from "./blocks/ParagraphInput";
import ShortInput from "./blocks/ShortInput";
import RangeInput from "./blocks/RangeInput";
import Rating from "./blocks/Rating";

export default function Block({ block, index }) {
  const { isDebug } = useContext(FormContext);
  const [showRawData, setShowRawData] = useState(false);

  return (
    <BlockContainer isSeparated={isDebug}>
      <Switch test={block.type}>
        <Description test="description" block={block} index={index} />
        <ShortInput test="shortinput" block={block} index={index} />
        <ParagraphInput test="paragraphinput" block={block} index={index} />
        <MultipleChoiceInput test="multiplechoiceinput" block={block} index={index} />
        <CheckboxInput test="checkboxinput" block={block} index={index} />
        <RangeInput test="rangeinput" block={block} index={index} />
        <Rating test="rating" block={block} index={index} />
      </Switch>

      {isDebug && (
        <RawData>
          <div>
            <input
              type="checkbox"
              id={"debug" + index}
              value={showRawData}
              onChange={e => setShowRawData(e.target.checked)}
            />
            <label htmlFor={"debug" + index}> Show raw data</label>
          </div>

          {showRawData && <code>Block: {beautify(block, null, 2, 80)}</code>}
        </RawData>
      )}
    </BlockContainer>
  );
}

const BlockContainer = styled.div`
  margin-bottom: 32px;

  ${props =>
    props.isSeparated &&
    css`
      border: 1.5px solid ${props => getBorderColor(props)};
      border-radius: 8px;
      padding: 16px 12px;
      margin-bottom: 8px;
    `};
`;

const RawData = styled.div`
  padding-top: 12px;
  border-top: 1.5px solid ${props => getBorderColor(props)};
  margin-top: 12px;
  width: 100%;
  white-space: pre-wrap;
  appearance: initial;

  & > div > input {
    appearance: checkbox;
  }
`;
