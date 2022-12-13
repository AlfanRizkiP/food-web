const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const detailCloseBtn = document.getElementById('detail-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealDetail)
detailCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showDetail');
})

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
         let html = "";
         if(data.meals){
             data.meals.forEach(meal => {
                 html+= `
                 <div class="meal-item" data-id = "${meal.idMeal}">
                         <div class="meal-img">
                             <img src="${meal.strMealThumb}" alt="food">
                         </div>
                         <div class="meal-name">
                             <h3>${meal.strMeal}</h3>
                             <a href="#" class="detail-btn">Click Detail</a>
                         </div>
                     </div>
                
                 `;
             });
         }

         mealList.innerHTML = html;
    });
}

function getMealDetail(e){
    e.preventDefault();
    if(e.target.classList.contains('detail-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealDetailModal(data.meals));
    }
}

function mealDetailModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
    <h2 class="detail-title">${meal.strMeal}</h2>
                    <p class="detail-category">${meal.strCategory}</p>
                    <div class="detail-instruct">
                        <h3>Description:</h3>
                        <p>${meal.strInstructions}</p>
                    </div>
                    <div class="detail-meal-img">
                        <img src="${meal.strMealThumb}" alt="">
                    </div>
                    <div class = "detail-link">
                        <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
                    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showDetail');
}