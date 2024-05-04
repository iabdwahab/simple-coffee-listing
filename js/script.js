fetchData();

function fetchData() {
  fetch('./data.json')
  .then(res => res.json())
  .then(products => { 
    const filter = document.querySelector('.button--active').dataset.filter;

    let productsHTML = '';

    products.forEach(product => {
      const productHTMLTemplate = `
        <div class="product">
          <div class="product__img-container">
            ${product.popular ? '<p class="product__popular">Popular</p>' : ''}
            <img src="${product.image}" alt="Image" class="product__img">
          </div>

          <div class="product__info">
            <div class="product__name-price">
              <p class="product__name">${product.name}</p>
              <p class="product__price">${product.price}</p>
            </div>

            <div class="product__rating-sold">
              <div class="product__rating-container">
                <img src="assets/imgs/Star${product.rating ? '_fill' : ''}.svg" alt="star">
                <p class="product__rate">${product.rating || ''}</p>
                <p class="product__votes">${product.votes ? `(${product.votes} votes)` : 'No ratings'}</p>
              </div>
              
              ${!product.available ? '<p class="product-sold">Sold out</p>' : ''}
            </div>
          </div>
        </div>
      `;

      if (filter === 'all') {
        productsHTML += productHTMLTemplate;
      } else {

        if (product.available) {
          productsHTML += productHTMLTemplate;
        }

      } 
    });
  
    document.querySelector('.products-content').innerHTML = productsHTML;
  });
}

const btns = document.querySelectorAll('.button');

btns.forEach(btn => {
  btn.addEventListener('click', e => {
    
    // Remove .button--active className
    document.querySelector('.button--active').classList.remove('button--active');

    // Add button--active classname to selected element
    e.target.classList.add('button--active')

    fetchData();
  })
})