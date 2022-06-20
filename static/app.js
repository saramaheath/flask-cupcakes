"use strict";

/** gets list of cupcake objects, converts to html, 
 * adds to ordered list on cupcake-app.html*/
async function getCupcakes() {
    $('#cupcake-list').empty()
  const response = await axios.get("/api/cupcakes");
  console.log(response, "response");
  const cupcakes = response.data.cupcakes;
  console.log(cupcakes);
  const cupcakeLis = cupcakes.map((cupcake) => createCupcakeLi(cupcake));

  for (let cupcakeLi of cupcakeLis) {
    $("#cupcake-list").append(cupcakeLi);
  }
}

/** takes an object, returns html*/
function createCupcakeLi({flavor, size, rating, image, id}) {
//   const flavor = cupcake.flavor;
//   const size = cupcake.size;
//   const rating = cupcake.rating;
//   const image = cupcake.image;

  return $(`<li id="cupcake-${id}">
    <p>${flavor}, ${size}, ${rating}</p>
    <img src="${image}" width="200px">
</li>`);
}

/** gets form data, makes post request to api, adds new cupcake
 * and updates unordered list of cupcakes
*/
async function addCupcake() {
    console.log('addcupcake runs')
  const flavor = $("#flavor").val();
  const size = $("#size").val();
  const rating = $("#rating").val();
  const image = $("#image").val();

  const cupcake = await axios.post(
    "/api/cupcakes",
    { flavor, size, rating, image }
  );

  getCupcakes();

}

getCupcakes();