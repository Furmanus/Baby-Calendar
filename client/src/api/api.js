import qs from 'query-string';

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
export function fetchChildDataApi() {
    return getRequest('/api/info');
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
async function postRequest(url = '', data = {}) {
    data = prepareRequestData(data);

    try {
        const response = await fetch(url, {
            method: 'POST',
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
