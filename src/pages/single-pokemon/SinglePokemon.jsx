import { useContext } from "react";
import "./single-pokemon.scss";
import { ThemeContext } from "../../context";

const SinglePokemon = ({ data, showData }) => {
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  return (
    <div className="single-pokemon">
      <span className="back" onClick={() => showData(false)}>
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
