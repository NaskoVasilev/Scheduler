import {appSettings} from "../constants/appSettings"
import { getBearerToken } from "./localStorageService";

function buildApiUrl(path) {
    return `${appSettings.baseUrl}/${path}`;
}

function buildRequestOptions(method) {
    let options = {
        method,
        headers: { 
            'Content-Type': 'application/json',
        },
    };

    const bearerToken = getBearerToken();
    if(bearerToken) {
        options['Authorization'] = 'Bearer ' + bearerToken;
    }
}

export async function get(path) {
    const response = await fetch(buildApiUrl(path), buildRequestOptions('GET'));
    return await response.json();
}

export async function post(path, body) {
    let requestOptions = buildRequestOptions('POST');
    requestOptions.body = JSON.stringify(body);

    const response = await fetch(buildApiUrl(path), requestOptions);
    return await response.json();
}