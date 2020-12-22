import qs from 'query-string';
import axios from 'axios';

export function loginSubmit(formData) {
    return postRequest('/login', formData);
}
export function registerSubmit(formData) {
    return postRequest('/register', formData);
}
export function logout() {
    return getRequest('/logout');
}
export function fetchUserData() {
    return getRequest('/data');
}
export function updateUserData(data) {
    return putRequest('/data', {
        childName: data.childname,
        birthDate: data.birthdate,
        childWeightEntry: data.childWeightEntry,
        childPoopEntry: data.childPoopEntry,
        childInoculationEntry: data.childInoculationEntry,
        childInfectionEntry: data.childInfectionEntry,
        childNoteEntry: data.childNoteEntry,
        imageData: data.imageData
    });
}
export function deleteUserData(data) {
    return deleteRequest('/data', {
        childName: data.childname,
        birthDate: data.birthdate,
        childWeightEntry: data.childWeightEntry,
        childPoopEntry: data.childPoopEntry,
        childInoculationEntry: data.childInoculationEntry,
        childInfectionEntry: data.childInfectionEntry,
        childNoteEntry: data.childNoteEntry,
        imageData: data.imageData
    });
}
export function replaceUserData(data) {
    return putRequest('/data_replace', data);
}

// V2

export function fetchChildDataApi() {
    return getRequest('/api/info');
}
export function setChildDataApi(formData) {
    return axios.post('/api/info', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
export function createDataEntry(data) {
    return axios.put('/api/data', data, {
        headers: {'Content-Type': 'application/json'},
    });
}
export function replaceDataEntry(data) {
    return axios.post('/api/data', data, {
        headers: {'Content-Type': 'application/json'},
    });
}
export function deleteDataEntry(data) {
    return axios.delete('/api/data', {
        headers: {'Content-Type': 'application/json'},
        data,
    });
}
export function logoutApi() {
    return axios.get('/logout');
}
export function fetchChildWeightApi() {
    return axios.get('/api/weight');
}
export function fetchChildInoculationsApi() {
    return axios.get('/api/inoculations');
}

// HELPERS

async function getRequest(url = '', data = {}) {
    data = prepareRequestData(data);
    url = `${url}?${qs.stringify(data)}`;

    try {
        const response = await fetch(url);
        const preparedResponse = await prepareResponse(response);

        if (response.ok) {
            return preparedResponse;
        }
        throw preparedResponse;
    } catch (err) {
        throw err;
    }
}
async function postRequest(url = '', data = {}, headers = {}) {
    data = prepareRequestData(data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers(({
                'Content-Type': 'application/json',
                ...headers,
            }))
        });
        const preparedResponse = await prepareResponse(response);

        if (response.ok) {
            return preparedResponse;
        }
        throw preparedResponse;
    } catch (err) {
        throw err;
    }
}
async function putRequest(url = '', data = {}) {
    data = prepareRequestData(data);

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: new Headers(({
                'Content-Type': 'application/json'
            }))
        });
        const preparedResponse = await prepareResponse(response);

        if (response.ok) {
            return preparedResponse;
        }
        throw preparedResponse;
    } catch (err) {
        throw err;
    }
}
async function deleteRequest(url = '', data = {}) {
    data = prepareRequestData(data);

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const preparedResponse = await prepareResponse(response);

        if (response.ok) {
            return preparedResponse;
        }
        throw preparedResponse;
    } catch (err) {
        throw err;
    }
}
async function prepareResponse(res) {
    const resolvedRes = await res.json();
    const newLocation = resolvedRes.redirect;

    if (newLocation) {
        window.location = newLocation;
    } else {
        return resolvedRes;
    }
}
function prepareRequestData(data) {
    return Object.assign({}, data, {
        isAjaxRequest: true
    });
}
