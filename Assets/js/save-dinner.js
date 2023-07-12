document.addEventListener('DOMContentLoaded', function() {
    updateSavedDinners();
  });
  
  function updateSavedDinners() {
    var savedDinnersContainer = document.getElementById('savedDinner');
    savedDinnersContainer.innerHTML = '';
  
    var savedDinners = getSavedDinners();
    if (savedDinners.length === 0) {
      savedDinnersContainer.innerHTML = '<p>No saved dinners found.</p>';
    } else {
      savedDinners.forEach(function(recipe) {
        var recipeCard = createRecipeCard(recipe);
        savedDinnersContainer.appendChild(recipeCard);
      });
    }
  }
  
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
  
  function getSavedDinners() {
    var savedDinners = localStorage.getItem('savedDinners');
    if (savedDinners) {
      return JSON.parse(savedDinners);
    }
    return [];
  }
  