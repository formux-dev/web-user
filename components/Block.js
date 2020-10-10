import { useState } from "react";
import styled, { css } from "styled-components";

import Switch from "./Switch";

import CheckboxInput from "./blocks/CheckboxInput";
import Description from "./blocks/Description";
import MultipleChoiceInput from "./blocks/MultipleChoiceInput";
import ParagraphInput from "./blocks/ParagraphInput";
import ShortInput from "./blocks/ShortInput";

export default function Block({ block, index, globalDebug, value, onChange }) {
    const [debug, setDebug] = useState(false);

    return (
        <BlockContainer isSeparated={globalDebug}>
        <Switch test={block.type}>
            <Description test="description" block={block} />
            <ShortInput
            test="shortinput"
            block={block}
            value={value}
            onChange={(value) => onChange({ key: block.key, value })}
            />
            <ParagraphInput
            test="paragraphinput"
            block={block}
            value={value}
            onChange={(value) => onChange({ key: block.key, value })}
            />
            <MultipleChoiceInput
            test="multiplechoiceinput"
            block={block}
            value={value}
            onChange={(value) => onChange({ key: block.key, value })}
            />
            <CheckboxInput
            test="checkboxinput"
            block={block}
            value={value}
            onChange={(value) => onChange({ key: block.key, value })}
            />
        </Switch>

        {globalDebug && (
            <RawData>
            <div>
                <input
                type="checkbox"
                id={"debug" + index}
                value={debug}
                onChange={(e) => setDebug(e.target.checked)}
                />
                <label htmlFor={"debug" + index}> Show raw data</label>
            </div>

            {debug && <code>Block: {beautify(block, null, 2, 80)}</code>}
            </RawData>
        )}
        </BlockContainer>
    );
}

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