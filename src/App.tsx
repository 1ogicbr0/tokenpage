import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { viewTokenTypes } from "./constants/constants";
import ViewToken from "./screens/ViewToken/ViewToken";
import Login from "./screens/Login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/token/:tokenId"
            element={<ViewToken viewTokenType={viewTokenTypes.PUBLIC_TOKEN} />}
          />
          <Route
            path="/shared/:shareHash"
            element={<ViewToken viewTokenType={viewTokenTypes.SHARED_TOKEN} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
