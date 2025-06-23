document.addEventListener("DOMContentLoaded", () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const breedUrl = "https://dog.ceo/api/breeds/list/all";
  const imageContainer = document.getElementById("dog-image-container");
  const breedList = document.getElementById("dog-breeds");
  const dropdown = document.getElementById("breed-dropdown");

  let allBreeds = [];

  // Challenge 1: Fetch and display dog images
  fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
      data.message.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = "A random dog";
        img.style.width = '200px';
        img.style.margin = '10px';
        imageContainer.appendChild(img);
      });
    })
    .catch(error => console.error("Error loading dog images:", error));

  // Challenge 2: Fetch and display dog breeds
  fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
      allBreeds = Object.keys(data.message);
      renderBreeds(allBreeds);
    })
    .catch(error => console.error("Error loading dog breeds:", error));

  // Function to render breed list
  function renderBreeds(breeds) {
    breedList.innerHTML = ""; // Clear previous list
    breeds.forEach(breed => {
      const li = document.createElement("li");
      li.textContent = breed;
      li.style.cursor = "pointer";

      // Challenge 3: Change font color on click
      li.addEventListener("click", () => {
        li.style.color = "green"; // Change to your preferred color
      });

      breedList.appendChild(li);
    });
  }

  // Challenge 4: Filter breeds by selected letter from dropdown
  dropdown.addEventListener("change", (event) => {
    const selectedLetter = event.target.value;
    const filteredBreeds = allBreeds.filter(breed =>
      breed.startsWith(selectedLetter)
    );
    renderBreeds(filteredBreeds);
  });
});
