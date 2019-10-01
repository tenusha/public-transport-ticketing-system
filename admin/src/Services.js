import config from './config.json'

const baseUrl = config.baseUrl

export function login(body) {
    return callPost(baseUrl + '/admin/login', body);
}

export function register(body) {
    return callPost(baseUrl + '/admin/register', body);
}

export function admins() {
    return callGet(baseUrl + '/admin/admins');
}

export function users() {
    return callGet(baseUrl + '/users');
}

export function getUser(email) {
    return callGet(baseUrl + '/users/' + email);
}

export function deleteUser(id) {
    return callDelete(baseUrl + '/users/' + id);
}

export function deleteAdmin(id) {
    return callDelete(baseUrl + '/admin/' + id);
}

export function updateAccount(body, id) {
    return callPut(baseUrl + '/admin/' + id, body)
}

export function updateUserAccount(body, id) {
    return callPut(baseUrl + '/users/' + id, body)
}

export function updateUser(body, id) {
    return callPut(baseUrl + '/users/' + id, body)
}

const callGet = (url) => {
    return fetch(url).then(handleres);
}

const callPost = (url, body) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callPut = (url, body) => {
    return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    }).then(handleres);
}

const callDelete = (url) => {
    return fetch(url, {
        method: 'DELETE'
    }).then(handleres);
}

const handleres = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        if (res.status === 404) {
            return Promise.reject();
        } else {
            throw res.json();
        }
    }
}