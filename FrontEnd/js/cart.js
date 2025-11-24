// cart.js
import { get, save, getSession } from './api.js';

/* CART PAGE */
export function loadCart() {
    const box = document.getElementById("cartItems");
    const totalBox = document.getElementById("cartTotal");

    const cart = get("cart") || [];
    box.innerHTML = "";

    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <span>${item.name}</span>
            <span>₹${item.price}</span>
        `;
        box.appendChild(div);
    });

    totalBox.innerText = "₹" + total;
}

/* CART PREVIEW */
export function renderCartPreview() {
    // Already built into the UI; optional enhancement.
}

/* CHECKOUT */
export function checkoutOrder() {
    const session = getSession();
    if (!session) {
        alert("Login first!");
        return;
    }

    const cart = get("cart") || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    const total = cart.reduce((sum, i) => sum + i.price, 0);

    const restaurant = JSON.parse(localStorage.getItem("selectedRestaurant"));

    const orders = get("orders") || [];
    const newOrder = {
        id: Date.now(),
        items: cart,
        total,
        customerEmail: session.email,
        restaurantEmail: restaurant?.email || "restaurant@example.com",
        assignedDeliveryEmail: null,
        status: "Pending"
    };

    orders.push(newOrder);
    save("orders", orders);

    save("cart", []);

    alert("Order placed!");
    window.location.href = "orders.html";
}

/* LOAD ORDERS */
export function loadOrders() {
    const session = getSession();
    const orders = get("orders") || [];

    const mine = orders.filter(o => o.customerEmail === session.email);
    const box = document.getElementById("ordersList");

    mine.forEach(o => {
        const div = document.createElement("div");
        div.className = "order-card";

        div.innerHTML = `
            <strong>Order #${o.id}</strong>
            <p>Total: ₹${o.total}</p>
            <p>Status: ${o.status}</p>

            <button class="btn secondary" onclick="track(${o.id})">
                Track Order
            </button>
        `;

        box.appendChild(div);
    });
}

window.track = (id) => {
    localStorage.setItem("trackId", id);
    window.location.href = "order_tracking.html";
};

/* ORDER TRACKING */
export function loadTracking() {
    const id = parseInt(localStorage.getItem("trackId"));
    const orders = get("orders") || [];
    const order = orders.find(o => o.id === id);

    const box = document.getElementById("timeline");

    const stages = [
        { text: "Order Placed", key: "Pending" },
        { text: "Preparing", key: "Preparing" },
        { text: "Assigned to Delivery Partner", key: "Assigned" },
        { text: "Picked Up", key: "Picked Up" },
        { text: "Out for Delivery", key: "Out for Delivery" },
        { text: "Delivered", key: "Delivered" }
    ];

    stages.forEach((stage, index) => {
        const active = order.status === stage.key || index === 0;

        const div = document.createElement("div");
        div.className = "timeline-item";
        div.innerHTML = `
            <div class="dot" style="background:${active ? 'var(--brand)' : '#ddd'}">
                ${index + 1}
            </div>
            <div class="body">
                <strong>${stage.text}</strong>
                <div class="time">${active ? order.status : ""}</div>
            </div>
        `;

        box.appendChild(div);
    });
}
