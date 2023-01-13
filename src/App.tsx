import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { viewTokenTypes } from "./constants/constants";
import ViewToken from "./screens/ViewToken/ViewToken";
import Login from "./screens/Login/Login";
import Wallet from "./screens/Wallet";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
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
              <Route
                path="/digital-twin-detail/:tokenId"
                element={
                  <ViewToken viewTokenType={viewTokenTypes.OWNED_TOKEN} />
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
