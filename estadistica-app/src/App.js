import { DataInput } from "./Components/DataInput/DataInput";
import { PresentationApp } from "./UI/Body/Presentation/PresentationApp";
import { NavBar } from "./UI/Nav/NavBar";
import { UserDataTable } from "./Components/DataTable/UserDataTable";
function App() {
  return (
    <div> 
      <NavBar></NavBar>
      <PresentationApp></PresentationApp>
      <DataInput></DataInput>
      <UserDataTable></UserDataTable>
 
    </div>
  );
}

export default App;
