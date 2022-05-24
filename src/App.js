import "./App.css";
import Config from "./config/Config";
import { Web3ContextProvider } from "./context";
import HooksWrapper from "./hooksWrapper";
function App() {
  return (
    <Web3ContextProvider>
      <HooksWrapper>
        <div className="App">
          <Config />
        </div>
      </HooksWrapper>
    </Web3ContextProvider>
  );
}

export default App;
