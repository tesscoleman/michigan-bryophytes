import "./grid.css"
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function Grid({ children }: Props) {
  return (
    <>
      <div className="grid">{children}</div>
      <div className="grid-footer" style={{textAlign:"right",marginTop:"1rem"}}> 
        <a href="https://www.flaticon.com/free-icons/moss" title="moss icons">Moss icons created by Freepik - Flaticon</a>
      </div>

    </>
  );
}
