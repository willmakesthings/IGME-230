// 1
  	window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
	// 2
	let displayTerm = "";
	
	// 3
	function searchButtonClicked(){
		console.log("searchButtonClicked() called");
        
        //1
        const TREFLE_URL = "https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/"
		
        //2
        let TREFLE_KEY = "?token=Q1Rnd0haRmIxT2dIVmtMRlZGZ2xJUT09";
        
        //3
        let url = TREFLE_URL;
        
        
        //4
        let term = document.querySelector("#searchterm").value;
        displayTerm = term;
        
        //5
        term = term.trim();
        
        //6
        term = encodeURIComponent(term);
        
        //7
        //if(term.length < 1) return;
        url += TREFLE_KEY;
        
        //8
        url += "&q=" + term;
           
        //11
        console.log(url);
        
        //12
        getData(url);
    
	}
      
    function getData(url){
        //1
        let xhr = new XMLHttpRequest();
        
        //2
        xhr.onload = dataLoaded;
        
        //3
        xhr.onerror = dataError;
        
        //4
        xhr.open("GET", url);
        xhr.send();
    }
      
    function dataLoaded(e){
        //5
        let xhr = e.target;
        let TREFLE_KEY = "?token=Q1Rnd0haRmIxT2dIVmtMRlZGZ2xJUT09";
        //6
        //console.log(xhr.responseText);
        
        //7
        let obj = JSON.parse(xhr.responseText);
        console.log(obj);
        
        //9
        let results = obj;
        console.log("results.length = " + results.length);
        let bigString = "<p class='numResults'><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
        
        //10
        for (let i=0; i< results.length; i++){
            let result = results[i];
        

            //13
            let line = `<p><a href='${result.link + TREFLE_KEY}'>${result.common_name}</a></br>`;
            line += `${result.scientific_name}</br><hr>`;
            
            //15
            bigString += line;

        }
        
        //16
        document.querySelector("#content").innerHTML = bigString;

        
        //17
    }
      
    function dataError(e){
        console.log("An error occurred");
    }