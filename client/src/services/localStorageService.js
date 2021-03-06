const BEARER_TOKEN_KEY = 'BEARER_TOKEN';
const USERNAME_KEY = 'USERNAME';
const USER_ID_KEY = 'USER_ID';
const IS_HAIRDRESSER_KEY = 'IS_HAIRDRESSER';

export function getBearerToken() {
    return localStorage.getItem(BEARER_TOKEN_KEY);
}

export function setBearerToken(token) {
    localStorage.setItem(BEARER_TOKEN_KEY, token);
}

export function setUser(user) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(USER_ID_KEY, user.id);
    localStorage.setItem(IS_HAIRDRESSER_KEY, user.isHairdresser)
}

export function getUsername() {
    return localStorage.getItem(USERNAME_KEY);
}

export function getUserId() {
    return localStorage.getItem(USER_ID_KEY);
}

export function getIsHairdresser() {
    return localStorage.getItem(IS_HAIRDRESSER_KEY) === 'true';
}

export function clearUserState() {
    localStorage.removeItem(BEARER_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_HAIRDRESSER_KEY);
}