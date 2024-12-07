fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=a")
  .then((res) => res.json())
  .then((data) => {
    displayPlayers(data.meals.slice(0, 11));
  });

const displayPlayers = (data) => {
  console.log(data)
  const playersContainer = document.getElementById("players-container");
  data.forEach((player) => {
    console.log(player)
    const div = document.createElement("div");
    div.classList.add(
      "card",
      "mt-3",
      "pb-4",
      "text-center",
      "bg-warning-subtle"
    );
    div.innerHTML = `
            <img class="card-img mb-2" src="${player.strMealThumb}">
            <p>Name: ${player.strMeal}</p>
            <p>Category: ${player.strCategory}</p>
            <p>Root: ${player.strArea}</p>
            <p>Tags: ${player.strTags}</p>
            <p>Ingredients: ${player.strIngredient1}</p>
            <p>Instructions: ${player.strInstructions
              .split(" ")
              .slice(0, 10)
              .join(" ")}</p>
            <div class="d-flex justify-content-center gap-3 mb-2">
            <a href="http://${
              player.strSource
            }" target="_blank" ><i class="bi bi-facebook"  style="font-size: 2rem; color: black"></i>
            </a>
            <a href="http://${
              player.strSource
            }" target="_blank" ><i class="bi bi-instagram"  style="font-size: 2rem; color: black"></i>
            </a>
            </div>

            <div class="add-to-cart mb-2">
            <button type="button" class="btn btn-success" onclick="handleAddToCart(${
              player.idMeal
            })">
            Add To Cart
            </button>
            </div>
            <div class="details">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displaySinglePlayer(${
              player.idMeal
            })">Details</button>
            </div>

            `;
    playersContainer.appendChild(div);
  });
};



const searchedPlayers = (name) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlayers(data.meals);
    });
};

const searchInput = document.getElementById("search-id");
searchInput.addEventListener("keydown", (Event) => {
  if (Event.key === "Enter") {
    Event.preventDefault(); 
    handleSearch();
  }
});

const handleSearch = () => {
  console.log("hit");
  let inputValue = document.getElementById("search-id").value;
  document.getElementById("players-container").innerHTML = "";
  searchedPlayers(inputValue);
  document.getElementById("search-id").value = "";
};

const handleAddToCart = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const cartCount = document.getElementById("count").innerText;
      let convertedCartCount = parseFloat(cartCount);
      if (convertedCartCount < 11) {
        convertedCartCount += 1;

        document.getElementById("count").innerHTML = convertedCartCount;

        const cartInfo = document.getElementById("cart-main-container");
        data.meals.forEach((player) => {
          const div = document.createElement("div");
          div.innerHTML = `
    <h4>Name: ${player.strMeal}</h4>
       `;
          cartInfo.appendChild(div);
        });
      } else {
        alert("can't add more than 11 foods");
      }
    });
};

const displaySinglePlayer = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      player = data.meals[0];
      // console.log(player)
 
      const singlePlayer = document.getElementById("modal-body");

      // const div = document.createElement("div");
      singlePlayer.innerHTML = `
              <h5>name: ${player.strMeal}</h5>
              <h5>Category: ${player.strCategory}</h5>
              <h5>Root: ${player.strArea}</h5>
              <h5>Tags: ${player.strTags}</h5>
              <h5>Ingredients: ${player.strIngredient1}</h5>
              <h5>Ingredients: ${player.strIngredient2}</h5>
              <h5>Description: Instructions: ${player.strInstructions
        .split(" ")
        .slice(0, 30)
        .join(" ")}</h5>

    `;

      // singlePlayer.appendChild(div);
    });
};
