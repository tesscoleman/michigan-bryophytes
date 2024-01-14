import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Grid({ children }: Props) {
  return (
    <>
      <div className="grid">{children}</div>
      <a href="https://www.flaticon.com/free-icons/moss" title="moss icons">Moss icons created by Freepik - Flaticon</a>
    </>
  );
}
