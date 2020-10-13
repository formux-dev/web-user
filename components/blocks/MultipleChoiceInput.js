import { useContext } from "react";

import { FormContext } from "../context/FormContext";

import Question from "../Question";

export default function MultipleChoiceInput({ block }) {
  const { userData, setUserData } = useContext(FormContext);

  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
          <input
            type="radio"
            id={block.key + index}
            checked={userData[block.key] == text}
            onChange={_ => {
              setUserData(prev => ({ ...prev, [block.key]: text }));
            }}
          />
          <label htmlFor={block.key + index}> {text}</label>
        </div>
      ))}
    </div>
  );
}
