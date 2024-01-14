import { useState } from "react";

function MossFooter() {
    const [color, setColor] = useState("olive");

    function onClick() {
        setColor("forestgreen")
    }
    return (
        <div className="moss-footer" style= {{backgroundColor: color}} onClick = {onClick}></div>
    )
}

export default MossFooter