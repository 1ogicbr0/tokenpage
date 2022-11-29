import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PublicToken from "./screens/PublicToken/PublicToken";
import ShareToken from "./screens/ShareToken/ShareToken";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/token/:tokenId" element={<PublicToken />} />
          <Route path="/shared/:shareHash" element={<ShareToken />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
