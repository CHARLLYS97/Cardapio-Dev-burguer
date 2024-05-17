const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemsContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("adress-warn")

let cart = [];

// Abrir o modal do carrinho 
cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
    updateCartModal();
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function (event) {
    //console.log(event.target)

    let parentbutton = event.target.closest(".add-to-cart-btn")

    if (parentbutton) {
        const name = parentbutton.getAttribute("data-name")
        const price = parseFloat(parentbutton.getAttribute("data-price"))

        addToCart(name, price)
    }

})


// Função para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        //Se o item já existe, aumenta apenas a quantidade + 1 
        existingItem.quantity += 1;

    } else {

        cart.push({
            name,
            price,
            quantity: 1,
        })

    }

    updateCartModal()

}


// Atualizar o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemElement.innerHTML = `
   <div class="flex items-center justify-between"> 
     <div> 
    <p class="font-medium">${item.name}</p>
    <p>Qtd: ${item.quantity}</p>
    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>  
     </div>
   </div>

    <button>
         Remover       
    </button>
     
   `

        total += item.price * item.quantity;
        
        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("PT-BR",{
    style: "currency",
    currency: "BRL"    
    });

    cartCounter.innerHTML = cart.length;

}