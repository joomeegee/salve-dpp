import { Main } from "./screens/main/Main";
import logo from "./logo.svg";
import css from "./App.module.css";

const i18n = {
  logo: "Salve Health",
};

const App = () => {
  return (
    <>
      <div className={css.logo}>
        <img src={logo} alt={i18n.logo} />
      </div>

      <div className={css.container}>
        <Main />
      </div>
    </>
  );
};

export default App;
