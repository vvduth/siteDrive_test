import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Container } from "react-bootstrap";
import "./App.css";
import Stops from "./components/Stops";
import { Route, Routes } from "react-router-dom";
import RoutesDetails from "./components/RoutesDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Stops/>} />
        <Route path='/details/:id' element= {<RoutesDetails/>} />
      </Routes>

      
      <Footer />
    </>
  );
}

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
