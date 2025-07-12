let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const wishlistContainer = document.getElementById("wishlist-items");
const alertBox = document.getElementById("alert");

function renderWishlist() {
  wishlistContainer.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
    return;
  }

  wishlist.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("wishlist-item");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₵${item.price}</p>
      <div class="wishlist-actions">
        <button class="move-to-cart" data-index="${index}">Add to Cart</button>
        <button class="remove-btn" data-index="${index}">Remove</button>
      </div>
    `;
    wishlistContainer.appendChild(div);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      wishlist.splice(i, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
      showAlert("Removed from Wishlist");
    });
  });

  document.querySelectorAll(".move-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = btn.dataset.index;
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      const product = wishlist[i];
      const cartIndex = cart.findIndex(p => p.id === product.id);
      if (cartIndex > -1) {
        cart[cartIndex].quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      wishlist.splice(i, 1);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      renderWishlist();
      showAlert("Moved to Cart");
    });
  });
}

function showAlert(message) {
  alertBox.textContent = message;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

renderWishlist();
