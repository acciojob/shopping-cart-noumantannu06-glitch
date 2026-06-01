//your code here
const itemInput = document.getElementById("item-name-input");
    const priceInput = document.getElementById("item-price-input");
    const addButton = document.getElementById("add");
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total");

    let grandTotal = 0;

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

      cartBody.insertBefore(row, cartBody.lastElementChild);
      row.appendChild(itemCell);
      row.appendChild(priceCell);

      grandTotal += itemPrice;
      totalEl.textContent = grandTotal;

      itemInput.value = "";
      priceInput.value = "";
    });
