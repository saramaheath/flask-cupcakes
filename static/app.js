"use strict";

/** gets list of cupcake objects, converts to html, 
 * adds to ordered list on cupcake-app.html*/
async function getCupcakes() {
  const response = await axios.get("/api/cupcakes");
  console.log(response, "response");
  const cupcakes = response.data.cupcakes;
  console.log(cupcakes);

  return cupcakes;
}

/** takes an object, returns html*/
function createCupcakeLi({ flavor, size, rating, image, id }) {

  return $(`<li id="cupcake-${id}">
    <p>${flavor}, ${size}, ${rating}</p>
    <img src="${image}" width="200px">
    </li>`);
}

/** gets form data, invokes the addCupcake with it
*/
async function handleSubmit() {
  console.log('addcupcake runs')
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();
  addCupcake({ flavor, size, rating, image })
}

/** Takes in cupcake object, makes a post request to api to add it,
 *  updates the html cupcake-list
 */
async function addCupcake({ flavor, size, rating, image }) {
  const cupcake = await axios.post(
    "/api/cupcakes",
    { flavor, size, rating, image }
  );

  getDisplayCupcakes();
}

/** Takes in a list of cupcake objects, empties out the #cupcake-list,
 *  converts the cupcake objs into html, and adds them to the #cupcake-list
 */
async function displayCupcakes(cupcakes) {
  $('#cupcake-list').empty()
  console.log('cupcakes in displayCupcakes =', cupcakes);
  const cupcakeLis = await cupcakes.map((cupcake) => createCupcakeLi(cupcake));

  for (let cupcakeLi of cupcakeLis) {
    $("#cupcake-list").append(cupcakeLi);
  }
}

/** Calls getCupcakes and passes the return value into displayCupcakes */
async function getDisplayCupcakes() {
  const cupcakes = await getCupcakes();
  displayCupcakes(cupcakes);
}

async function handleSearch(evt) {
  evt.preventDefault();
  const searchTerm = $('#search').val();
  const response = await axios.get(`/api/cupcakes/${searchTerm}`);
  const filtered_cupcakes = response.data.cupcakes;
  console.log('filtered_cupcakes =', filtered_cupcakes);
  displayCupcakes(filtered_cupcakes);
}

$('#search-form').on('submit', handleSearch)

getDisplayCupcakes();