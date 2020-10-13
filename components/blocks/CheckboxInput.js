import { useContext } from "react";

import { FormContext } from "../context/FormContext";

import Question from "../Question";

export default function CheckboxInput({ block }) {
  const { userData, setUserData } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={block.key + index}
            checked={userData[block.key] ? userData[block.key].includes(text) : false}
            onChange={({ target: { checked } }) => {
              setUserData(prev => ({
                ...prev,
                [block.key]: checked
                  ? userData[block.key]
                    ? [...userData[block.key], text]
                    : [text]
                  : userData[block.key].filter(x => x != text),
              }));
            }}
          />
          <label htmlFor={block.key + index}> {text}</label>
        </div>
      ))}
    </div>
  );
}
