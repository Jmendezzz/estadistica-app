import { DataInput } from "./Components/DataInput/DataInput";
import { PresentationApp } from "./UI/Body/Presentation/PresentationApp";
import { NavBar } from "./UI/Nav/NavBar";
function App() {
  return (
    <div> 
      <NavBar></NavBar>
      <PresentationApp></PresentationApp>
      <DataInput></DataInput>
 
    </div>
  );
}

export default App;
