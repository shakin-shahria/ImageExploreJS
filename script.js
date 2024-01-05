// API access key for Unsplash
const accessKey = "eRWcFt0xiBONo-pd3pQ6Yb0WikiCCtGOPcgM7tu-0Ro";

// Selecting the form element in the HTML
const formEl = document.querySelector("form");

// Getting the input element with the id "search-input"
const inputEl = document.getElementById("search-input");

// Selecting the element with the tag "search-result1"
const searchResults = document.querySelector("search-result1");

// Getting the element with the id "show-more-button"
const showMore = document.getElementById("show-more-button");

// Initializing variables for input data and page number
let inputData = " ";
let page = 1;

// Function to asynchronously search for images
async function searchImages() {

    // Getting the value of the input element
    inputData = inputEl.value;

    // Creating the URL for the Unsplash API
    const url = `https://api.unsplash.com/search/photo?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Fetching data from the Unsplash API
    const response = await fetch(url);
    const data = await response.json();

    // Extracting results from the API response
    const results = data.results;

    // Clearing search results if it's the first page
    if (page === 1) {
        searchResults.innerHTML = " ";
    }

    // Mapping through results and creating HTML elements for each image
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result2");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imgLinker = document.createElement("a");
        imgLinker.href = result.links.html;
        imgLinker.target = "_blank";
        imgLinker.textContent = result.alt_description;
        imgLinker.appendChild(image);
        imageWrapper.appendChild(imgLinker);
        searchResults.appendChild(imageWrapper); // Appending the created elements to searchResults
    });

    page++; // Incrementing the page number

    // Displaying "Show More" button if page is greater than 1
    if (page > 1) {
        showMore.style.display = "block";
    }
}

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Resetting page number to 1
    searchImages();
});

// Event listener for form click (assuming this is for a generic click on the form)
formEl.addEventListener("click", () => {
    searchImages();
});
