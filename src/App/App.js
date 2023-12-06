import Home from "../Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Singlepage from "../Components/Singlepage/Singlepage";
import { SINGLEPAGE_PATH } from "../Constants/constants";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path={`${SINGLEPAGE_PATH}:idx`} element={<Singlepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
