 import { useState } from "react";
 function Guess() {
    const [guess, setGuess] = useState("");
    return(
        <div>
Guess <input type="text"
value={guess}
onChange={(e)=>setGuess(e.target.value)}
></input>
<h3>{guess}</h3>
</div>
    );
}
export default Guess;