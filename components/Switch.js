import Tag from "./Tag";

export default function Switch({ children, test }) {
    const correctChild = children.find((child) => child.props.test === test);
  
    return correctChild ?? <Tag>Block type "{test}" not implemented</Tag>;
}