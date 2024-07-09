
import './App.css';
import Home from './screens/Home.js';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import { CartProvider } from './components/contextReducer.js';
function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createuser" element={<SignUp />} />
          {/* <Route exact path="/myorder" element={<MyOrder />} /> */}
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
