
const quote = document.getElementById("quote");
const author = document.getElementById("author");

const api_url = "https://favqs.com/api/qotd";
const proxy_url = `https://api.allorigins.win/get?url=${encodeURIComponent(api_url)}`;

// Function to add a random number as a query parameter to avoid caching
const getProxyUrl = (url) => {
    const randomParam = `?cache_buster=${new Date().getTime()}`; // unique timestamp
    return `https://api.allorigins.win/get?url=${encodeURIComponent(url + randomParam)}`;
};


async function getQuote(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const contents = JSON.parse(data.contents);  // Parse the nested response
        console.log(contents);  // Output the actual quote
        // Access the quote and author correctly
        quote.innerHTML = contents.quote.body;
        author.innerHTML = contents.quote.author;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}
// Call the function with a cache-busting URL
getQuote(getProxyUrl(api_url));

function tweet() {
    window.open("https://twitter.com/intent/tweet?text=" + quote.innerHTML + "------by " + author.innerHTML, "Tweet Window", "width=600, height=300")
}






