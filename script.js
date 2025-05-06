// HALAMAN HOME
document.addEventListener("DOMContentLoaded", function () {
  const img = new Image();
  img.src = "images/slide/slide-3.webp";

  img.onload = function () {
    const banner = document.querySelector(".banner-bg");
    banner.style.opacity = "1";
  };

  img.onerror = function () {
    console.log("Banner image failed to load");
    const banner = document.querySelector(".banner-bg");
    banner.style.backgroundImage = "none";
    banner.style.backgroundColor = "#f5f5f5";
  };
});

// HALAMAN SHOP
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const paginationContainer = document.getElementById("pagination-container");
let debounceTimeout;

const itemsPerPage = 8;
const products = document.querySelectorAll(".product-item");
const totalPages = Math.ceil(products.length / itemsPerPage);
let currentPage = 1;
const maxVisiblePages = 4;

function filterProducts(searchTerm) {
  const productItems = document.querySelectorAll(".product-item");
  let visibleCount = 0;

  productItems.forEach((item) => {
    const productName = item.dataset.name.toLowerCase();
    const isVisible = productName.includes(searchTerm.toLowerCase());

    item.style.display = isVisible ? "block" : "none";
    if (isVisible) visibleCount++;
  });

  if (searchTerm) {
    paginationContainer.style.display = "none";
  } else {
    paginationContainer.style.display = "flex";
    showPage(1);
  }

  return visibleCount;
}

searchInput.addEventListener("input", function (e) {
  const searchTerm = e.target.value.trim();

  searchClear.style.display = searchTerm ? "block" : "none";

  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    filterProducts(searchTerm);
  }, 300);
});

searchClear.addEventListener("click", function () {
  searchInput.value = "";
  this.style.display = "none";
  filterProducts("");
});

searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    filterProducts(this.value.trim());
  }
});

function updatePagination() {
  const container = document.getElementById("pagination-container");
  container.innerHTML = "";

  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const prevButton = document.createElement("button");
  prevButton.className = "page-button";
  prevButton.innerHTML = "&laquo;";
  prevButton.disabled = currentPage <= 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  };
  container.appendChild(prevButton);

  for (let i = startPage; i <= endPage; i++) {
    const button = document.createElement("button");
    button.className = `page-button ${i === currentPage ? "active" : ""}`;
    button.textContent = i;
    button.onclick = () => {
      currentPage = i;
      showPage(currentPage);
    };
    container.appendChild(button);
  }

  const nextButton = document.createElement("button");
  nextButton.className = "page-button";
  nextButton.innerHTML = "&raquo;";
  nextButton.disabled = currentPage >= totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  };
  container.appendChild(nextButton);
}

function showPage(page) {
  currentPage = page;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  products.forEach((product) => {
    product.style.display = "none";
  });

  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    products[i].style.display = "block";
  }

  updatePagination();
}

showPage(1);

// HALAMAN ABOUT
document.getElementById("menu-toggle").addEventListener("click", function () {
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenu.classList.toggle("hidden");
});

const cards = document.querySelectorAll(".about-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

cards.forEach((card) => {
  card.style.opacity = 0;
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  observer.observe(card);
});

// HALAMAN LOGIN
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    button.querySelector("svg").classList.toggle("hidden");
  });
});

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeOpen = document.querySelector(".eye-open");
  const eyeClosed = document.querySelector(".eye-closed");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClosed.classList.add("hidden");
  }
}

// HALAMAN REGISTER
document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const type =
      input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    button.querySelector("svg").classList.toggle("hidden");
  });
});

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const eyeOpen = document.querySelector(".eye-open");
  const eyeClosed = document.querySelector(".eye-closed");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    eyeOpen.classList.add("hidden");
    eyeClosed.classList.remove("hidden");
  } else {
    passwordInput.type = "password";
    eyeOpen.classList.remove("hidden");
    eyeClosed.classList.add("hidden");
  }
}

