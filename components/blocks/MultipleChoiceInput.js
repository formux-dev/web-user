
import { Question } from "./styles"

export default function MultipleChoiceInput({ block, value, onChange }) {
  return (
    <div>
      <Question>{block.data.question}</Question>
      {block.data.options.map((text, index) => (
        <div key={index}>
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