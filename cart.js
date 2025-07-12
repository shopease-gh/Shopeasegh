let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.getElementById("cart-items");
const subtotalEl = document.getElementById("subtotal");
const locationInput = document.getElementById("location");
const paymentSelect = document.getElementById("payment");
const submitBtn = document.getElementById("submit-order");
const alertBox = document.getElementById("alert");

function renderCart() {
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let subtotal = 0;

  cartItems.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const totalPrice = item.price * quantity;
    subtotal += totalPrice;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>₵${item.price} × ${quantity} = ₵${totalPrice}</p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartList.appendChild(div);
  });

  subtotalEl.textContent = subtotal;

  // Attach remove buttons
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      renderCart(); // refresh cart
    });
  });
}

function showAlert(msg = "Order submitted!") {
  alertBox.textContent = msg;
  alertBox.classList.add("show");

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 2000);
}

submitBtn.addEventListener("click", () => {
  const location = locationInput.value.trim();
  const payment = paymentSelect.value;

  if (!location || !payment || cartItems.length === 0) {
    showAlert("Please complete all fields.");
    return;
  }

  const order = {
    id: Date.now(),
    items: cartItems,
    location,
    payment,
    status: "Pending"
  };

  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.removeItem("cart");

  showAlert("Order submitted successfully!");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2500);
});

renderCart();
