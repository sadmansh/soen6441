import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Home from "./home/Home.js";
import Recipe from "./recipe/Recipe.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/recipe" element={<Recipe />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
