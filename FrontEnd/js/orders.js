import { get, notify } from "./api.js";

/* Load and render past orders */
export function loadOrders() {
    const ordersBox = document.getElementById("ordersBox");
    if (!ordersBox) return;

    const orders = get("orders") || [];

    if (orders.length === 0) {
        ordersBox.innerHTML = "<h3>No previous orders</h3>";
        return;
    }

    ordersBox.innerHTML = "";

    orders.forEach(order => {
        ordersBox.innerHTML += `
        <div class="order-card">
            <div style="display:flex; justify-content:space-between;">
                <strong>Order #${order.id}</strong>
                <small>${order.time || "Today"}</small>
            </div>

            <div style="margin-top:10px;">
                ${order.items
                    .map(item => 
                        `<div>${item.name} x${item.qty || 1} — ₹${item.price * (item.qty || 1)}</div>`
                    ).join("")
                }
            </div>

            <div style="margin-top:10px; font-weight:700;">
                Total: ₹${order.total}
            </div>

            <div style="margin-top:5px; color:green;">
                Status: ${order.status}
            </div>
        </div>
        `;
    });
}
