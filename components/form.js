import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import beautify from "json-beautify";
import TextareaAutosize from 'react-autosize-textarea';

export default function Form({ formID }) {
  return (
    <Wrapper>
      <Content>
        <Navbar>
          <div>
            <img src="/favicon-192x192.png"></img>
            <h1>Formux Survey</h1>
          </div>
          <Tag>Alpha</Tag>
        </Navbar>
        <Main>
          <FormFields formID={formID}></FormFields>
        </Main>
      </Content>
    </Wrapper>
  );
}

function FormFields({ formID }) {
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [globalDebug, setGlobalDebug] = useState(false);

  useEffect(() => {
    fetch(
      `http://us-central1-formux-8d67b.cloudfunctions.net/form?formID=${formID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTimeout(() => {
          // Inital values
          setUserData(
            Object.assign(
              {},
              ...data.blocks.map((block) =>
                block.key
                  ? {
                      [block.key]: block.data.responseIsArray ? [] : "",
                    }
                  : null
              )
            )
          );
          setFormData(data);
        }, 500);
      });
  }, []);

  return (
    <form>
      <Tag style={{ marginBottom: "32px" }}>
        <input
          type="checkbox"
          id="debug"
          value={globalDebug}
          onChange={(e) => setGlobalDebug(e.target.checked)}
        />
        <label htmlFor="debug"> Debug mode</label>
      </Tag>

      <h2>{formData.meta && formData.meta.title}</h2>

      {formData.blocks ? (
        formData.blocks &&
        formData.blocks.map((block, index) => (
          <Block
            block={block}
            key={index}
            index={index}
            globalDebug={globalDebug}
            onChange={({ key, value }) => {
              setUserData((prevState) => ({
                ...prevState,
                [key]: value,
              }));
            }}
            value={userData[block.key]}
          />
        ))
      ) : (
        <p>Loading form...</p>
      )}

      {globalDebug && (
        <p style={{ whiteSpace: "pre-wrap", marginTop: "64px" }}>
          Userdata: {beautify(userData, null, 2, 80)}
        </p>
      )}
    </form>
  );
}

function Switch({ children, test }) {
  const correctChild = children.find((child) => child.props.test === test);

  return correctChild ?? <Tag>Block type implemented</Tag>;
}

function Block({ block, index, globalDebug, value, onChange }) {
  const [debug, setDebug] = useState(false);

  return (
    <FormField isSeparated={globalDebug}>
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
        <p id="data">
          <div>
            <input
              type="checkbox"
              id={"debug" + index}
              value={debug}
              onChange={(e) => setDebug(e.target.checked)}
            />
            <label for={"debug" + index}> Show raw data</label>
          </div>

          {debug && <code>Block: {beautify(block, null, 2, 80)}</code>}
        </p>
      )}
    </FormField>
  );
}

function Description({ block }) {
  return (
    <div>
      <p>{block.data.text}</p>
    </div>
  );
}

function ShortInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function ParagraphInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      <TextArea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function MultipleChoiceInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div>
          <input
            type="radio"
            checked={text == value}
            id={block.key + index}
            name={text}
            onChange={(e) => onChange(text)}
          />
          <label htmlFor={block.key + index}> {text}</label>
        </div>
      ))}
    </div>
  );
}

function CheckboxInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={block.key + index}
            name={text}
            checked={value ? value.includes(text) : false}
            onChange={(e) => {
              onChange(
                e.target.checked
                  ? [...value, text]
                  : value.filter((x) => x != text)
              );
            }}
          />
          <label htmlFor={block.key + index}> {text}</label>
        </div>
      ))}
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 700px;
  width: 70%;
  padding: 64px 0;

  @media (max-width: 500px) {
    max-width: unset;
    width: 100%;
    padding: 24px 16px;
  }
`;

const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 64px;

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  & > div > img {
    width: 48px;
    margin-right: 16px;
  }

  @media (max-width: 500px) {
    & > div > img {
      width: 32px;
      margin-right: 16px;
    }
  }
`;

const Tag = styled.p`
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  color: rgba(0, 0, 0, 0.6);
  padding: 2px 6px;
  border-radius: 4px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > form {
    width: 100%;
  }

  & > form > h2 {
    font-size: 2.5em;
    margin-bottom: 16px;
  }
`;

const FormField = styled.div`
  margin-bottom: 24px;

  ${(props) =>
    props.isSeparated &&
    css`
      display: block;
      border: 2px solid rgba(0, 0, 0, 0.2);
      border-radius: 8px;
      padding: 16px 12px;
      margin-bottom: 8px;

      &:nth-last-child() {
        border: none;
      }

      /* TODO: Fix this ugly shit */
      & > p#data {
        padding-top: 8px;
        border-top: 2px solid rgba(0, 0, 0, 0.2);
        margin-top: 8px;
        width: 100%;
        white-space: pre-wrap;
      }
    `};
`;

const Input = styled.input`
 padding: 12px 8px;
  border-radius: 4px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;

  &:focus {
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px #4aabff;
  }
`;

const TextArea = styled(TextareaAutosize)`
  resize: none;
  padding: 12px 8px;
  border-radius: 4px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;

  &:focus {
    border-color: transparent;
    box-shadow: 0px 0px 0px 3px #4aabff;
  }

`;

const Question = styled.p`
  margin-bottom: 8px;
`;
