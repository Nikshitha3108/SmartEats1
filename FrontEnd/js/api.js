// api.js
export function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getSession() {
    return get("session");
}

export function saveSession(session) {
    save("session", session);
}

export function clearSession() {
    localStorage.removeItem("session");
}
