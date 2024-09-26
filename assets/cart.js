function verificaCos() {
    let cos = JSON.parse(localStorage.getItem('cos')) || [];

    if (cos.length === 0) {
        notifcos.style.display = "none";
    } else {
        notifcos.style.display = "block";
    }
}
function afiseazaCos() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    let cos = JSON.parse(localStorage.getItem('cos')) || [];

    if (cos.length === 0) {
        cartContainer.innerHTML = '<p>Coșul este gol.</p>';
        totalPriceElement.innerText = '0';
        return;
    }

    let total = 0;
    let cartHTML = '';

    cos.forEach(produs => {
        const subtotal = produs.pret * produs.cantitate;
        total += subtotal;

        cartHTML += `
    <div class="col-md-12 mb-2">
        <div class="card text-dark">
            <div class="row g-0">
                <div class="col-md-4">
                <img src="${produs.imagine}" class="img-fluid rounded-start img-fix" alt="${produs.nume}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${produs.nume}</h5>
                    <p class="card-text">Preț: ${produs.pret} RON</p>
                    <p class="card-text">Cantitate: ${produs.cantitate}</p>
                    <p class="card-text">Subtotal: ${subtotal} RON</p>
                    <button class="btn btn-danger remove-from-cart" data-id="${produs.id}">Elimină</button>
                </div>
            </div>
        </div>
    </div>  
</div>
 
        `;
    });

    cartContainer.innerHTML = cartHTML;
    totalPriceElement.innerText = total;


    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    removeFromCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            eliminaDinCos(productId);
        });
    });
    verificaCos();
}

function eliminaDinCos(productId) {
    let cos = JSON.parse(localStorage.getItem('cos')) || [];

    const noulCos = cos.filter(produs => produs.id != productId);

    if (noulCos.length === cos.length) {
        console.error('Produsul nu a fost găsit în coș pentru eliminare.');
        return;
    }

    localStorage.setItem('cos', JSON.stringify(noulCos));
    afiseazaCos();
    verificaCos();
}


document.getElementById('checkout-btn').addEventListener('click', function () {
    alert('Comanda ta a fost finalizată!');
    localStorage.removeItem('cos');
    afiseazaCos();
    verificaCos();
});


afiseazaCos();
verificaCos();
