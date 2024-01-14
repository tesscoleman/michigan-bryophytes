import { ReactNode } from "react";

interface Props {
  children?: ReactNode,
  onClick: () => void,
  isActive: boolean
}

export default function Tab({ children, onClick, isActive }: Props) {
  return (
    <>
      <a className={"tab " + (isActive ? "active" : "")} onClick={onClick}>{children}</a>
    </>
  );
}
