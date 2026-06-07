import { AUTH_STORAGE_KEY } from "./constants";

export function setAuthenticated(value) {
  if (typeof window === "undefined") return;
  if (value) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLogin(email, password) {
  const trimmedEmail = email?.trim();
  const trimmedPassword = password?.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, message: "E-posta ve şifre zorunludur." };
  }

  if (!isValidEmail(trimmedEmail)) {
    return { ok: false, message: "Geçerli bir e-posta adresi girin." };
  }

  if (trimmedPassword.length < 3) {
    return { ok: false, message: "Şifre en az 3 karakter olmalıdır." };
  }

  return { ok: true };
}
