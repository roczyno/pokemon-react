import { useContext } from "react";
import PokemonList from "../../components/pokemonList/PokemonList";
import "./home.scss";
import { ThemeContext } from "../../context";

const Home = () => {
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  return (
    <div
      className="home"
      style={{
        background:
          lightMode &&
          " url('../../images/default.png'),linear-gradient(rgba(0, 0, 255, 0.3), rgba(255, 0, 255, 0.3)) ",
      }}
    >
      <PokemonList />
    </div>
  );
};

export default Home;
