function getUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const regex = /([^&=]+)=([^&]*)/g;
    let m;

    while (m = regex.exec(queryString)) {
        params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return params;
}


function addItemToOrder(item, preco) {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    order.push({ item, preco });
    localStorage.setItem('order', JSON.stringify(order));
}


function displayOrder() {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    const lista = document.getElementById('lista-pedido');
    lista.innerHTML = '';

    order.forEach((pedido, index) => {
        const item = pedido.item;
        const preco = parseFloat(pedido.preco).toFixed(2);
        lista.innerHTML += `
            <li class="list-group-item">
                ${item} - R$ ${preco}
                <a href="#" class="btn btn-danger btn-sm float-end" onclick="removeItem(${index})">Excluir</a>
            </li>
        `;
    });
}


function removeItem(index) {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    order.splice(index, 1); 
    localStorage.setItem('order', JSON.stringify(order));
    displayOrder(); 
}

window.onload = displayOrder;


function addOrderItemFromParams() {
    const params = getUrlParams();
    const item = params.item;
    const preco = parseFloat(params.preco).toFixed(2);

    if (item && preco) {
        addItemToOrder(item, preco);
    }
}

window.onload = () => {
    displayOrder();
    addOrderItemFromParams();
};
