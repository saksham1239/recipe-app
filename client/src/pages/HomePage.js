import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/homepage.css";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

const HomePage = () => {
  const userID = useGetUserID();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipe();

    if (cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/recipes",
        {
          recipeID,
          userID,
        },
        { headers: { Authorization: cookies.access_token } }
      );
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="home-container">
      <h2 className="page-headings">Recipes</h2>

      <div className="home-recipes">
        {recipes.map((recipe) => {
          return (
            <div className="home-recipe-box" key={recipe._id}>
              {/* <h2>{recipe.name}</h2> */}

              <div className="recipe-heading">
                <h2>{recipe.name}</h2>
                <button
                  className="save-button"
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>

              <div className="recipe-inside">
                <p>{recipe.instructions}</p>
              </div>

              <div className="recipe-inside recipe-image">
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>

              <div className="recipe-inside">
                <p>Cooking Time : {recipe.cookingTime} minutes</p>
              </div>

              {/* <button className="save-button">Save</button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
