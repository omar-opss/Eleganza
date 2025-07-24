const productList = document.getElementById("product-list");

function renderProducts(productsToRender) {
  productList.innerHTML = "";
  productsToRender.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$ ${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product.name + " added to cart.");
}

function applyFilters() {
  const selectedCategories = [...document.querySelectorAll(".category-filter:checked")].map(el => el.value);
  const selectedBrands = [...document.querySelectorAll(".brand-filter:checked")].map(el => el.value);

  const filtered = products.filter(p => {
    const catMatch = selectedCategories.length ? selectedCategories.includes(p.category) : true;
    const brandMatch = selectedBrands.length ? selectedBrands.includes(p.brand) : true;
    return catMatch && brandMatch;
  });

  renderProducts(filtered);
}

document.querySelectorAll(".category-filter, .brand-filter").forEach(el => {
  el.addEventListener("change", applyFilters);
});

renderProducts(products);