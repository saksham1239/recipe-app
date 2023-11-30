import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../css/homepage.css";
import { useGetUserID } from "../hooks/useGetUserID";

const SavedRecipe = () => {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSavedRecipe();
  }, []);

  const handleDel = async (e) => {
    e.preventDefault();
    console.log(e.target.id);

    try {
      const response = await axios.post(
        "http://localhost:8000/recipes/delete",
        { user: userID, recipe: e.target.id }
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-container">
      <h2 className="page-headings">Saved Recipes</h2>

      <div className="home-recipes">
        {savedRecipes.map((recipe) => {
          return (
            <div className="home-recipe-box" key={recipe._id}>
              {/* <h2>{recipe.name}</h2> */}

              <div className="recipe-heading">
                <h2>{recipe.name}</h2>
                <div
                  recipe={recipe._id}
                  user={userID}
                  onClick={handleDel}
                  id={recipe._id}
                  className="recipe-delete-button"
                >
                  Delete
                </div>
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

export default SavedRecipe;
