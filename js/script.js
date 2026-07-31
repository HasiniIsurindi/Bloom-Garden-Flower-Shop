// Bloom Garden Flower Shop
// Cart functionality using Local Storage


// Get cart from local storage

let cart = JSON.parse(localStorage.getItem("cart")) || [];



// Add product to cart

function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);


    if(existingProduct){

        existingProduct.quantity += 1;

    }else{

        cart.push({

            name: name,
            price: price,
            quantity: 1

        });

    }


    saveCart();


    alert(name + " added to cart!");

}




// Save cart

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}



// Update cart badge

function updateCartCount(){

    let count = 0;


    cart.forEach(item => {

        count += item.quantity;

    });


    let cartCount = document.getElementById("cart-count");


    if(cartCount){

        cartCount.innerHTML = count;

    }

}



// Display cart items

function displayCart(){


    let cartItems = document.getElementById("cart-items");


    let totalElement = document.getElementById("cart-total");


    if(!cartItems){

        return;

    }



    cartItems.innerHTML = "";

    let total = 0;



    if(cart.length === 0){


        cartItems.innerHTML = `

        <tr>

        <td colspan="5" class="text-center">

        Your cart is empty

        <br>

        <a href="flowers.html"
        class="btn btn-danger mt-3">

        Shop Flowers

        </a>

        </td>

        </tr>

        `;


        if(totalElement){

            totalElement.innerHTML = 0;

        }


        return;

    }



    cart.forEach((item,index)=>{


        let subtotal =
        item.price * item.quantity;


        total += subtotal;



        cartItems.innerHTML += `


        <tr>


        <td>

        ${item.name}

        </td>



        <td>

        Rs. ${item.price.toLocaleString()}

        </td>



        <td>


        <button class="quantity-btn"
        onclick="changeQuantity(${index},-1)">
        -
        </button>


        <span class="mx-2">

        ${item.quantity}

        </span>


        <button class="quantity-btn"
        onclick="changeQuantity(${index},1)">
        +
        </button>


        </td>



        <td>

        Rs. ${subtotal.toLocaleString()}

        </td>



        <td>

        <button class="remove-btn"
        onclick="removeItem(${index})">

        Remove

        </button>

        </td>


        </tr>


        `;


    });



    if(totalElement){

        totalElement.innerHTML =
        total.toLocaleString();

    }


}




// Change quantity

function changeQuantity(index, change){


    cart[index].quantity += change;



    if(cart[index].quantity <= 0){

        cart.splice(index,1);

    }



    saveCart();


    displayCart();


}





// Remove item

function removeItem(index){


    cart.splice(index,1);


    saveCart();


    displayCart();


}





// Clear cart

function clearCart(){


    if(confirm("Remove all items from cart?")){


        cart = [];


        saveCart();


        displayCart();


    }


}





// Checkout

function checkout(){


    if(cart.length === 0){


        alert("Your cart is empty!");

        return;

    }



    alert(
        "Thank you for your order! 🌸\n\n" +
        "Your flowers will be delivered soon."
    );



    cart = [];


    saveCart();


    displayCart();


}




// Contact form

function sendMessage(event){


    event.preventDefault();


    alert(
        "Thank you for contacting Bloom Garden!\n" +
        "We will reply soon."
    );


    event.target.reset();


}





// Run when page loads

document.addEventListener(
"DOMContentLoaded",
function(){

    updateCartCount();

    displayCart();

});