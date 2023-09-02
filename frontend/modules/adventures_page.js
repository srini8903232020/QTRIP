
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams(search);
  let city = params.get("city");
  //console.log(city);
  return city;

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const data1 = await fetch(config.backendEndpoint+`/adventures/?city=${city}`);
    return data1.json();
   }
  catch{
    return null;

  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(let i=0;i<adventures.length;i++)
  {
    var div=document.createElement("div");
    div.setAttribute("class", "col-12 col-sm-6 col-lg-3 mb-3");
    div.innerHTML = `
      <a id=${adventures[i].id} href="detail/?adventure=${adventures[i].id}">
        <div class="card activity-card">
          <img src=${adventures[i].image}>
            <div class="category-banner">${adventures[i].category}</div>
            <div class="card-body col-md-12 mt-2">
              <div class="d-flex justify-content-between">
                <p>${adventures[i].name}</p>
                <p>₹${adventures[i].costPerHead}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Duration</p>
                <p>${adventures[i].duration} Hours</p>
              </div>
            </div>
        </div>
      </a>`
    document.getElementById("data").append(div);
  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  //console.log(list);
  let filteredList = list.filter((e) => (e.duration>=low && e.duration<=high));
  //console.log(filteredList);
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList=[];
  //console.log(list);
  list.filter(function (e) {
    if(categoryList.includes(e.category))
      filteredList.push(e);   
      });

      return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  let filteredlist =[]
  let arr=filters["duration"].split("-")
  //console.log(arr);
  if(filters["category"].length>0 && filters["duration"].length>0){
    filteredlist=filterByCategory(list, filters.category)
    filteredlist=filterByDuration(filteredlist,parseInt(arr[0]),parseInt(arr[1]))
  }
  else if(filters["category"].length>0){
    filteredlist=filterByCategory(list,filters.category);
  }
  else if(filters["duration"].length>0){
  filteredlist=filterByDuration(list,parseInt(arr[0]),parseInt(arr[1]))
  }
  else{
    return list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredlist;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(window.localStorage.getItem('filters'));
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryList=filters["category"];
   let li=[];
  for(let i=0;i<categoryList.length;i++)
  {
   // console.log(categoryList[i]);
    li.push(categoryList[i]);
  }
  //console.log(li);
  for(let i=0;i<li.length;i++)
  {
    //console.log(li[i]);
    var div=document.createElement("div");
    div.setAttribute("class","category-filter");
    div.innerText=li[i];
    document.getElementById("category-list").append(div);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
