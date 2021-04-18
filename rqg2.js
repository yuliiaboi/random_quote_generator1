const newQuoteButton = document.querySelector('.new-quote');
const spinner = document.querySelector('.spinner');
const twitterButton = document.querySelector('#js-tweet');

async function getQuote() {
    spinner.classList.remove('hidden');
    newQuoteButton.disabled = true;
  try {  
    const response = await fetch('https://api.quotable.io/random');
    if (!response.ok) {
        throw Error(response.statusText);
    };
    const data = await response.json()
    displayQuote(`${data.content} - ${data.author}`);
    setTweetButton(`${data.content} - ${data.author}`);
} catch (err) {
        console.log(err)
        alert('Failed to fetch a new quote');
} finally {
    newQuoteButton.disabled = false;
    spinner.classList.add('hidden');
}   
};

function displayQuote(quote) {
    const quoteText = document.querySelector('.quote-text');
    quoteText.textContent = quote;
};

function setTweetButton(quote) {
    twitterButton.setAttribute('href', `https://twitter.com/share?text=${quote.content} - ${quote.author}`);
  };

newQuoteButton.addEventListener('click', getQuote);

getQuote()