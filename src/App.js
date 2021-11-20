import "./App.css";
import Navbar from "./Navbar";
import GithubUsers from "./GithubUsers";
import Following from "./Following";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  persistStore
} from 'redux-persist'

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<GithubUsers />} />
            <Route path="/following" element={<Following />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
