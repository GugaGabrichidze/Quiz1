const productsData = [
  { id: "1", name: "ტელეფონი", price: 1200, img: "phone.jpg" },
  { id: "2", name: "ლეპტოპი", price: 2500, img: "laptop.jpg" },
  { id: "3", name: "ყურსასმენი", price: 300, img: "headphone.jpg" },
  { id: "4", name: "საათი", price: 500, img: "watch.jpg" },
];

let cart = [];

const productsContainer = document.getElementById("products-container");
const cartList = document.getElementById("cart-list");
const totalPriceElement = document.getElementById("total-price");
const totalCountElement = document.getElementById("total-count");
const filterInput = document.getElementById("filter-input");

function displayProducts(productsToDisplay) {
  productsContainer.innerHTML = "";

  productsToDisplay.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info">
                <span>${product.name}</span>
                <strong>${product.price}₾</strong>
            </div>
            <button class="add-btn" onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
    productsContainer.appendChild(card);
  });
}

function addToCart(id) {
  const product = productsData.find((p) => p.id === id);
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(id) {
  const itemIndex = cart.findIndex((item) => item.id === id);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  renderCart();
}

function renderCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;
  let totalCount = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
            <div>
                <strong>${item.name}</strong> (x${item.quantity})<br>
                <small>${item.price * item.quantity}₾</small>
            </div>
            <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
        `;
    cartList.appendChild(li);

    totalPrice += item.price * item.quantity;
    totalCount += item.quantity;
  });

  totalPriceElement.textContent = totalPrice;
  totalCountElement.textContent = totalCount;
}

filterInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = productsData.filter((product) =>
    product.name.toLowerCase().includes(query),
  );
  displayProducts(filtered);
});

displayProducts(productsData);
