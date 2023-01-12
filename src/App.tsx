import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { viewTokenTypes } from "./constants/constants";
import ViewToken from "./screens/ViewToken/ViewToken";
import Login from "./screens/Login/Login";
import Wallet from "./screens/wallet";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
              <Route path="*" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
