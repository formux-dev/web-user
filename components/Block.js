import { useState, useContext } from "react";
import styled, { css } from "styled-components";
import beautify from "json-beautify";

import Switch from "./Switch";
import { FormContext } from "./context/FormContext";

import CheckboxInput from "./blocks/CheckboxInput";
import Description from "./blocks/Description";
import MultipleChoiceInput from "./blocks/MultipleChoiceInput";
import ParagraphInput from "./blocks/ParagraphInput";
import ShortInput from "./blocks/ShortInput";

export default function Block({ block, index }) {
  const { debug } = useContext(FormContext);
  const [showRawData, setShowRawData] = useState(false);

  return (
    <BlockContainer isSeparated={debug}>
      <Switch test={block.type}>
        <Description test="description" block={block} />
        <ShortInput
          test="shortinput"
          block={block}
        />
        <ParagraphInput
          test="paragraphinput"
          block={block}
        />
        <MultipleChoiceInput
          test="multiplechoiceinput"
          block={block}
        />
        <CheckboxInput
          test="checkboxinput"
          block={block}
        />
      </Switch>

      {debug && (
        <RawData>
          <div>
            <input
              type="checkbox"
              id={"debug" + index}
              value={showRawData}
              onChange={(e) => setShowRawData(e.target.checked)}
            />
            <label htmlFor={"debug" + index}> Show raw data</label>
          </div>

          {showRawData && <code>Block: {beautify(block, null, 2, 80)}</code>}
        </RawData>
      )}
    </BlockContainer>
  );
}


// function updateBlock(prev, key, value) {
//   return {
//     ...prev,
//     [key]: value,
//   }
// }


const BlockContainer = styled.div`
  margin-bottom: 24px;

  ${(props) =>
    props.isSeparated &&
    css`
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 16px 12px;
      margin-bottom: 8px;
    `};
`;

const RawData = styled.div`
  padding-top: 8px;
  border-top: 2px solid rgba(0, 0, 0, 0.2);
  margin-top: 8px;
  width: 100%;
  white-space: pre-wrap;
`