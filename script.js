const notifcos = document.getElementById('notifcos');
function verificaCos() {
        
        let cos = JSON.parse(localStorage.getItem('cos')) || [];
    
        if (cos.length === 0) {
            notifcos.style.display="none";
        } else {
            notifcos.style.display="block";
        }
    }
function afiseazaProduse(produse) {
    const productContainer = document.getElementById('product-container');
    let productCardsHTML = ''; 

    produse.forEach((produs) => {
        const disponibilitate = produs.stoc > 0 ? ` În stoc` : 'Indisponibil';
        const descriereLimitata = produs.descriere.length > 50 
            ? produs.descriere.substring(0, 50) + "..." 
            : produs.descriere;

        const productCard = `
            <div class=" col-xl-3 col-lg-4 col-md-6 col-sm-12 mt-2">
                <div class="card" style="width: 18rem;">
                    <img src="${produs.imagine}" class="card-img-top img-fix" alt="${produs.nume}" onerror="this.src='fallback-image.jpg';">
                    <div class="card-body">
                        <h5 class="card-title">${produs.nume}</h5>
                        <p class="card-text">${descriereLimitata}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Preţ: ${produs.pret} RON</li>
                        <li class="list-group-item">${disponibilitate}</li>
                    </ul>
                    <div class="card-body">
                        <div class="mb-3">
                            <label for="cantitate-${produs.id}" class="form-label">Cantitate</label>
                            <input type="number" class="form-control cantitate-input" id="cantitate-${produs.id}" value="1" min="1" max="${produs.stoc}" ${produs.stoc === 0 ? 'disabled' : ''}>
                        </div>
                        <button class="btn btn-primary add-to-cart" data-id="${produs.id}" ${produs.stoc === 0 ? 'disabled' : ''}>Adaugă în coș</button>
                    </div>
                </div>
            </div>
        `;

        productCardsHTML += productCard; 
    });

    productContainer.innerHTML = productCardsHTML; 

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            const cantitateInput = document.querySelector(`#cantitate-${productId}`).value;
            adaugaInCos(productId, parseInt(cantitateInput));
        });
    });
    verificaCos();
    function adaugaInCos(productId, cantitate) {
        let cos = JSON.parse(localStorage.getItem('cos')) || [];
        
        
        const produsExist = cos.find(produs => produs.id === productId);
        if (produsExist) {
           
            const produsDeAdaugat = produse.find(produs => produs.id == productId);
            if (produsExist.cantitate + cantitate > produsDeAdaugat.stoc) {
                alert('Cantitatea selectată depășește stocul disponibil.');
            } else {
                produsExist.cantitate += cantitate;
            }
        } else {
           
            const produsDeAdaugat = produse.find(produs => produs.id == productId);
            cos.push({
                id: produsDeAdaugat.id,
                imagine: produsDeAdaugat.imagine,
                nume: produsDeAdaugat.nume,
                pret: produsDeAdaugat.pret,
                cantitate: cantitate
            });
            verificaCos();
        }

        
        localStorage.setItem('cos', JSON.stringify(cos));
    }
}

fetch('assets/produse.json')
    .then(response => response.json())
    .then(data => {
        afiseazaProduse(data.produse);
    })
    .catch(error => console.error('Eroare la încărcarea produselor:', error.message));
    