const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photoArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

//Unplash API
const count = 30;
const apiKey = 'U2Q4lAP0plBy1J9d-C8-6AjZpHBlge7v1p2mgNZDTOk';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
//check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}
//Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}
//Create Elements For Links & Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photoArray.length;
    console.log('total images = ',totalImages);
    photoArray.forEach((photo) => {
        //Create <a> to link to unplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target:'_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');

        setAttributes(img,{
            src:photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description,
        });
        //Event Listener, check when each is finished loading
        img.addEventListener('load',imageLoaded);
        //Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
//Get photos from Unplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();       
    }
    catch(error)
    {
        //Catch Error Here
    }
}
//Check to see if scrolling near bottom of page,Load more photo
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
//On load
getPhotos();
