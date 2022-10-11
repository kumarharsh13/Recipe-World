const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`).then(response => response.json()).then(data => {
        let dishes = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                dishes += `
                    <div class="meal-item" data-id = "${meal.idMeal}">
                        <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" target="_blank" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        }
        else {
            dishes = "Sorry, we didn't find any cuisine";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = dishes;
    });
}

function getMealRecipe(ele) {
    ele.preventDefault();
    if(ele.target.classList.contains('recipe-btn')) {
        let mealItem = ele.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`).then(response => response.json()).then(data => mealRecipeModal(data.meals));
    }
}

function mealRecipeModal(meal) {
    meal = meal[0];
    let dishes = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = dishes;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
