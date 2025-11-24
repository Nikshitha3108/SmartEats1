// restaurants.js
import { getSession } from './api.js';

const RESTAURANTS = [
    {
        id: 1,
        name: "Pizza Palace",
        img: "images/restaurant1.jpg",
        desc: "Pizza, Italian",
        time: "30 mins",
        rating: "4.5",
        discount: "30% OFF"
    },
    {
        id: 2,
        name: "Biryani Hub",
        img: "images/restaurant2.jpg",
        desc: "Biryani, Indian",
        time: "35 mins",
        rating: "4.2",
        discount: "FLAT ₹80 OFF"
    },
    {
        id: 3,
        name: "Burger Town",
        img: "images/restaurant3.jpg",
        desc: "Burgers, Fast Food",
        time: "22 mins",
        rating: "4.1",
        discount: "20% OFF"
    },
    {
        id: 4,
        name: "Southern Spice",
        img: "images/restaurant4.jpg",
        desc: "South Indian",
        time: "20 mins",
        rating: "4.6",
        discount: "15% OFF"
    }
];

export function renderRestaurants() {
    const grid = document.getElementById("restGrid");
    grid.innerHTML = "";

    RESTAURANTS.forEach(r => {
        const div = document.createElement("div");
        div.className = "rest-card";

        div.onclick = () => {
            localStorage.setItem("selectedRestaurant", JSON.stringify(r));
            window.location.href = "menu.html";
        };

        div.innerHTML = `
            <img src="${r.img}">
            <div class="discount-tag">${r.discount}</div>
            <div class="rest-info">
                <h3>${r.name}</h3>
                <p>${r.desc}</p>
                <div class="rest-meta">
                    <div class="rating-badge">${r.rating} ★</div>
                    <div>${r.time}</div>
                </div>
            </div>
        `;

        grid.appendChild(div);
    });
}
