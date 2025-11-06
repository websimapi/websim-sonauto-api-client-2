const PROXY_URL = 'https://corsproxy.io/?';
const BASE_URL = 'https://api.sonauto.ai/v1';

let apiKey = '';

export function setApiKey(key) {
    apiKey = key;
}

async function fetchApi(path, options = {}) {
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const response = await fetch(`${PROXY_URL}${BASE_URL}${path}`, { ...options, headers });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorBody}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
}

export function generateSong(params) {
    return fetchApi('/generations', {
        method: 'POST',
        body: JSON.stringify(params),
    });
}

export function getGeneration(taskId) {
    return fetchApi(`/generations/${taskId}`);
}

export function getCreditsBalance() {
    return fetchApi('/credits/balance');
}

