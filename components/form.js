import styled from "styled-components";
import * as firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";

export default function Form({ formID }) {
  return (
    <Wrapper>
      <Content>
        <Navbar>
          <div>
            <img src="/favicon-192x192.png"></img>
            <h1>Formux</h1>
          </div>
          <Tag>Beta</Tag>
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
      {formData.blocks ? (
        formData.blocks &&
        formData.blocks.map((block, index) => (
          <Block block={block} key={index} index={index} />
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

function Block({ block, index }) {
  const [dataShown, setDataShown] = useState(false);

  return (
    <FormField>
      {true && (
        <div>
          <Tag>TYPE: {block.type}</Tag>
          <input
            type="checkbox"
            id={"debug" + index}
            value={dataShown}
            onChange={(e) => setDataShown(e.target.checked)}
          />
          <label for={"debug" + index}>Show data</label>
          {dataShown && <Tag>{JSON.stringify(block, null, "\t")}</Tag>}
        </div>
      )}
      <Switch test={block.type}>
        <Description value="description" block={block} />
        <ShortInput value="shortinput" block={block} />
        <CheckboxInput value="checkboxinput" block={block} />
      </Switch>
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
      <input placeholder={block.data.question} />
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
          <label for={block.key + index}>{text}</label>
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
    margin-right: 32px;
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
`;

const FormField = styled.div`
  margin: 32px 0;
`;
