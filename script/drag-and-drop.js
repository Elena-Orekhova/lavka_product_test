let cartItems = [];

// Разрешить перетаскивание над корзиной
function allowDrop(event) {
  event.preventDefault();
}

// Получаем данные о продукте при сбросе
function drop(event) {
  event.preventDefault();

  // Для мыши
  const productName = event.dataTransfer.getData("text");
  const productImage = event.dataTransfer.getData("image");

  if (!cartItems.some((item) => item.name === productName)) {
    addToCart(productName, productImage);

    const draggedItem = document.querySelector(
      `[data-product="${productName}"]`
    );
    if (draggedItem) {
      draggedItem.style.visibility = "hidden";
    }
  }
}

// Обработчик событий для продуктов
document.querySelectorAll(".main__products_item").forEach((item) => {
  // Обработчик для начала перетаскивания
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text", item.dataset.product);
    event.dataTransfer.setData("image", item.querySelector("img").src);
  });

  // Обработчик для касания
  item.addEventListener("touchstart", (event) => {
    event.preventDefault();
    const productName = item.dataset.product;
    const productImage = item.querySelector("img").src;

    if (!cartItems.some((cartItem) => cartItem.name === productName)) {
      addToCart(productName, productImage);
      item.style.visibility = "hidden";
    }
  });
});

// Добавляем товар в корзину
function addToCart(productName, productImage) {
  cartItems.push({ name: productName, image: productImage });
  updateCartCount();
  displayCartItems();
}

// Обновляем количество товаров в корзине
function updateCartCount() {
  const cartItemsCount = document.getElementById("cartItemsCount");
  cartItemsCount.textContent = `${cartItems.length} items`;

  const payButton = document.getElementById("payButton");
  payButton.style.display = cartItems.length >= 3 ? "block" : "none";
}

// Отображаем товары в корзине с наложением
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  cartItemsContainer.innerHTML = "";

  let container = createNewContainer();
  cartItemsContainer.appendChild(container);

  cartItems.forEach((item, index) => {
    const itemContainer = document.createElement("div");
    itemContainer.classList.add("cart-item");

    const offset = (index % 4) * 6;
    itemContainer.style.left = `${offset}vh`;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;

    itemContainer.appendChild(img);
    container.appendChild(itemContainer);
  });
}

// Создаем новый контейнер для товаров
function createNewContainer() {
  const newContainer = document.createElement("div");
  newContainer.classList.add("cart-container");

  newContainer.style.position = "absolute";
  newContainer.style.bottom = "0";

  return newContainer;
}

// Событие для кнопки оплаты
document.getElementById("payButton").addEventListener("click", () => {
  window.open("https://lavka.yandex.ru/", "_blank");
});
