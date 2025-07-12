// === Sidebar Toggle ===
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menu-toggle');

menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
    sidebar.classList.remove('show');
  }
});

// === Theme Toggle ===
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
});

// === Product Variables ===
let products = [];
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('search-input');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');

// === Load Product Data ===
fetch('products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  })
  .catch(err => {
    console.error('Error loading products:', err);
  });

// === Render Products ===
function displayProducts(data) {
  productList.innerHTML = '';

  data.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₵${product.price}</p>
      <div class="product-actions">
        <button class="cart-btn" data-id="${product.id}">Add to Cart 🛒</button>
        <button class="wishlist-btn" data-id="${product.id}">Wishlist ❤️</button>
      </div>
    `;

    productList.appendChild(card);
  });

  attachActionListeners(); // important: reattach events after rendering
}

// === Filters ===
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

// === Local Storage Helpers ===
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToStorage(key, product) {
  const current = getStorage(key);

  if (key === "cart") {
    const index = current.findIndex(item => item.id === product.id);

    if (index > -1) {
      current[index].quantity += 1;
    } else {
      product.quantity = 1;
      current.push(product);
    }

    localStorage.setItem(key, JSON.stringify(current));
    showAlert("Added to Cart 🛒");

  } else if (key === "wishlist") {
    const exists = current.some(item => item.id === product.id);

    if (!exists) {
      current.push(product);
      localStorage.setItem(key, JSON.stringify(current));
      showAlert("Added to Wishlist ❤️");
    } else {
      showAlert("Already in Wishlist ⚠️");
    }
  }
}


// === Alert Popup ===
function showAlert(msg = 'Item added!') {
  const alertBox = document.getElementById('alert');
  alertBox.textContent = msg;
  alertBox.classList.add('show');

  setTimeout(() => {
    alertBox.classList.remove('show');
  }, 2000);
}

// === Button Listeners ===
function attachActionListeners() {
  document.querySelectorAll('.cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) saveToStorage('cart', product);
    });
  });

  document.querySelectorAll('.wishlist-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const product = products.find(p => p.id === id);
      if (product) saveToStorage('wishlist', product);
    });
  });
}
