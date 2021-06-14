const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('newquote');
const loader = document.getElementById('loader')

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide loading 
function complete(){
    if (loader.hidden == false ){
        quoteContainer.hidden = false;
        loader.hidden =  true;
    }
}
//GET QUOTE FORM API
async function getQuote(){
    loading();
    const proxyUrl = 'http://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch( proxyUrl + apiUrl );
        const data = await response.json();
        //If author is blank, add 'Unknown'
        if (data.quoteAuthor === ''){
            authorText.innerHTML='Unknown';
        }
        else{
            authorText.innerText = data.quoteAuthor;
        }
        //Reduce font-size for long quotes
        if(data.quoteText.length > 50){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop loader, Show quote
        complete();
    }catch (error){
        getQuote();
    }
}

//Tweet code
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = 'https://twitter.com/intent/tweet?text=${quote} - ${author}';
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
getQuote();

