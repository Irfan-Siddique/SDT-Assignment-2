const displayPlayers = (data) => {
  // console.log(data)
  const playersContainer = document.getElementById("players-container");
  data.forEach((player) => {
    // console.log(player)
    const div = document.createElement("div");
    div.classList.add(
      "card",
      "mt-3",
      "pb-4",
      "text-center",
      "bg-warning-subtle"
    );
    div.innerHTML = `
            <img class="card-img mb-2" src="${player.strCutout}">
            <p>Name: ${player.strPlayer}</p>
            <p>Nationality: ${player.strNationality}</p>
            <p>Sport: ${player.strTeam}</p>
            <p>Sport: ${player.strSport}</p>
            <p>Salary: ${player.strWage}</p>
            <p>Description: ${player.strDescriptionEN
              .split(" ")
              .slice(0, 10)
              .join(" ")}</p>
            <div class="d-flex justify-content-center gap-3 mb-2">
            <a href="http://${
              player.strFacebook
            }" target="_blank" ><i class="bi bi-facebook"  style="font-size: 2rem; color: black"></i>
            </a>
            <a href="http://${
              player.strInstagram
            }" target="_blank" ><i class="bi bi-instagram"  style="font-size: 2rem; color: black"></i>
            </a>
            </div>

            <div class="add-to-cart mb-2">
            <button type="button" class="btn btn-success" onclick="handleAddToCart(${
              player.idPlayer
            })">
            Add To Cart
            </button>
            </div>
            <div class="details">

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="displaySinglePlayer(${
              player.idPlayer
            })">Details</button>
            </div>

            `;
    playersContainer.appendChild(div);
  });
};

fetch("https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal")
  .then((res) => res.json())
  .then((data) => {
    displayPlayers(data.player.slice(0, 10));
  });

const searchedPlayers = (name) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${name}`)
    .then((res) => res.json())
    .then((data) => {
      displayPlayers(data.player);
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
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const cartCount = document.getElementById("count").innerText;
      let convertedCartCount = parseFloat(cartCount);
      if (convertedCartCount < 11) {
        convertedCartCount += 1;

        document.getElementById("count").innerHTML = convertedCartCount;

        const cartInfo = document.getElementById("cart-main-container");
        data.players.forEach((player) => {
          const div = document.createElement("div");
          div.innerHTML = `
    <h4>Name: ${player.strPlayer}</h4>
       `;
          cartInfo.appendChild(div);
        });
      } else {
        alert("can't add more than 11 players");
      }
    });
};

const displaySinglePlayer = (id) => {
  fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data)

      player = data.players[0];
      // console.log(player)
      // Create new modal content
      const singlePlayer = document.getElementById("modal-body");

      // const div = document.createElement("div");
      singlePlayer.innerHTML = `
              <h5>name: ${player.strPlayer}</h5>
              <h5>Team: ${player.strTeam}</h5>
              <h5>Sport: ${player.strSport}</h5>
              <h5>Gender: ${player.strGender}</h5>
              <h5>Nationality: ${player.strNationality}</h5>
              <h5>Birth Date: ${player.dateBorn}</h5>
              <h5>Description: ${player.strDescriptionEN
                .split(" ")
                .slice(0, 30)
                .join(" ")}</h5>

    `;

      // singlePlayer.appendChild(div);
    });
};
