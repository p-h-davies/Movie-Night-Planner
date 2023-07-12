document.addEventListener('DOMContentLoaded', function() {
  var searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', searchCocktails);

 
  updateSavedCocktails();
});

function searchCocktails() {
  var ingredientsInput = document.getElementById('ingredients');
  var ingredients = ingredientsInput.value.trim();
  if (ingredients === '') {
    showError('Please enter some ingredients.');
    return;
  }

  var searchIngredients = ingredients.split(',').map(function(ingredient) {
    return ingredient.trim().toLowerCase();
  });

  var API_URL = 'https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=' + searchIngredients.join(',');

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var cocktailResults = document.getElementById('cocktailResults');
      cocktailResults.innerHTML = '';

      if (!Array.isArray(data.drinks)) {
        showError('No cocktails found with the provided ingredients. Please try another ingredient.');
        return;
      }

      hideError();
      var matchingCocktails = filterCocktailsByIngredients(data.drinks, searchIngredients);
      if (matchingCocktails.length === 0) {
        showError('No cocktails found with the provided ingredients. Please try another ingredient.');
        return;
      }
      matchingCocktails.forEach(function(cocktail) {
        getCocktailDetails(cocktail.idDrink);
      });
    })
    .catch(function(error) {
      console.error('Error:', error);
      showError('An error occurred while searching for cocktails. Please try again later.');
    });
}

function filterCocktailsByIngredients(cocktails, ingredients) {
  return cocktails.filter(function(cocktail) {
    for (var i = 1; i <= 15; i++) {
      var ingredient = cocktail['strIngredient' + i];
      if (!ingredient) {
        break;
      }
      var ingredientName = ingredient.toLowerCase();
      if (!ingredients.includes(ingredientName)) {
        return false;
      }
    }
    return true;
  });
}

function getCocktailDetails(cocktailId) {
  var API_URL = 'https://www.thecocktaildb.com/api/json/v2/9973533/lookup.php?i=' + cocktailId;

  fetch(API_URL)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var cocktail = data.drinks[0];
      updateCocktailUI(cocktail);
    })
    .catch(function(error) {
      console.error('Error:', error);
    });
}

function updateCocktailUI(cocktail) {
  var cocktailDiv = createCocktailDiv(cocktail);
  var cocktailResults = document.getElementById('cocktailResults');
  cocktailResults.appendChild(cocktailDiv);
}

function createCocktailDiv(cocktail) {
  var cocktailDiv = document.createElement('div');
  cocktailDiv.className = 'column is-one-third cocktail';

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

  var saveButton = document.createElement('button');
  saveButton.textContent = 'Save Cocktail';
  saveButton.addEventListener('click', function() {
    saveCocktail(cocktail);
  });

  cocktailDiv.appendChild(cocktailName);
  cocktailDiv.appendChild(cocktailImage);
  cocktailDiv.appendChild(cocktailInstructions);
  cocktailDiv.appendChild(cocktailIngredients);
  cocktailDiv.appendChild(saveButton);

  startConfetti()
    setTimeout(() => {
        stopConfetti()
    }, 2000);


    

  return cocktailDiv;
}

function saveCocktail(cocktail) {
  var savedCocktails = getSavedCocktails();

  
  var existingCocktail = savedCocktails.find(function(savedCocktail) {
    return savedCocktail.idDrink === cocktail.idDrink;
  });

  if (!existingCocktail) {
    savedCocktails.push(cocktail);
    localStorage.setItem('savedCocktails', JSON.stringify(savedCocktails));
    alert('Cocktail saved successfully!');
    updateSavedCocktails();
  } else {
    alert('Cocktail already saved!');
  }
}

function updateSavedCocktails() {
  var savedCocktailsContainer = document.getElementById('savedCocktails');
  if (!savedCocktailsContainer) {
    return;
  }
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


function getSavedCocktails() {
  var savedCocktails = localStorage.getItem('savedCocktails');
  if (savedCocktails) {
    return JSON.parse(savedCocktails);
  }
  return [];
}

function showError(message) {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
}

function hideError() {
  var errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none';
}
