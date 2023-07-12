document.addEventListener('DOMContentLoaded', function() {
    updateSavedCocktails();
  });
  
  function updateSavedCocktails() {
    var savedCocktailsContainer = document.getElementById('savedCocktails');
  
    savedCocktailsContainer.innerHTML = '';
  
    var savedCocktails = getSavedCocktails();
    if (savedCocktails.length === 0) {
      savedCocktailsContainer.innerHTML = '<p>No saved cocktails found.</p>';
    } else {
      savedCocktails.forEach(function(cocktail) {
        var cocktailDiv = createCocktailDiv(cocktail);
        savedCocktailsContainer.appendChild(cocktailDiv);
      });
    }
  }
  
  function createCocktailDiv(cocktail) {
    var cocktailDiv = document.createElement('div');
    cocktailDiv.className = 'saved-cocktail';
  
    var cocktailName = document.createElement('h2');
    cocktailName.className = 'cocktail-name';
    cocktailName.textContent = cocktail.strDrink;
  
    var cocktailImage = document.createElement('img');
    cocktailImage.className = 'cocktail-image';
    cocktailImage.src = cocktail.strDrinkThumb;
    cocktailImage.alt = cocktail.strDrink;
  
    var cocktailInstructions = document.createElement('p');
    cocktailInstructions.className = 'cocktail-instructions';
    cocktailInstructions.textContent = cocktail.strInstructions;
  
    var cocktailIngredients = document.createElement('ul');
    cocktailIngredients.className = 'cocktail-ingredients';
  
    for (var i = 1; i <= 15; i++) {
      var ingredient = cocktail['strIngredient' + i];
      if (!ingredient) {
        break;
      }
      var listItem = document.createElement('li');
      listItem.textContent = ingredient;
      cocktailIngredients.appendChild(listItem);
    }
  
    cocktailDiv.appendChild(cocktailName);
    cocktailDiv.appendChild(cocktailImage);
    cocktailDiv.appendChild(cocktailInstructions);
    cocktailDiv.appendChild(cocktailIngredients);
  
    return cocktailDiv;
  }
  
  function getSavedCocktails() {
    var savedCocktails = localStorage.getItem('savedCocktails');
    if (savedCocktails) {
      return JSON.parse(savedCocktails);
    }
    return [];
  }
  