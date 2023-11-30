import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import "../css/create.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const [cookies, _] = useCookies(["access_token"]);

  const [image, setImage] = useState("");

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRecipe({ ...recipe, [name]: value });
    // setRecipe({ ...recipe, imageUrl: image });
  };

  const handleIngredientChange = (e, index) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;

    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // console.log(e.target);
    // console.log(image);

    const img64 = image;
    // console.log(img64);

    setRecipe({ ...recipe, imageUrl: img64 });

    try {
      console.log(recipe);
      await axios.post("http://localhost:8000/recipes", recipe, {
        headers: { Authorization: cookies.access_token },
      });
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const convertToBase64 = (e) => {
    // console.log(e.target.name);
    const { name } = e.target;

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
      const img53 = reader.result;
      setRecipe({ ...recipe, [name]: img53 });
    };
    reader.onerror = (err) => {
      console.log("Error : ", err);
    };

    // console.log(image);
    // setRecipe({ ...recipe, [name]: image });
    // console.log(recipe);
  };

  return (
    <div className="create-recipe">
      <h2 className="page-headings">Create Recipe</h2>
      <form className="create-form">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, index) => {
          return (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
            />
          );
        })}

        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>

        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        {/* <label htmlFor="imageUrl">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        /> */}

        <input
          name="imageUrl"
          accept="image/*"
          type="file"
          onChange={convertToBase64}
        />

        {image === "" || image === null ? (
          ""
        ) : (
          <img width={100} height={100} src={image} alt="None" />
        )}

        <label htmlFor="cookingTime">Cooking time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />

        <button type="submit" onClick={onSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
