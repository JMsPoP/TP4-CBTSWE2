const apiUrl = "https://localhost:7182/api/Products";

async function carregarProdutos() {
    const resp = await fetch(apiUrl);
    const produtos = await resp.json();

    const tbody = document.getElementById("productsTable");
    tbody.innerHTML = "";

    produtos.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.name}</td>
            <td>${p.description}</td>
            <td>${p.price}</td>
            <td>${p.stockQuantity}</td>
            <td>
                <button onclick="editar(${p.id})">Editar</button>
                <button onclick="deletar(${p.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("productId").value;
    const produto = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        price: parseFloat(document.getElementById("price").value),
        stockQuantity: parseInt(document.getElementById("stockQuantity").value)
    };

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: parseInt(id), ...produto })
        });
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        });
    }

    document.getElementById("productForm").reset();
    carregarProdutos();
});

async function editar(id) {
    const resp = await fetch(`${apiUrl}/${id}`);
    const p = await resp.json();

    document.getElementById("productId").value = p.id;
    document.getElementById("name").value = p.name;
    document.getElementById("description").value = p.description;
    document.getElementById("price").value = p.price;
    document.getElementById("stockQuantity").value = p.stockQuantity;
}

async function deletar(id) {
    if (confirm("Deseja realmente deletar este produto?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        carregarProdutos();
    }
}

// Carregar produtos ao abrir a página
carregarProdutos();
