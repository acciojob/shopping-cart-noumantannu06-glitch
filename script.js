const itemInput = document.getElementById("item-name-input");
    const priceInput = document.getElementById("item-price-input");
    const addButton = document.getElementById("add");
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total");

    let grandTotal = 0;
    let count = 0;

    function isValidItem(name, price) {
      return name.trim() !== "" && !isNaN(price) && Number(price) >= 0;
    }

    addButton.addEventListener("click", () => {
      const itemName = itemInput.value.trim();
      const itemPrice = Number(priceInput.value);

      if (!isValidItem(itemName, itemPrice)) return;

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

      const qtyInput = document.createElement("input");
      qtyInput.type = "number";
      qtyInput.min = "1";
      qtyInput.value = "1";
      qtyInput.id = `item-qty-input-${++count}`;

      qtyInput.addEventListener("input", () => {
        const qty = Number(qtyInput.value);
        if (!Number.isFinite(qty) || qty < 1) {
          qtyInput.value = "1";
        }
        recalculateTotal();
      });

      qtyCell.appendChild(qtyInput);

      row.appendChild(itemCell);
      row.appendChild(priceCell);
      row.appendChild(qtyCell);

      cartBody.insertBefore(row, document.getElementById("total-row"));

      grandTotal += itemPrice;
      totalEl.textContent = grandTotal;

      itemInput.value = "";
      priceInput.value = "";
    });

    function recalculateTotal() {
      let total = 0;
      const rows = Array.from(cartBody.querySelectorAll("tr")).filter(
        (tr) => tr.id !== "total-row"
      );

      rows.forEach((row) => {
        const price = Number(row.children[1].textContent);
        const qtyInput = row.querySelector('input[type="number"]');
        const qty = Number(qtyInput.value) || 1;
        total += price * qty;
      });

      totalEl.textContent = total;
      grandTotal = total;
    }