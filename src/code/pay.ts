const url = 'https://example.com/api';
const token = 'test';
const data = {
    key1: 'value1',
    key2: 'value2'
};

function pay(data: any, url: string, token: string) {
    fetch(url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}