import { useContext } from "react";
import "./pokemon.scss";
import { ThemeContext } from "../../context";

const Pokemon = ({ pokemon, loading, infoPokemon, showData }) => {
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  return (
    <div className="pok">
      <div
        onClick={() => {
          infoPokemon(pokemon);
          showData(true);
        }}
      >
        <h1 style={{ color: lightMode && "black" }}>{pokemon.name}</h1>
        <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
      </div>
    </div>
  );
};

export default Pokemon;
