function createHTML(cupcake) {
    return `
        <li>
            <p>${cupcake.flavor}</p>
            <p>${cupcake.size}</p>
            <p>${cupcake.rating}</p>
            <img src="${cupcake.image}" alt="Image of ${cupcake.flavor}">
        </li>
    `;
}
    

async function showCupcakes() {
    const response = await axios.get('http://localhost:5000/api/cupcakes');

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(createHTML(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
}

$('#new-cupcake-form').on("submit", async function(evt) {
    evt.preventDefault();

    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let rating = $('#rating').val();
    let image = $('#image').val();

    const response = await axios.post('http://localhost:5000/api/cupcakes', {
        flavor,
        size,
        rating,
        image
    });

    let newCupcake = $(createHTML(response.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");

});
    

showCupcakes();