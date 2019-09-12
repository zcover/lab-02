'use strict';

//global variables
const allImages = [];


// constructor
function Image(animal){
    this.image_url = animal.image_url;
    this.title = animal.title;
    this.description = animal.description;
    this.keyword = animal.keyword;
    this.horns = animal.horns;

    allImages.push(this);
}

//render prototype
Image.prototype.render = function() {
    //ake a div
    let $templateClone = $('<div></div>');

    //fill that div with an html of the #photo-template
    $templateClone.html($('#photo-template').html());

    //find elements, fill with things from constructor
    $templateClone.find('h2').text(this.title);
    $templateClone.find('img').attr('src', this.image_url);
    $templateClone.find('p').text(this.keyword);
    $templateClone.find('p').text(this.description);


    $templateClone.attr('class', this.keyword);
    $('main').append($templateClone);
}

// get with render
$.get('data/page-1.json', (data) => {
    data.forEach(dataofdata => {
        (new Image(dataofdata))
    })
    renderToPage()
});

// ========= Helper Functions =========== //
function renderToPage(){
    allImages.forEach(animal => {
        // console.log('animal is:', animal);
        animal.render()
    })
}


// ============== Form ===============
//create a function that filters duplicates-- will be used to generate dropdown list
const populateFilter = () => {
    let filterKeywords = [];
}

    //make an array of unique keywords (allImages)
    allImages.forEach(image => {
        if(!filterKeywords.includes(image.keyword)){
            filterKeywords.push(image.keyword);
        }
    })
    //sort alphabetically
    filterKeywords.sort();

    //array filterKeywords
    filterKeywords.forEach(keyword => {
        let optionTag = `<option value ="${keyword}">${keyword}</option>`;
        $('select').append(optionTag);
    })
};



//do something when they click on a selection
const handleFilter = () => {
    $('select)').on('change', function() {
        //find the value of the thing that was clicked(changed)
        let selected = $(this).val();

        //as long as it wasn't the default
        if(selected !== 'default'){
            $('div').hide();
            //fade in only the things that were clicked on
            $(`div.${selected}`).fadeIn()
        }
    })
}