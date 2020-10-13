import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

export default function FormSkeleton() {
  return (
    <React.Fragment>
      <Spacing vertical={16} />
      <Skeleton height={50} width={"60%"} />
      <Spacing vertical={16} />

      <Skeleton height={20} width={"100%"} />
      <Spacing vertical={2} />
      <Skeleton height={20} width={"100%"} />
      <Spacing vertical={2} />
      <Skeleton height={20} width={"80%"} />
      <Spacing vertical={32} />

      <Skeleton height={20} width={"50%"} />
      <Spacing vertical={8} />
      <Skeleton height={40} width={"100%"} />
      <Spacing vertical={32} />

      <Skeleton height={20} width={"70%"} />
      <Spacing vertical={8} />
      <Skeleton height={100} width={"100%"} />
      <Spacing vertical={32} />

      <Skeleton height={20} width={"50%"} />
      <Spacing vertical={8} />
      <div>
        <Skeleton height={16} width={16} circle />
        <Spacing inline horizontal={8} />
        <Skeleton height={16} width={"15%"} />
        <Spacing vertical={8} />

        <Skeleton height={16} width={16} circle />
        <Spacing inline horizontal={8} />
        <Skeleton height={16} width={"25%"} />
        <Spacing vertical={8} />

        <Skeleton height={16} width={16} circle />
        <Spacing inline horizontal={8} />
        <Skeleton height={16} width={"20%"} />
        <Spacing vertical={32} />
      </div>
      <Skeleton height={20} width={"50%"} />
      <Spacing vertical={8} />
      <Skeleton height={40} width={"100%"} />
      <Spacing vertical={32} />

      <Skeleton height={20} width={"100%"} />
      <Spacing vertical={2} />
      <Skeleton height={20} width={"100%"} />
      <Spacing vertical={2} />
      <Skeleton height={20} width={"80%"} />
      <Spacing vertical={32} />
    </React.Fragment>
  );
}

const Spacing = styled.div`
  display: ${props => (props.inline ? "inline-block" : "block")};
  height: ${props => props.vertical}px;
  width: ${props => props.horizontal}px;
`;
