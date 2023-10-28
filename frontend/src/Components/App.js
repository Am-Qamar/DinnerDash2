import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ItemList from "./List";
import CreateItem from "./CreateItem";
import LoginUser from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/createItem" element={<CreateItem />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </Router>
  );
}

export default App;
