const inputSearch = document.querySelector("[data-input-search]");
const btnSearch = document.querySelector("[data-btn-search]");

btnSearch.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputSearch.value.length > 0) {
    search(inputSearch.value);
  }
});

let data;

async function search(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response) => response.json())
    .then((json) => (data = json.meals));
  init(data);
}

let productFilter = [];

let id = 1;

function init(data) {
  const containerProducts = document.querySelector(".products");
  containerProducts.innerHTML = "";

  inputSearch.addEventListener("keyup", (e) => {
    if (e.target.value.length === 0) {
      containerProducts.innerHTML = "";
      document.body.style.display = "flex";
    }
  });

  const messageEmpty = document.createElement("p");
  messageEmpty.style.color = "#fff";

  messageEmpty.textContent = "No product with this name is found";

  if (data) {
    productFilter = data.filter((product) =>
      product.strMeal.toLowerCase().includes(inputSearch.value.toLowerCase())
    );

    if (productFilter.length < 5) {
      document.body.style.display = "flex";
    } else {
      document.body.style.display = "block";
    }

    if (productFilter !== null && productFilter.length > 0) {
      productFilter.forEach((product) => {
        const { strMealThumb, strMeal } = product;

        containerProducts.innerHTML += `
            <div class="product">
                <div class="product__image">
                    <img src="${strMealThumb}" alt="${strMeal}" />
                </div>
                <h4 class="product__title">${strMeal}</h4>
                <div class="product__more">
                     <a href="#" id="${id++}" class="product__btn">Show recipe</a>
                </div>
          </div>
            `;
      });
    }
  } else {
    containerProducts.innerHTML = "";
    document.body.style.display = "flex";
    containerProducts.appendChild(messageEmpty);
  }
}