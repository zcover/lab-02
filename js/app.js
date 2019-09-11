'use strict';

//global variables
const allImages = [];
const newImages = [];



// DONE Use AJAX, specifically $.get(), to read the provided JSON file.

// DONE Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.

// Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.


// constructor
function Image(image_url, title, description, keyword, horns){
    this.url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;

}

// Helper Function
Image.prototype.renderImage = function() {
    const $myTemplate = $('#photo-template').html();
    const $newSection = $('<section></section>');
    $newSection.html($myTemplate);

   $newSection.find('h2').html(this.title);
   $newSection.find('#descript').text(this.description);
   $newSection.find('img').attr('src', this.url);
   $newSection.find('#keyword').text(this.keyword);
   $newSection.find('#horns').text(this.horns);
    
    $('main').append($newSection);
}


const getAllimages = ()=>{
    $.get('data/page-1.json').then(images => {
        images.forEach(object => {
            allImages.push(new Image (object.image_url, object.title, object.description, object.keyword, object.horns))
            // oneImage.renderToPage(); 
            
        });
        allImages.forEach(image => {
            image.renderImage();
        })
    });
}


function renderToPage(){
    allImages.forEach(image => {
        image.renderImage();
    })   
}

$().ready(() => {
    getAllimages()
});

// .get

// renderToPage();
//cross fingers



{/* <section id="photo-template">
        <h2></h2>
        <img src="" alt="">
        <p></p>
      </section> */}