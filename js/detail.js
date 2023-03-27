let data;

const dataNumber = location.search.split("?id=");

search(dataNumber[1]);

async function search(id) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((json) => (data = json.meals));
  init(data);
}

function init(data) {
  const containerProducts = document.querySelector(".products-detail");

  data.forEach((product) => {
    const {
      strMealThumb,
      strMeal,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
      strIngredient16,
      strIngredient17,
      strIngredient18,
      strIngredient19,
      strIngredient20,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
      strMeasure15,
      strMeasure16,
      strMeasure17,
      strMeasure18,
      strMeasure19,
      strMeasure20,
      strInstructions,
    } = product;

    const ingredients = [
      { measure: strMeasure1, ingredient: strIngredient1 },
      { measure: strMeasure2, ingredient: strIngredient2 },
      { measure: strMeasure3, ingredient: strIngredient3 },
      { measure: strMeasure4, ingredient: strIngredient4 },
      { measure: strMeasure5, ingredient: strIngredient5 },
      { measure: strMeasure6, ingredient: strIngredient6 },
      { measure: strMeasure7, ingredient: strIngredient7 },
      { measure: strMeasure8, ingredient: strIngredient8 },
      { measure: strMeasure9, ingredient: strIngredient9 },
      { measure: strMeasure10, ingredient: strIngredient10 },
      { measure: strMeasure11, ingredient: strIngredient11 },
      { measure: strMeasure12, ingredient: strIngredient12 },
      { measure: strMeasure13, ingredient: strIngredient13 },
      { measure: strMeasure14, ingredient: strIngredient14 },
      { measure: strMeasure15, ingredient: strIngredient15 },
      { measure: strMeasure16, ingredient: strIngredient16 },
      { measure: strMeasure17, ingredient: strIngredient17 },
      { measure: strMeasure18, ingredient: strIngredient18 },
      { measure: strMeasure19, ingredient: strIngredient19 },
      { measure: strMeasure20, ingredient: strIngredient20 },
    ];

    let ingredientsHtml = "";

    for (let i = 0; i < ingredients.length; i++) {
      const { measure, ingredient } = ingredients[i];
      if (measure && ingredient) {
        ingredientsHtml += `<p>${measure} <span>${ingredient}</span></p>`;
      }
    }

    const productHtml = `
        <h1>${strMeal}</h1>
        <div class="product__detail-image">
          <img src="${strMealThumb}" alt="${strMeal}" />
        </div>
        <h4>Ingredients</h4>
        ${ingredientsHtml}
        <h4>Instructions</h4>
        <p class="product-instructions">
          ${strInstructions}
        </p>
      `;

    containerProducts.innerHTML = productHtml;
  });
}
