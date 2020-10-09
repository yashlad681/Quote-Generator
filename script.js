const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Show Loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading
function removeLoadingSpinner() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/' // proxyUrl is used to resolve cors error which occus due to origin 
        const response = await fetch(proxyUrl + apiUrl); // and then we added api + proxy
        const data = await response.json();
        //console.log(data); ref for why quoteAuthor and quoteText is use
        
        //If Author is blank, add 'Unknown'
         if(data.quoteAuthor=== ''){
             authorText.innerText = 'Unknown';
         } else {
            authorText.innerText = data.quoteAuthor;
         }
         // Reduce font size for long quotes
         if(data.quoteText.length > 120){
             quoteText.classList.add('long-quote');
         } else {
            quoteText.classList.remove('long-quote');
         }

        quoteText.innerText = data.quoteText;
        //Stop loader, show quote
         removeLoadingSpinner();
    } catch (error) {
        getQuote();
        
    }

}

//Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl =  `https://twitter.com/intent/tweet?text=${quote} - ${author}`;  // back ticks are used to denote template string 
    window.open(twitterUrl, '_blank')
}

//Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

//On Load
getQuote();