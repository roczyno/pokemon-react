import { useContext, useEffect, useState } from "react";
import "./pokemonList.scss";
import axios from "axios";
import Pokemon from "../pokemon/Pokemon.jsx";
import SinglePokemon from "../../pages/single-pokemon/SinglePokemon";
import Navbar from "../navbar/Navbar";
import Skeleton from "../skeleton/Skeleton";
import { ThemeContext } from "../../context";

const PokemonList = () => {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/?limit=8/");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pokedex, setPokedex] = useState();
  const [showData, setShowData] = useState(false);

  const getPokemons = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      getPoke(res.data.results);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPoke = (res) => {
    res.map(async (item) => {
      setLoading(true);
      const result = await axios.get(item.url);

      setData((state) => {
        state = [...state, result.data];
        return state;
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    getPokemons();
  }, [url]);
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;

  return (
    <>
      {loading ? (
        <Skeleton />
      ) : (
        <>
          <Navbar data={data} setData={setData} />
          <div className="pklist" style={{ color: lightMode && "#222" }}>
            {!showData ? (
              <>
                <div className="btn">
                  {prevUrl && (
                    <button
                      onClick={() => {
                        setData([]);
                        setUrl(prevUrl);
                      }}
                    >
                      prev
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setData([]);
                      setUrl(nextUrl);
                    }}
                  >
                    next
                  </button>
                </div>
                <div className="wrapper">
                  {data.map((item) => (
                    <Pokemon
                      pokemon={item}
                      loading={loading}
                      key={item.id}
                      infoPokemon={(poke) => setPokedex(poke)}
                      showData={setShowData}
                    />
                  ))}
                </div>
              </>
            ) : (
              <SinglePokemon data={pokedex} showData={setShowData} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PokemonList;
