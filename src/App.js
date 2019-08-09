import React, {useEffect, useState} from 'react';
import Recipe from './Recipe.js';
import './App.css';

const App = () => {
  const APP_ID = 'df73f087';
  const APP_KEY = 'a06d7369797cd551283a2946e29454b4';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);

  }

  const updateSearch = event => {
    setSearch(event.target.value);
  }

  return(
    <div className="App">
      <form className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} />
      ))}
    </div>
  )
}

export default App;
