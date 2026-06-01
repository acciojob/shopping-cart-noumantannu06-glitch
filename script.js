 const itemInput = document.getElementById("item-name-input");
    const priceInput = document.getElementById("item-price-input");
    const qtyInput = document.getElementById("item-qty-input-1");
    const addButton = document.getElementById("add");
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total");

    const items = [];

    function isValidItem(name, price, qty) {
      return name.trim() !== "" && !isNaN(price) && price >= 0 && Number.isInteger(qty) && qty > 0;
    }

    function renderTotal() {
      const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
      totalEl.textContent = total;
    }

    function addToCart() {
      const name = itemInput.value.trim();
      const price = Number(priceInput.value);
      const qty = Number(qtyInput.value);

      if (!isValidItem(name, price, qty)) return;

      items.push({ name, price, qty });

      const row = document.createElement("tr");
      row.setAttribute("role", "row");

      const nameCell = document.createElement("td");
      nameCell.setAttribute("role", "cell");
      nameCell.textContent = name;

      const priceCell = document.createElement("td");
      priceCell.setAttribute("role", "cell");
      priceCell.textContent = price;

      const qtyCell = document.createElement("td");
      qtyCell.setAttribute("role", "cell");
      qtyCell.textContent = qty;

      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(qtyCell);

      cartBody.insertBefore(row, document.getElementById("total-row"));

      renderTotal();

      itemInput.value = "";
      priceInput.value = "";
      qtyInput.value = "1";
    }

    addButton.addEventListener("click", addToCart);
    qtyInput.addEventListener("input", () => {
      const v = Number(qtyInput.value);
      if (!Number.isFinite(v) || v < 1) qtyInput.value = "1";
    });