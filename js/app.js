'use strict';

//global variables
const allAnimals = [];



// DONE Use AJAX, specifically $.get(), to read the provided JSON file.

// DONE Each object should become a new instance of a constructor function. Refer to the data to determine the necessary properties.

// Use jQuery to make a copy of the HTML template of the photo component. For each object, fill in the duplicated template with its properties, then append the copy to the DOM.


// constructor
function Image(animal){
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;

    allAnimals.push(this);
}




// .get
$.get('data/page-1.json', (data) => {
    data.forEach(value => {
        (new Animal(value))
    })
});





// Helper Function
const dommanip = function(value) {
    const $myTemplate = $('#photo-template').html();
    const $newSection = $('<section></section>');
    $newSection.html($myTemplate);

    $newSection.find('h2').text(this.title);
    $newSection.find('img').attr('src', this.image_url);
    $newSection.find('p').text(this.horns);

    $('main').append($newSection);
}


function renderToPage(){
    allAnimals.forEach(animal => {
        console.log('animal is:', animal);
        animal.dommanip();
    })

}

renderToPage();
//cross fingers



{/* <section id="photo-template">
        <h2></h2>
        <img src="" alt="">
        <p></p>
      </section> */}