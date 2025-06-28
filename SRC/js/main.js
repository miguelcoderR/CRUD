const products = {};
const productsSet = new Set();

document.getElementById("Product form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value);

  if (!name || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
    alert("Por favor, completa correctamente todos los campos.");
    return;
  }

  const nameExists = Object.values(products).some(p => p.name.toLowerCase() === name.toLowerCase());
  if (nameExists) {
    alert("This product already exists. Duplicates are not allowed.");
    return;
  }

  const id = Date.now();
  const newproduct = { id, name: name, price: price, quantity: quantity };
  const Setkey = JSON.stringify(newproduct);

  productsSet.add(Setkey);
  products[`prod${id}`] = newproduct;

  showresults();
  this.reset();
});

function showresults() {
  const exit = document.getElementById("results");
  exit.innerHTML = "<h3>📦 Registered products</h3>";

  for (const key in products) {
    const p = products[key];
    exit.innerHTML += `
      <div class="product">
        <strong>${p.name}</strong><br>
        Price: $${p.price}<br>
        quantity: ${p.quantity}<br>
        <button onclick="editproduct('${key}')">✏️ Edit</button>
        <button onclick="deleteProduct('${key}')">🗑️ Delete</button>
      </div>`;
  }
}

function editProduct(key) {
  const p = products[key];
  const newname = prompt("new name:", p.name);
  const newprice = parseFloat(prompt("new price:", p.price));
  const newquantity = parseInt(prompt("new quantify:", p.quantity));

  if (!newname || isNaN(newprice) || newprice < 0 || isNaN(newquantity) || newquantity < 0) {
    alert("Invalid values.");
    return;
  }

  const existsName = Object.values(products).some(
    prod => prod.name.toLowerCase() === newname.toLowerCase() && prod.id !== p.id
  );
  if (existsName) {
    alert("There is already a product with that name.");
    return;
  }

  p.name = newname;
  p.price = newprice;
  p.quantity = newquantity;

  showresults();
}

function deleteproduct(key) {
  if (confirm("¿Are you sure you want to delete this product?")) {
    const prod = products[key];
    delete products[key];

    for (let item of productsSet) {
      const obj = JSON.parse(item);
      if (obj.id === prod.id) {
        productsSet.delete(item);
        break;
      }
    }

    showresults();
  }
}