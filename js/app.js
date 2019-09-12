'use strict';

//global variables
let allImages = [];


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
    $templateClone.find('#keyword').text(this.keyword);
    $templateClone.find('p').text(this.description);
    $templateClone.attr('class', this.keyword);
    $('main').append($templateClone);
}

//make paramater fo doanything wooh

//make page-1 and page-2 json variables

//dynamically run doeverything(param) with button push
let page1 = 'data/page-1.json';
let page2 = 'data/page-2.json'
// get with render
function doeverything(page) {
    $.get(page, (data) => {
        data.forEach(dataofdata => {
            (new Image(dataofdata))
        })
        renderAll();
    });

}

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
    $('select').on('change', function() {
        //find the value of the thing that was clicked(changed)
        let selected = $(this).val();
        console.log(selected)
        
        //as long as it wasn't the default
        if(selected !== 'default'){
            $('div').hide();
            //fade in only the things that were clicked on
            $(`div.${selected}`).fadeIn()
        }
    })
}
function renderAll(){ //helper
    renderToPage();
    populateFilter();
    handleFilter();
}

//BUTTON STUFF
$('#button1').click(function(){
    console.log('you clicked button one!');
    //function that clears the page
    doeverything(page1);
});

$('#button2').click(function(){
    console.log('you clicked button two!')
    //function that clears the page
    doeverything(page2);
});


doeverything()



