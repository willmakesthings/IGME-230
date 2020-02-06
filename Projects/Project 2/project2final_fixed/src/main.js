// Initialize buttonClick for search button
window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
};


// Initialize displayTerm
let displayTerm = "";


if(localStorage.getItem("wam5613-plant-term") !== undefined){
    document.querySelector("#searchterm").value = localStorage.getItem("wam5613-plant-term");
} 
// On Search Button click, call Trefle.io API with token and appended search term, as well as any toggled filters
function searchButtonClicked() {
    //console.log("searchButtonClicked() called");
    const TREFLE_URL = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants"
    let TREFLE_KEY = "?token=Q1Rnd0haRmIxT2dIVmtMRlZGZ2xJUT09";
    let url = TREFLE_URL;
    let term;
    if(localStorage.getItem("wam5613-plant-term") !== undefined){
        term = localStorage.getItem("wam5613-plant-term");
    }
    if(localStorage.getItem("wam5613-plant-term") !== document.querySelector("#searchterm").value){
        term = document.querySelector("#searchterm").value;
    }
    
    localStorage.setItem("wam5613-plant-term", term);
    
    displayTerm = term;
    term = term.trim();
    term = encodeURIComponent(term);
    url += TREFLE_KEY;
    //add term to URL query
    url += "&q=" + term;
    
    //if plant is fully complete, add to query
    if(document.querySelector("#completeDataToggle").checked){
        url += "&complete_data=true";
    }
    
    //If plant is edible by humans, add to query
    if(document.querySelector("#edibleToggle").checked){
        url += "&palatable_human=true";
    }
    
    //If plant is fire resistant, add to query
    if(document.querySelector("#fireToggle").checked){
        url += "&fire_resistant=true";
    }
    
    url += "&page_size=" + document.querySelector("#resultsNum").value;

    //Console log to make sure URL query makes sense with results
    //console.log(url);
    
    document.querySelector('#resultList').innerHTML = '';
    
    var containingBox = document.createElement("div");
    containingBox.className = "plant-grid-item";
    containingBox.innerHTML = `<p class="plant-kingdom">Digging for plants...</p>`;
    document.querySelector("#resultList").appendChild(containingBox);

    //Call getdata with full URL to populate results list
    
    document.querySelector(".results-title").innerHTML = "Search results for <em>" + document.querySelector("#searchterm").value + "</em> :";  
    getData(url);

}

//Create new XMLHttpRequest to API to retreive query sent from URL
function getData(url) {
    let xhr = new XMLHttpRequest();
    //Calls dataLoaded function to fill the results list with XMLResponse Object
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

//On dataLoaded, fill resultList with queried plants
function dataLoaded(e) {
    let xhr = e.target;

    //console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);
    //console.log(obj);
    
    document.querySelector('#resultList').innerHTML = '';
    let results = obj;
    //console.log("results.length = " + results.length);

    //If no plants found, Paste error and report to user
    if (results.length === 0) {
        var containingBox = document.createElement("div");
        containingBox.className = "plant-grid-item";
        containingBox.innerHTML = `<p class="plant-kingdom">No Results Found</p>`;
        document.querySelector("#resultList").appendChild(containingBox);
        //console.log("i was called");
    } else {
        //If plants are found, loop through them to fill the resultList with basic detail
        for (let i = 0; i < results.length; i++) {
            //console.log(results[i].images);

            var containingBox = document.createElement("div");
            containingBox.className = "plant-grid-item";
            
            //If plant has common name, set top to Common name
            if (results[i].common_name === null) {
                containingBox.innerHTML = `<div class="plant-left-info"><h2 class="plant-name">${results[i].scientific_name}</h2><p class="plant-kingdom">${results[i].scientific_name}</p><p class="plant-id">ID: ${results[i].id}</p></div><div class="plant-link">Details</div>`;
            //if plant has only scientific name, utilize that for top h2
            } else {
                containingBox.innerHTML = `<div class="plant-left-info"><h2 class="plant-name">${results[i].common_name}</h2><p class="plant-kingdom">${results[i].scientific_name}</p><p class="plant-id">ID: ${results[i].id}</p></div><div class="plant-link">Details</div>`;
            }
            //On item click, get more info about individual plant
            containingBox.addEventListener('click', function(){
                plantDetails(results[i].id);
            });
            
            //append containingBox to overall ResultList
            document.querySelector("#resultList").appendChild(containingBox);
        }
    }
    //console.log(document.querySelectorAll(".plant-grid-item"));
    //document.querySelectorAll(".plant-grid-item").addEventListener('click', plantDetails);

}

//On data load error, console log error message
function dataError(e) {
    console.log("An error occurred");
}

//Allows access to individual plant specifications and objects
function plantLoaded(e) {
    //console.log("plants loaded");
    
    let xhr = e.target;
    //console.log(xhr.responseText);
    
    let obj = JSON.parse(xhr.responseText);
    //console.log(obj);
    
    document.querySelector(".pop-up-window").style.display = "block";
    
    document.querySelector("#pu-close-button").onclick = function(){
        document.querySelector(".pop-up-window").style.display = "none";
    }
    
    document.querySelector("#pu-id").innerHTML = obj.id;
    //console.log(obj);
    
    if(obj.images.length === 0){
        document.querySelector("#pu-plant-image").style.backgroundImage = "url(assets/image_not_found.png)";
    } else{
        document.querySelector("#pu-plant-image").style.backgroundImage = "url('" + obj.images[0].url + "')";
    }
    
    if(obj.common_name === null){
        document.querySelector("#pu-common-name").innerHTML = obj.scientific_name;
    } else{
        document.querySelector("#pu-common-name").innerHTML = obj.common_name;
    }
    
    document.querySelector("#pu-science-name").innerHTML = obj.scientific_name;
    document.querySelector("#pu-genus").innerHTML = "<b>Genus: </b>" + obj.genus.name;
    document.querySelector("#pu-family").innerHTML = "<b>Family: </b>" + obj.family_common_name;
    if(obj.division !== null){
        document.querySelector("#pu-division").innerHTML = "<b>Division: </b>" + obj.division.name;
    }
    document.querySelector("#pu-duration").innerHTML = "<b>Duration: </b>" + obj.duration;
    if(obj.class !== null){
        document.querySelector("#pu-class").innerHTML = "<b>Class: </b>" + obj.class.name;
    }
    
}
//Called on button click of individual plant item, gets plant item's further details with plantLoaded function
function plantDetails(id){
    
    const PLANT_URL = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/"
    let TREFLE_KEY = "?token=Q1Rnd0haRmIxT2dIVmtMRlZGZ2xJUT09";
    let xhr = new XMLHttpRequest();
    xhr.onload = plantLoaded;
    xhr.onerror = dataError;
    var queryURL = PLANT_URL + id + "/" + TREFLE_KEY;
    //console.log(queryURL);
    xhr.open("GET", queryURL);
    //console.log(xhr.response);
    xhr.send();
}
