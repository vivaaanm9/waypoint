import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const useFavorites = () => {
    return useContext(FavoritesContext);
};

export default useFavorites;