// Sidebar toggle
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('show');
});

// Theme toggle
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// Product loader
let products = [];
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

// Fetch and display products
fetch('products.json')
  .then((res) => res.json())
  .then((data) => {
    products = data;
    displayProducts(products);
  });

function displayProducts(data) {
  productList.innerHTML = '';
  data.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₵${product.price}</p>
      <button>Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

// Filters
searchInput.addEventListener('input', applyFilters);
priceRange.addEventListener('input', () => {
  priceValue.textContent = priceRange.value;
  applyFilters();
});

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const maxPrice = parseInt(priceRange.value);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    p.price <= maxPrice
  );

  displayProducts(filtered);
}
