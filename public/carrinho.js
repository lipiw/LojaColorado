if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removerCarrinho = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removerCarrinho.length; i++) {
        var button = removerCarrinho[i]
        button.addEventListener('click', removaCar)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var adicionarCarrinho = document.getElementsByClassName('btn')
    for (var i = 0; i < adicionarCarrinho.length; i++) {
        var button = adicionarCarrinho[i]
        button.addEventListener('click', adicionarParaCarrinho)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', compraFinalizada)
}

function compraFinalizada() {
    alert('Obrigado pela compra!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    atualizarTotal()
}

function removaCar(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    atualizarTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    atualizarTotal()
}

function adicionarParaCarrinho(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('title')[0].innerText
    var preco = shopItem.getElementsByClassName('preco')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    addItemToCart(title, preco, imageSrc)
    atualizarTotal()
}

function addItemToCart(title, preco, imageSrc) {
    var carrinho = document.createElement('div')
    carrinho.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Esse item ja foi adicionado no carrinho!')
            return
        }
    }
    var cervejasCarrinho = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-preco cart-column">${preco}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVER</button>
        </div>`
    carrinho.innerHTML = cervejasCarrinho
    cartItems.append(carrinho)
    carrinho.getElementsByClassName('btn-danger')[0].addEventListener('click', removaCar)
    carrinho.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function atualizarTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var carrinhos = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < carrinhos.length; i++) {
        var carrinho = carrinhos[i]
        var precoElement = carrinho.getElementsByClassName('cart-preco')[0]
        var quantityElement = carrinho.getElementsByClassName('cart-quantity-input')[0]
        var preco = parseFloat(precoElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (preco * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}