// HALAMAN KERANJANG
document.addEventListener("DOMContentLoaded", function () {
  const formatIDR = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const updateTotal = () => {
    let subtotal = 0;
    let totalItems = 0;

    document.querySelectorAll(".cart-item").forEach((item) => {
      const price = parseInt(item.querySelector(".item-price").textContent);
      const quantity = parseInt(item.querySelector(".quantity-input").value);
      subtotal += price * quantity;
      totalItems += quantity;
    });

    const shippingPerFiveItems = 20000;
    const shipping = Math.ceil(totalItems / 5) * shippingPerFiveItems;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;

    document.getElementById("subtotal").textContent = formatIDR(subtotal);
    document.getElementById("tax").textContent = formatIDR(tax);
    document.getElementById("shipping")
      ? (document.getElementById("shipping").textContent = formatIDR(shipping))
      : null;
    document.getElementById("total").textContent = formatIDR(total);
  };

  const handleQuantity = (btn, operation) => {
    const input = btn.parentElement.querySelector(".quantity-input");
    let value = parseInt(input.value);

    if (operation === "minus" && value > 1) {
      input.value = --value;
    }
    if (operation === "plus") {
      input.value = ++value;
    }

    updateTotal();
  };

  document.querySelectorAll(".quantity-minus").forEach((btn) => {
    btn.addEventListener("click", () => handleQuantity(btn, "minus"));
  });

  document.querySelectorAll(".quantity-plus").forEach((btn) => {
    btn.addEventListener("click", () => handleQuantity(btn, "plus"));
  });

  document.querySelectorAll(".quantity-input").forEach((input) => {
    input.addEventListener("change", updateTotal);
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = e.target.closest(".cart-item");
      item.classList.add("opacity-0", "transition-opacity", "duration-300");

      setTimeout(() => {
        item.remove();
        updateTotal();
        checkEmptyCart();
      }, 300);
    });
  });

  const checkEmptyCart = () => {
    if (document.querySelectorAll(".cart-item").length === 0) {
      document.querySelector("section.container").innerHTML = `
  <div class="text-center py-20">
    <svg class="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>
    <h3 class="mt-4 text-lg font-medium text-gray-900">Keranjang kosong</h3>
    <p class="mt-1 text-gray-500">Belum ada item di keranjang belanja Anda</p>
    <a href="shop.html" class="mt-6 inline-block bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800">
      Mulai Belanja
    </a>
  </div>
`;
    }
  };

  updateTotal();
});

// HALAMAN PRODUK DETAIL
function changeMainImage(thumb) {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll(".thumbnail");
  thumbnails.forEach((t) => t.classList.remove("active"));
  thumb.classList.add("active");
  mainImage.src = thumb.src;
}

function toggleZoom() {
  const image = document.getElementById("mainImage");
  image.classList.toggle("zoomed");
}

function selectSize(btn) {
  const sizeButtons = document.querySelectorAll(".size-btn");

  if (btn.classList.contains("active")) {
    btn.classList.remove("active");
  } else {
    sizeButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  }
}

function updateQuantity(change) {
  const quantityInput = document.getElementById("quantity");
  let newValue = parseInt(quantityInput.value) + change;
  newValue = Math.max(newValue, 1);
  quantityInput.value = newValue;
}

function validateQuantity() {
  const quantityInput = document.getElementById("quantity");
  if (quantityInput.value < 1) quantityInput.value = 1;
}

function addToCart() {
  const cartButton = document.getElementById("addToCart");
  const quantity = parseInt(document.getElementById("quantity").value);
  const selectedSize = document.querySelector(".size-btn.active");

  if (!selectedSize) {
    showCartNotification("Pilih ukuran terlebih dahulu!");
    return;
  }

  cartButton.classList.add("cart-added");
  setTimeout(() => {
    cartButton.classList.remove("cart-added");
  }, 500);

  const cartItem = {
    name: document.getElementById("productTitle").innerText,
    price: document.getElementById("productPrice").innerText,
    size: selectedSize.innerText,
    quantity: quantity,
    image: document.getElementById("mainImage").src,
  };

  console.log("Item added to cart:", cartItem);
  showCartNotification(`Ditambahkan ${quantity} item ke keranjang`);
}

function showCartNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg";
  notification.innerText = message;

  if (message === "Pilih ukuran terlebih dahulu!") {
    notification.className =
      "fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg";
  }

  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function loadProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    document.getElementById("productTitle").innerText =
      "Baju Koko Casual (Special Edition)";
    document.getElementById("productPrice").innerText = "Rp 175.000";
    document.getElementById("productDescription").innerText =
      "Edisi spesial dengan bahan katun organik premium dan sulaman tangan.";
  }
}

window.onload = function () {
  loadProductDetails();
};

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
