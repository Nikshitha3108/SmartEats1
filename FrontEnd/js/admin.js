// admin.js
import { get, save, getSession } from './api.js';
import { logout as logoutFn } from './auth.js';

window.logout = logoutFn;

/* -----------------------------
   AUTH CHECK
------------------------------*/
export function checkAdmin() {
    const session = getSession();
    if (!session || session.role !== "admin") {
        window.location.href = "login.html";
    }
}

/* -----------------------------
   DASHBOARD STATS
------------------------------*/
export function loadAdminStats() {
    const users = get("users") || [];
    const orders = get("orders") || [];

    document.getElementById("custCount").innerText =
        users.filter(u => u.role === "customer").length;

    document.getElementById("restCount").innerText =
        users.filter(u => u.role === "restaurant").length;

    document.getElementById("dpCount").innerText =
        users.filter(u => u.role === "delivery_partner").length;

    document.getElementById("orderCount").innerText = orders.length;
}

/* -----------------------------
   USER MANAGEMENT
------------------------------*/
export function loadUsersFiltered() {
    const users = get("users") || [];
    const box = document.getElementById("usersList");
    const filter = document.getElementById("filterRole").value;

    box.innerHTML = "";

    users
        .filter(u => filter === "all" ? true : u.role === filter)
        .forEach(u => {
            const div = document.createElement("div");
            div.className = "admin-row";

            div.innerHTML = `
                <div class="admin-user-block">
                    <img src="images/icons/user.svg" class="admin-icon">
                    <div>
                        <strong>${u.name}</strong><br>
                        <small>${u.email}</small>
                    </div>
                </div>

                <div class="admin-role-tag">${u.role}</div>

                <button class="admin-delete-btn" onclick="deleteUser('${u.email}')">
                    <img src="images/icons/delete.svg">
                </button>
            `;

            box.appendChild(div);
        });
}

window.deleteUser = (email) => {
    let users = get("users") || [];
    users = users.filter(u => u.email !== email);
    save("users", users);
    loadUsersFiltered();
};

/* -----------------------------
   ORDER MANAGEMENT
------------------------------*/
export function loadAllOrders() {
    const orders = get("orders") || [];
    const filter = document.getElementById("orderFilter").value;
    const box = document.getElementById("ordersList");

    box.innerHTML = "";

    orders
        .filter(o => filter === "all" ? true : o.status === filter)
        .forEach(o => {
            const row = document.createElement("div");
            row.className = "admin-row";

            row.innerHTML = `
                <div class="admin-order-block">
                    <img src="images/icons/order.svg" class="admin-icon">
                    <div>
                        <strong>Order #${o.id}</strong><br>
                        <small>Total: ₹${o.total}</small><br>
                        <small>Status: ${o.status}</small>
                    </div>
                </div>

                <button class="admin-delete-btn" onclick="deleteOrder(${o.id})">
                    <img src="images/icons/delete.svg">
                </button>
            `;

            box.appendChild(row);
        });
}

window.deleteOrder = (id) => {
    let orders = get("orders") || [];
    orders = orders.filter(o => o.id !== id);
    save("orders", orders);
    loadAllOrders();
};

/* -----------------------------
   PAGE INITIALIZERS
------------------------------*/
export function initAdminDashboard() {
    checkAdmin();
    loadAdminStats();
    // loadUsers & loadOrders will be run from page script if needed
}

export function initManageUsers() {
    checkAdmin();
    loadUsersFiltered();
}

export function initManageOrders() {
    checkAdmin();
    loadAllOrders();
}
