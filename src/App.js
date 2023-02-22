import "./assets/scss/reset.scss";
import "./assets/scss/app.scss";
import Title from "./components/Title";
import ToDo from "./components/ToDo";

function App() {
  return (
    <div className="app">
      <Title />
      <br />
      <ToDo />
    </div>
  );
}

export default App;
