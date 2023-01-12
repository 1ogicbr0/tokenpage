import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { viewTokenTypes } from "./constants/constants";
import ViewToken from "./screens/ViewToken/ViewToken";
import Login from "./screens/Login/Login";
import Wallet from "./screens/wallet";
import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/token/:tokenId"
              element={
                <ViewToken viewTokenType={viewTokenTypes.PUBLIC_TOKEN} />
              }
            />
            <Route
              path="/shared/:shareHash"
              element={
                <ViewToken viewTokenType={viewTokenTypes.SHARED_TOKEN} />
              }
            />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
