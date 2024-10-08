const apiKey = "K6fr3bjE_qvqHe3H8mGI15ALczgV4qGso7WKQFU4qTk";
const photoGrid = document.getElementById("photo-grid");

// Function to get a random photo from Unsplash
async function fetchRandomPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=10`
    );
    const photos = await response.json();

    // add each photo in the grid with title and description
    photos.forEach((photo, index) => {
      const photoItem = document.createElement("div");
      photoItem.classList.add("photo-item");


      const imgElement = document.createElement("img");
      imgElement.src = photo.urls.regular;

      // create title for each photo (optional  - static title for now)
      const titleElement = document.createElement("h2");
      titleElement.innerText=`collection ${index+1}`;


      // create description with random photo count (optional - dynamic text)
      const descriptionElement = document.createElement("p");
      descriptionElement.innerText = `${Math.floor(Math.random()*20)+1} PHOTOS`;
      
      // Append elements to the photo item
      photoItem.appendChild(imgElement);
      photoItem.appendChild(titleElement);
      photoItem.appendChild(descriptionElement);


      //Append the photo item to the grid
      photoGrid.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error loading photos :", error);
  }
}

// Function to detect scroll and load new photos
function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    // When user is near bottom of page, load new photos
    fetchRandomPhotos();
  }
}

// Load first photos on startup
fetchRandomPhotos();

// Listen to scroll event
window.addEventListener("scroll", handleScroll);
