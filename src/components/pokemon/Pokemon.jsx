import { useContext } from "react";
import "./pokemon.scss";
import { ThemeContext } from "../../context";
import useSound from "use-sound";
import click from "../../sounds/click.mp3";

const Pokemon = ({ pokemon, loading, infoPokemon, showData }) => {
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  const [playsound] = useSound(click, {
    volume: 0.5,
    interrupt: false,
  });

  return (
    <div className="pok">
      <div
        onClick={() => {
          infoPokemon(pokemon);
          showData(true);
          playsound();
        }}
      >
        <h1 style={{ color: lightMode && "black" }}>{pokemon.name}</h1>
        <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
      </div>
    </div>
  );
};

export default Pokemon;
