 const itemInput = document.getElementById("item-name-input");
    const priceInput = document.getElementById("item-price-input");
    const qtyInput = document.getElementById("item-qty-input-1");
    const addButton = document.getElementById("add");
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total");

    let items = [];

    function isValidItem(name, price, qty) {
      return name.trim() !== "" && !isNaN(price) && Number(price) >= 0 && Number.isInteger(qty) && qty > 0;
    }

    function renderTotal() {
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      totalEl.textContent = total;
    }

    addButton.addEventListener("click", () => {
      const itemName = itemInput.value.trim();
      const itemPrice = Number(priceInput.value);
      const itemQty = Number(qtyInput.value);

      if (!isValidItem(itemName, itemPrice, itemQty)) return;

      items.push({ name: itemName, price: itemPrice, qty: itemQty });

      const row = document.createElement("tr");
      row.setAttribute("role", "row");

      const itemCell = document.createElement("td");
      itemCell.setAttribute("role", "cell");
      itemCell.textContent = itemName;

      const priceCell = document.createElement("td");
      priceCell.setAttribute("role", "cell");
      priceCell.textContent = itemPrice;

      const qtyCell = document.createElement("td");
      qtyCell.setAttribute("role", "cell");
      qtyCell.textContent = itemQty;

      row.appendChild(itemCell);
      row.appendChild(priceCell);
      row.appendChild(qtyCell);

      cartBody.insertBefore(row, document.getElementById("total-row"));

      renderTotal();

      itemInput.value = "";
      priceInput.value = "";
      qtyInput.value = "1";
    });