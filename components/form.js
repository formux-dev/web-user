import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import beautify from "json-beautify";

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
  const [userData, setUserData] = useState([]);
  const [globalDebug, setGlobalDebug] = useState(false);

  useEffect(() => {
    fetch(
      `http://us-central1-formux-8d67b.cloudfunctions.net/form?formID=${formID}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setTimeout(() => {
          setFormData(data);
        }, 500);
      });
  }, []);

  return (
    <form>
      <Tag style={{ marginBottom: "32px" }}>
        <input
          type="checkbox"
          id={"debug"}
          value={globalDebug}
          onChange={(e) => setGlobalDebug(e.target.checked)}
        />
        <label for={"debug"}> Debug mode</label>
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
          />
        ))
      ) : (
        <p>Loading form...</p>
      )}
    </form>
  );
}

function Switch({ children, test }) {
  const correctChild = children.find((child) => child.props.value === test);

  return correctChild ?? <p>Not implemented</p>;
}

function Block({ block, index, globalDebug }) {
  const [debug, setDebug] = useState(false);

  return (
    <FormField isSeparated={globalDebug}>
      <Switch test={block.type}>
        <Description value="description" block={block} />
        <ShortInput value="shortinput" block={block} />
        <CheckboxInput value="checkboxinput" block={block} />
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
            <label for={"debug" + index}> Show data</label>
          </div>

          {debug && <code>{beautify(block, null, 2, 80)}</code>}
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

function ShortInput({ block }) {
  return (
    <div>
      <p>{block.data.question}</p>
      <input />
    </div>
  );
}

function CheckboxInput({ block }) {
  return (
    <div>
      <p>{block.data.question}</p>
      {block.data.options.map((text, index) => (
        <div>
          <input
            type="checkbox"
            id={block.key + index}
            name="vehicle1"
            value={text}
          />
          <label for={block.key + index}> {text}</label>
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
  margin-bottom: 32px;

  ${(props) =>
    props.isSeparated &&
    css`
      display: block;
      background: rgba(0, 0, 0, 0.05);
      border-radius: 8px;
      padding: 16px 12px;
      margin-bottom: 8px;

      &:nth-last-child() {
        border: none;
      }

      & > p#data {
        padding-top: 8px;
        border-top: 1px solid grey;
        margin-top: 8px;
        width: 100%;
        white-space: pre-wrap;
      }
    `};
`;
