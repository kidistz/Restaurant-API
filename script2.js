
const results = document.getElementById("results");

const searchForm = () => {
    const searchQueryElem = document.querySelector('.search-input');
    const searchQuery = searchQueryElem.value;

    if (!searchQuery) {
        searchQueryElem.classList.add('is-invalid');
    } else {
        searchQueryElem.classList.remove('is-invalid');
    }

    searchItem(searchQuery)
    .then((response) => {
        clearResults();
        if (response.restaurants && response.restaurants.length > 0) {
            addItem(response.restaurants);
        } else {
            displayText('There are no results.');
        }
    })
    .catch((error) => {
        clearResults();
        displayText('No connection. Please try again');
    });

    return false;
}

const clearResults = () => {
    results.innerHTML = "";
}

const displayText = (text) => {
    const textElem = document.createElement("p");
    textElem.classList.add("text-center");
    textElem.classList.add("empty-results");
    textElem.textContent = text;
    results.appendChild(textElem);
}

const convertObjToParams = (obj) => {
    let str = "";
    for (let key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    }
    return str;
}




const searchItem= (searchQuery) => {
    var url="https://developers.zomato.com/api/v2.1/search?";
    url += convertObjToParams({
       q: searchQuery,
       lat: '43.653226',
       lon: '-79.383184',
       sort: 'real_distance'
       //category: 'breakfast'
    });

    return fetch(url, {
        mode: 'cors',
        headers:{
          'user-key': '6cf9888b04e6d46625308bb1a8b085a0'
       }})
    .then(res => res.json());
}

const createItemElement = (gif) => {
    const gifStr = `<div class="col-12 col-sm-8 col-md-8 col-lg-8 rowalign ">
                   
                        <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                             <p class="text-center">${gif.restaurant.name}</p>
                        </div>
                           <div class="col-12 col-sm-4 col-md-4 col-lg-4">
                            <p class="text-center">${gif.restaurant.name}</p>
                            <p class="text-center">${gif.restaurant.location.locality}</p>
                            <p class="text-center">${gif.restaurant.location.address}</p>
                           </div>                          
                    </div>`;

    return gifStr;

}

const addItem = (gifs) => {
    const resultsStr = `
        <div class="row newrow">
       
        <div class="col-12 col-sm-2 col-md-2 col-lg-2 filter">
                   <p> THIS IS MY FILTERS</p>
            </div>
        <div class="col-12 col-sm-8 col-md-8 col-lg-8">
            ${gifs.map(gif => createItemElement(gif)).join('')}
          </div>      
          
        </div>  

    `;
    
    results.innerHTML = resultsStr;
}
function createCollection(){

     <div class="row ">
            <div class="col-lg-8 offset-md-2 ">
                  <div class="row">
                          <div class=" col-sm-6 col-lg-4 col-md-4">                    
                               <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                               <p>Trending this week</p>
                           </div>
                          <div class=" col-sm-6 col-lg-4 col-md-4">
                    
                             <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                              <p>Breakfasts</p>
                          </div>
                          <div class=" col-sm-6 col-lg-4 col-md-4">
                    
                             <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                              <p>Late Night Restaurants</p>
                          </div>
                          <div class=" col-sm-6 col-lg-4 col-md-4">
                  
                           <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                              <p>Great Burgers</p>
                         </div>
                         <div class=" col-sm-6 col-lg-4 col-md-4">
                   
                              <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                                <p>Lunches</p>
                         </div>
                         <div class=" col-sm-6 col-lg-4 col-md-4">                 
                    
                              <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                                 <p>Collections</p>
                         </div>
                  </div>
            </div>
   </div>
   </div>   
}