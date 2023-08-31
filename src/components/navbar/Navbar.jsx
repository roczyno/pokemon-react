import "./navbar.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Sun from "../../images/sun.png";
import Moon from "../../images/moon.png";
import { ThemeContext } from "../../context";
import useSound from "use-sound";
import click from "../../sounds/click.mp3";

const Navbar = ({ data, setData }) => {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const theme = useContext(ThemeContext);
  const lightMode = theme.state.lightMode;
  const [playsound] = useSound(click, {
    volume: 0.1,
    interrupt: false,
  });

  const [url, setUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0"
  );

  useEffect(() => {
    AOS.init();
  }, []);

  const getAllPokemons = async () => {
    try {
      const res = await axios.get(url);
      getPoke(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getPoke = (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);

      setPokemons((state) => {
        state = [...state, result.data];
        return state;
      });
    });
  };

  useEffect(() => {
    getAllPokemons();
  }, [url]);

  const handleSearch = (e) => {
    setData(data);
    const inputValue = e.target.value.toLowerCase();

    if (inputValue === "") {
      setData(data);
    } else if (inputValue.length >= 3) {
      //
      setData(
        pokemons.filter((item) => item.name.toLowerCase().includes(inputValue))
      );
    } else {
      setData(data);
    }
  };

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div className="navbar">
      <span
        data-aos="fade-right"
        data-aos-duration="2000"
        style={{ color: lightMode && "black" }}
      >
        Pokedex
      </span>

      <input
        type="text"
        placeholder="Search for a pokemon"
        data-aos="fade-up"
        data-aos-duration="2000"
        onChange={handleSearch}
        style={{
          color: lightMode && "black",
        }}
      />
      <div className="toggle" data-aos="fade-left" data-aos-duration="2000">
        <img src={Moon} alt="" className="t-icon" />
        <img src={Sun} alt="" className="t-icon" />
        <div
          className="t-button"
          onClick={() => {
            playsound();
            handleClick();
          }}
          style={{ left: theme.state.lightMode ? 0 : 25 }}
        ></div>
      </div>
    </div>
  );
};

export default Navbar;
