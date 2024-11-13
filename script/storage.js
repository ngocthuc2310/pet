"use strict";
// == Hàm save storage ========================
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// ====Hàm Get storage ===========================
function getFromStorage(key, _default) {
  return localStorage.getItem(key) ?? _default;
}
