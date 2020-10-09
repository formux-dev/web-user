
import { Question } from "./styles"

export default function CheckboxInput({ block, value, onChange }) {
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