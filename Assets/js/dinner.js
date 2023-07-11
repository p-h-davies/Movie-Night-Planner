document.addEventListener('DOMContentLoaded', function() {
  const ingredientInput = document.getElementById('ingredientInput');
  const recommendButton = document.getElementById('recommendButton');
  const resultSection = document.getElementById('resultSection');
  const recipeResults = document.getElementById('recipeResults');

  recommendButton.addEventListener('click', function() {
    const ingredients = ingredientInput.value.split(',').map(function(ingredient) {
      return ingredient.trim();
    });

    const apiKey = 'a1a0681cb7bc4abab7d762996be1868f';
    const apiUrl = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + apiKey + '&ingredients=' + ingredients.join(',');

    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        recipeResults.innerHTML = ''; // Clear previous results

        if (data.length > 0) {
          data.forEach(function(recipe) {
            const recipeId = recipe.id;
            const recipeUrl = 'https://api.spoonacular.com/recipes/' + recipeId + '/information?apiKey=' + apiKey;

            fetch(recipeUrl)
              .then(function(response) {
                return response.json();
              })
              .then(function(recipeData) {
                const recipeCard = createRecipeCard(recipeData);
                recipeResults.appendChild(recipeCard);
              });
          });

          resultSection.style.display = 'block';
        } else {
          resultSection.innerHTML = '<p>No recipes found!</p>';
          resultSection.style.display = 'block';
        }
      });
  });
});

function createRecipeCard(recipe) {
  const card_4dinner = document.createElement('div');
  card_4dinner.classList.add('card');

  const image_4dinner = document.createElement('img');
  image_4dinner.src = recipe.image;
  image_4dinner.alt = 'Recipe Image';
  card_4dinner.appendChild(image_4dinner);

  const cardContent_4dinner = document.createElement('div');
  cardContent_4dinner.classList.add('card-content');

  const title_4dinner = document.createElement('h3');
  title_4dinner.textContent = recipe.title;
  cardContent_4dinner.appendChild(title_4dinner);

  const ingredients_4dinner = document.createElement('p');
  ingredients_4dinner.textContent = 'Ingredients: ' + recipe.extendedIngredients.map(function(ingredient) {
    return ingredient.original;
  }).join(', ');
  cardContent_4dinner.appendChild(ingredients_4dinner);

  const directions_4dinner = document.createElement('p');
  directions_4dinner.textContent = 'Directions: ' + recipe.instructions;
  cardContent_4dinner.appendChild(directions_4dinner);

  card_4dinner.appendChild(cardContent_4dinner);

  return card_4dinner;
}
