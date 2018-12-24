import qs from 'query-string';

export function loginSubmit(formData) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await postRequest('/login', formData);

            resolve(response);
        } catch (err) {
            reject(err);
        }
    });
}

export async function logout() {
    return await getRequest('/logout');
}
export async function fetchUserData() {
    return await getRequest('/data');
}
export async function updateUserData(data) {
    return await putRequest('/data', {
        childName: data.childname,
        birthDate: data.birthdate,
        childWeightEntry: data.childWeightEntry,
        childPoopsEntry: data.childPoopEntry,
        childInoculationEntry: data.childInoculationEntry
    });
}
export async function deleteUserData(data) {
    return await deleteRequest('/data', {
        childName: data.childname,
        birthDate: data.birthdate,
        childWeightEntry: data.childWeightEntry,
        childPoopsEntry: data.childPoopEntry,
        childInoculationEntry: data.childInoculationEntry
    });
}
export async function replaceUserData(data) {
    return await putRequest('/data_replace', data);
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