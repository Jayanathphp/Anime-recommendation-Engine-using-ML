let menu = document.querySelector(".header .menu");
let navgation = document.querySelector(".header .main-navgation");
let links = document.querySelectorAll(".header .main-navgation a");
let overlay = document.querySelector(".overlay");
let overlay1 = document.querySelector(".overlay1");

// Open Navgation Links For Tablets And Mobile.
function openMobileNavgation() {
  menu.classList.add("open"); // Open Menu
  navgation.classList.add("fade-in"); // Open Mobile Navgation
  controlOverlay("open"); // Open Overlay
}

// Close Navgation Links For Tablets And Mobile.
function closeMobileNavgation() {
  menu.classList.remove("open"); // Close Menu
  navgation.classList.remove("fade-in"); // Close Mobile Navgation
  controlOverlay("!open"); // Close Overlay
}

menu.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    closeMobileNavgation();
  } else {
    openMobileNavgation();
  }
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileNavgation();
  });
});

// Reset To Bars Icon Shape IF Width >= 1024px
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && menu.classList.contains("open")) {
    // Close Menu & Mobile Navgation & Overlay
    closeMobileNavgation();
  }
});

// Control [ Open || Close ] Overlay Function.
function controlOverlay(status) {
  /// status:
  /// open => Open Overlay
  /// anything else open => close Overlay
  if (status == "open") {
    overlay.classList.add("fade-in");
    overlay.classList.remove("fade-out");
    overlay1.classList.remove("fade-in");
    loginForm_div.classList.add("none");
    overlay1.classList.add("fade-out");
  } else {
    overlay.classList.add("fade-out");
    overlay.classList.remove("fade-in");
  }
}
// function loadRecommendations() {
//   const Top_animeList = document.getElementById("animeList");
//   const Popular_animeList = document.getElementById("popular-anime-list");

//   // Example data, replace with actual data fetching logic
//   const recommendedAnime = [
//     {
//       title: "Attack on Titan",
//       description: "A story of humanity's struggle against titans.",
//       image: "/static/media/anime.png",
//     },
//     {
//       title: "My Hero Academia",
//       description: "A young boy dreams of becoming a hero.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       title: "Naruto",
//       description: "A young ninja strives to become the strongest.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       title: "One Piece",
//       description: "A pirate adventure in search of treasure.",
//       image: "https://via.placeholder.com/150",
//     },
//     // Add more anime data here
//   ];
//   const popularanime = [
//     {
//       title: "Attack on Titan",
//       description: "A story of humanity's struggle against titans.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       title: "My Hero Academia",
//       description: "A young boy dreams of becoming a hero.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       title: "Naruto",
//       description: "A young ninja strives to become the strongest.",
//       image: "https://via.placeholder.com/150",
//     },
//     {
//       title: "One Piece",
//       description: "A pirate adventure in search of treasure.",
//       image: "https://via.placeholder.com/150",
//     },
//   ];
//   Popular_animeList.innerHTML = popularanime
//     .map(
//       (anime) => `
//   <div class="anime-item">
//     <img src="${anime.image}" alt="${anime.title}" />
//     <h3>${anime.title}</h3>
//     <p>${anime.description}</p>
//   </div>
// `
//     )
//     .join("");

//   Top_animeList.innerHTML = recommendedAnime
//     .map(
//       (anime) => `
//     <div class="anime-item">
//       <img src="${anime.image}" alt="${anime.title}" />
//       <h3>${anime.title}</h3>
//       <p>${anime.description}</p>
//     </div>
//   `
//     )
//     .join("");
// }
// // document.addEventListener("DOMContentLoaded", loadRecommendations);
const submit = document.getElementById("submit");
const search_input = document.getElementById("title");

// fetching image from API (jikan)-----------------------
function imgFetch(animeName) {
  return fetch(
    `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
      animeName.title
    )}&limit=1`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      if (data.status === "429") {
        return imgFetch(animeName); // Return the recursive call
      } else {
        return data.data[0].images.jpg.image_url; // Return the image URL
      }
    })
    .catch((error) => {
      console.error("Error While fetching data:", error);
      throw error;
    });
}
// -------------------------------------------------------------------
submit.addEventListener("click", () => {
  if (search_input.value == null || search_input.value == "") {
    alert("please Enter a Anime Name...");
  } else {
    document.getElementById("spinner").classList.add("fa-spinner", "fa-spin");
  }
});
document
  .getElementById("recommendationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (search_input.value == null || search_input.value == "") {
      alert("please Enter a Anime Name...");
    } else {
      document.getElementById("spinner").classList.add("fa-spinner", "fa-spin");

      const form = event.target;
      const formData = new FormData(form);
      //fetch image

      // fetching data from app.py
      fetch("/recommend", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          document
            .getElementById("spinner")
            .classList.remove("fa-spinner", "fa-spin");
          const recommendationsDiv = document.getElementById(
            "recommendations"
          );
          const error = document.getElementById("error");

          recommendationsDiv.innerHTML = "";
          error.classList.add("none");

          if (data.message) {
            // Display suggestion or error message
            error.innerHTML = `<b>${data.message}</b>`;
            error.classList.remove("none");
          } else {
            // Scroll to the recommendations section
            const a = document.createElement("a");
            a.href = "#recommendations_section";
            a.click();

            // Display recommendations
            data.forEach((anime) => {
              const animeItem = document.createElement("div");
              animeItem.classList.add("anime-item");

              const animeImage = document.createElement("img");
              animeImage.src = "/static/media/loadingSkeleton.svg";
              animeImage.alt = anime.title;
              animeImage.className = "zoom-effect";

              // Fetch image for the anime
              imgFetch(anime)
                .then((imageUrl) => {
                  animeImage.src = imageUrl;
                })
                .catch((error) => {
                  console.error("Failed to fetch image:", error);
                });

              const animeTitle = document.createElement("h3");
              animeTitle.style.color = "rgb(0,0,0)";
              animeTitle.textContent = anime.title;

              const rating = document.createElement("p");
              rating.style.color = "red";
              rating.innerHTML = `<h4>Rating: ${anime.rating}</h4>`;

              animeItem.appendChild(animeImage);
              animeItem.appendChild(animeTitle);
              animeItem.appendChild(rating);

              recommendationsDiv.appendChild(animeItem);
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching recommendations:", error);
          document
            .getElementById("spinner")
            .classList.remove("fa-spinner", "fa-spin");
          const errorDiv = document.getElementById("error");
          errorDiv.innerHTML =
            "<b>Failed to get recommendations. Please try again.</b>";
          errorDiv.classList.remove("none");
        });
    }
  });
      

