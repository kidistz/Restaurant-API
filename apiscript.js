
const results = document.getElementById("results");
const address = document.getElementById("city");
const PAGE_SIZE = 10;
const start = 0;
const searchForm = () => {
    const searchQueryElem = document.querySelector('.search-input');
    const searchQuery = searchQueryElem.value;
    const locationElem = document.querySelector('.location-input');
    const address = locationElem.value;


    if (!searchQuery) {
        searchQueryElem.classList.add('is-invalid');
    } else {
        searchQueryElem.classList.remove('is-invalid');
    }

    // TODO: get the address / city that you are searching 
    // then you can call convertAddressToGeopoint(address)
    // .then((latlong) => {
    // searchItem(searchQuery, lat, long)
    // })
    convertAddressToGeopoint(address)
        .then((latlong) => {
            searchItem(searchQuery, latlong.lat, latlong.long, 0)
                .then((response) => {
                    clearResults();
                    if (response.restaurants && response.restaurants.length > 0) {
                        clearCollections();
                        createPagination(response.results_found);
                        addItem(response.restaurants);
                    } else {
                        displayText('There are no results.');
                    }
                })
                .catch((error) => {
                    clearResults();
                    displayText('No connection. Please try again');
                });
        })
    return false;
}

const clearResults = () => {
    results.innerHTML = "";
}
const clearCollections = () => {
    const collections=document.getElementById("collections");
    collections.innerHTML = "";
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




const searchItem = (searchQuery, lat, long, start) => {
    var url = "https://developers.zomato.com/api/v2.1/search?";
    url += convertObjToParams({
        q: searchQuery,
        lat: lat,
        lon: long,
        sort: 'real_distance',
        start: start,
        count: PAGE_SIZE,
    });

    return fetch(url, {
        mode: 'cors',
        headers: {
            'user-key': '6cf9888b04e6d46625308bb1a8b085a0'
        }
    })
        .then(res => res.json());
}

   
    const createPagination = (results_found) => {
        document.getElementById('pages').innerHTML = "";
        const navPages = document.createElement('nav');
        const ulElem = document.createElement('ul');
        ulElem.className     = 'pagination';
        navPages.appendChild(ulElem);
    const numberOfPages = Math.ceil(results_found / PAGE_SIZE);
        for(let i=0;i<Math.min(numberOfPages, 10);i++){
            const searchQueryElem = document.querySelector('.search-input');
            const searchQuery = searchQueryElem.value;

            const locationElem = document.querySelector('.location-input');
            
            const address = locationElem.value;
            const ilElem = document.createElement('li');
            ilElem.className = "page-item";
            ilElem.id= "page";
            const aElem = document.createElement('a');
            aElem.textContent = i + 1;
            aElem.className = "page-link";            
            aElem.addEventListener('click', ()=> {
                convertAddressToGeopoint(address)
                  .then((latlong) => {
                      searchItem(searchQuery, latlong.lat, latlong.long, i *10)
                        .then((response) => {
                            clearResults();
                            if (response.restaurants && response.restaurants.length > 0)
                             {
                                clearCollections();
                                addItem(response.restaurants);
                                createPagination(response.results_found);

                            } else {displayText('There are no results.');
                                   }
                        })
                        .catch((error) => {
                            clearResults();
                            displayText('No connection. Please try again');
                        });
                    });
                return false;
            });

            ilElem.appendChild(aElem);
            ulElem.appendChild(ilElem);


        }

        document.getElementById('pages').appendChild(navPages);
       
    }



   
  


const createItemElement = (gif) => {
    const gifStr = `<div class="col-12 col-sm-8 col-md-8 col-lg-8 space2 ">
                   
                      <div class="card rowalign ">
                          <div class="pictext">

                              
                                  <div class="container">
                                      <div class="row cardmargin">
                                           <div class="col-4">
                                              <img class='pic' src="${gif.restaurant.featured_image}" class="gif"/>
                                            </div>
                                          <div class="col-6">
                                             <p class="text-centername d-inline ">${gif.restaurant.name}</p>
                                             <p class="text-center2">${gif.restaurant.location.locality}</p>
                                             <p class="text-center3">${gif.restaurant.location.address}</p>
                                          </div>
                                          <div class="col-2">
                                              <div class="d-inline">
                                                 <p class="textrate ">${gif.restaurant.user_rating.aggregate_rating}</p>
                                                 <p class="menu">${gif.restaurant.user_rating.votes} votes</p>
                                              </div>
                                           </div>
                                       </div>                           
                                 
                              </div>
                                
                            </div> 
                           <hr/>      
                               <p class="textmargin">Cuisines          :  ${gif.restaurant.cuisines}</p>                   
                               <p class="textmargin">Cost for two          :  ${gif.restaurant.average_cost_for_two}</p>
                              
                               <a class="textmargin" target="_blank" href="${gif.restaurant.menu_url}">Menu</a>


                        </div>
                    </div>`;

    return gifStr;

}

const addItem = (gifs) => {
    const resultsStr = `
        <div class="row newrow">
       
           <div class="col-12 col-sm-2 col-md-2 col-lg-2 filter">
                   <p><strong>Filters</strong></p>
                   <p>Sort by</p>
                    <p class="ftext">Popularity-high to low</p>
                    <p class="ftext">Rating-high to low</p>
                    <p class="ftext">Cost-high to low</p>
                    <p class="ftext">Cost-low to high</p>
                    <p class="ftext">Recently Added-new to old</p>

                    <p><strong>Category</strong></p>
                   <p class="ftext">Dine-out</p>
                    <p class="ftext">Delivery</p>
                    <p class="ftext">Drinks& Nightlife</p>
                    <p class="ftext">Cafes</p>


                     <p><strong>Location</strong></p>
                   <p class="ftext">Mississauga</p>
                    <p class="ftext">Northyork</p>
                    <p class="ftext">Scarborough</p>
                    <p class="ftext">Etobicoke</p>
                      
                      <p><strong>Cuisine</strong></p>
                   <p class="ftext">Cafe</p>
                    <p class="ftext">Bakery</p>
                    <p class="ftext">Burgers</p>
                    <p class="ftext">Italian</p>
                    <p class="ftext">Indian</p>
                    <p class="ftext">Turkish</p>
                    <p class="ftext">Lebanon</p>
                    <p class="ftext">Brazil</p>
                     <p class="ftext">Philippines</p>
                    <p class="ftext">Portugal</p>
                    <p class="ftext">South Africa</p>


                </div>
                  <div class="col-12 col-sm-8 col-md-8 col-lg-8 space">            
                     ${gifs.map(gif => createItemElement(gif)).join('')}
                  </div>
                 
          
          </div> 
          
    `;

    results.innerHTML = resultsStr;
}

const convertAddressToGeopoint = (address) => {
    const geocoder = new google.maps.Geocoder();

    return new Promise(function (resolve, reject) {
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let latitude = results[0].geometry.location.lat();
                let longitude = results[0].geometry.location.lng();
                resolve({ lat: latitude, long: longitude });
            }
        });
    });

};
















     

