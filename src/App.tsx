import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Container } from "react-bootstrap";
import "./App.css";
import Stops from "./components/Stops";

function App() {
  return (
    <>
      <Header />

      <main>
        <Container>
          <Stops />
        </Container>
        
      </main>
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
