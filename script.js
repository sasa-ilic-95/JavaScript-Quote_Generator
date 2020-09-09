const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.querySelector('.loader');

// Show Loading
const loading = ()=> {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const ready = ()=>{
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get Quote From API
const getQuote = async() => {
    // Show Loader
    loading();
    const apiUrl = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        // If Author is blank, add 'unknown'
        if(data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if(data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        ready();
    } catch (error) {
        getQuote();
    }
}

//Tweet Quote
const tweetQuote = ()=>{
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
    // Button Click New Quote
newQuoteBtn.addEventListener('click', getQuote);
    // Button Click Tweet
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();


