// menu.js
import { getSession, get, save } from './api.js';

const SAMPLE_MENU = [
    { id: 1, name: "Margherita Pizza", price: 199, img: "images/pizza.jpg" },
    { id: 2, name: "Chicken Biryani", price: 249, img: "images/biryani.jpg" },
    { id: 3, name: "Veg Burger", price: 129, img: "images/burger.jpg" },
    { id: 4, name: "Masala Dosa", price: 99, img: "images/dosa.jpg" }
];

export function loadMenu() {
    const rest = JSON.parse(localStorage.getItem("selectedRestaurant"));
    if (!rest) window.location.href = "restaurants.html";

    document.getElementById("restName").innerText = rest.name;

    const list = document.getElementById("menuList");

    SAMPLE_MENU.forEach(item => {
        const div = document.createElement("div");
        div.className = "menu-item";

        div.innerHTML = `
            <img src="${item.img}">
            <div class="menu-meta">
                <h4>${item.name}</h4>
                <p>₹${item.price}</p>
            </div>
            <div class="price-button">
                <button class="btn" onclick='addToCart(${JSON.stringify(item)})'>Add</button>
            </div>
        `;

        list.appendChild(div);
    });
}

window.addToCart = (item) => {
    const cart = get("cart") || [];
    cart.push(item);
    save("cart", cart);
    alert("Added to cart!");
};
