import { useContext } from "react";
import "./single-pokemon.scss";
import { ThemeContext } from "../../context";
import useSound from "use-sound";
import click from "../../sounds/click.mp3";

const SinglePokemon = ({ data, showData }) => {
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  const [playsound] = useSound(click, {
    volume: 0.5,
    interrupt: false,
  });

  return (
    <div className="single-pokemon">
      <span
        className="back"
        onClick={() => {
          showData(false);
          playsound();
        }}
      >
        Back
      </span>
      <span className="name">{data?.name}</span>
      <div className="abilities">
        {data.abilities.map((item) => (
          <span>{item.ability.name}</span>
        ))}
      </div>
      <div className="pokemondata">
        <div className="left" style={{ color: lightMode && "black" }}>
          {data.stats?.map((item) => {
            return (
              <>
                <span>
                  {item.stat.name}:{item.base_stat}
                </span>
              </>
            );
          })}
        </div>
        <div className="right">
          <img src={data.sprites.other.dream_world.front_default} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SinglePokemon;
