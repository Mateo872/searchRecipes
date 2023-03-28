const btnSearch = document.querySelector("[data-btn-search]");
const inputSearch = document.querySelector("[data-input-search]");
const containerProducts = document.querySelector(".products");
const messageEmpty = document.createElement("p");
messageEmpty.style.color = "#fff";
messageEmpty.style.marginTop = "10rem";

let temp = [];

messageEmpty.textContent = "No products found";

let productsFavorites = localStorage.getItem("favorites");

if (productsFavorites === null) {
  productsFavorites = [];
}

let productFavoritesFilter = JSON.parse(productsFavorites);

let products = [];

if (productFavoritesFilter && productFavoritesFilter.length) {
  for (let i = 0; i < productFavoritesFilter.length; i++) {
    products.push(productFavoritesFilter[i]);
  }
}

let filteredProducts = [];

search(products);

async function search(id) {
  temp = [];

  for (let i = 0; i < id.length; i++) {
    await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id[i]}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.meals && json.meals.length) {
          json.meals.forEach((meal) => {
            const existingMeal = temp.find((m) => m.idMeal === meal.idMeal);

            if (!existingMeal) {
              temp.push(meal);
            }
          });
        }
      });
  }

  init(temp);
}

function init(data) {
  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();

    if (inputSearch.value.length >= 0) {
      data = filteredProducts.filter((product) =>
        product.strMeal.toLowerCase().includes(inputSearch.value.toLowerCase())
      );
      init(data);
    }
  });

  inputSearch.addEventListener("keyup", (e) => {
    if (e.target.value.length === 0) {
      let productsFavorites = localStorage.getItem("favorites");

      if (productsFavorites === null) {
        productsFavorites = [];
      }

      let productFavoritesFilter = JSON.parse(productsFavorites);

      let products = [];

      if (productFavoritesFilter && productFavoritesFilter.length) {
        for (let i = 0; i < productFavoritesFilter.length; i++) {
          products.push(productFavoritesFilter[i]);
        }
      }

      search(products);
    }
  });

  containerProducts.innerHTML = "";

  filteredProducts = data.filter((product) =>
    product.strMeal.toLowerCase().includes(inputSearch.value.toLowerCase())
  );

  if (filteredProducts.length > 0) {
    filteredProducts.forEach((product) => {
      const { strMealThumb, strMeal, idMeal } = product;

      containerProducts.innerHTML += `
              <div class="product">
                <div id="${idMeal}" class="product__heart">
                  <i class="bi bi-heart"></i>
                </div>
                  <div class="product__image">
                      <img src="${strMealThumb}" alt="${strMeal}" />
                  </div>
                  <h4 class="product__title">${strMeal}</h4>
                  <div class="product__more">
                       <a href="../pages/detailProduct.html?id=${idMeal}" class="product__btn">Show recipe</a>
                  </div>
            </div>
              `;
      productHeart();
    });
  } else {
    containerProducts.appendChild(messageEmpty);
  }
}

function productHeart() {
  const btnProductShow = document.querySelectorAll(".product__heart");

  if (window.innerWidth > 880) {
    btnProductShow.forEach((btn) => btn.classList.add("active"));
  }

  btnProductShow.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.classList.add("remove");
    });
    btn.addEventListener("mouseout", () => {
      btn.classList.remove("remove");
    });
  });

  btnProductShow.forEach((btn) => btn.addEventListener("click", btnProduct));
}

function btnProduct(e) {
  const productId = e.currentTarget.id;

  const filter = filteredProducts.filter(
    (product) => product.idMeal !== productId
  );

  const ids = filter.map((product) => product.idMeal);

  localStorage.setItem("favorites", JSON.stringify(ids));

  init(filter);
}
