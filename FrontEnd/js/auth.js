// auth.js
import { get, save, saveSession, clearSession } from './api.js';

// REGISTER
export function handleRegister(role) {
    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    const users = get("users") || [];

    if (users.find(u => u.email === email)) {
        alert("Email already exists!");
        return;
    }

    const newUser = { name, email, password, role };
    users.push(newUser);
    save("users", users);

    alert("Registration successful!");
    window.location.href = "login.html";
}

// LOGIN
export function handleLogin() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    const users = get("users") || [];
    const user = users.find(u => u.email === email && u.password === password && u.role === role);

    if (!user) {
        alert("Invalid credentials");
        return;
    }
    if (role === "admin") {
    window.location.href = "admin_dashboard.html";
    return;
}

    saveSession(user);

    if (role === "customer") window.location.href = "customer_dashboard.html";
    if (role === "restaurant") window.location.href = "restaurant_dashboard.html";
    if (role === "delivery_partner") window.location.href = "delivery_dashboard.html";
}

// LOGOUT
export function logout() {
    clearSession();
    window.location.href = "login.html";
}
