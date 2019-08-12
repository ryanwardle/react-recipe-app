import React, {useEffect, useState} from 'react';
import Recipe from './Recipe.js';
import './App.css';

const App = () => {
  const APP_ID = 'df73f087';
  const APP_KEY = 'a06d7369797cd551283a2946e29454b4';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(''); 
  const [query, setQuery] = useState('chicken');

  // TUTORIAL HAD GETRECIPES OUTSIDE OF USEEFFECT, (EDITED OUT BELOW), BUT REACT DOCS AND LINTER SAY DO IT THIS WAY
  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data = await response.json();
      setRecipes(data.hits);
    }
    getRecipes();
  }, [query]);

  // const getRecipes = async () => {
  //   const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  //   const data = await response.json();
  //   setRecipes(data.hits);
  // }


  const updateSearch = event => {
    setSearch(event.target.value);
  }

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe key={recipe.recipe.label} 
                  title={recipe.recipe.label} 
                  calories={recipe.recipe.calories} 
                  image={recipe.recipe.image} 
                  ingredients={recipe.recipe.ingredients} />
        ))}
      </div>
    </div>
  )
}

export default App;
