import { useState } from "react";
import "./App.css";
import Counter from "./components/Guess";

function App() {
  const [username] = useState("Sri");
  return (
    <>
      <div>
        <Counter username={username} />
      </div>
    </>
  );
}

export default App;