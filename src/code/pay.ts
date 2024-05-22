const url = 'https://saswdorf.de:8443/pay';
const token = 'W_97xyk8G]]w';
const data = {
    acc1: '',
    acc2: '',
    amount: '',
    pin: ''
};

export function handlePayment(sender: string, receiver: string, pin: string, amount: string) {
    data.acc1 = sender;
    data.acc2 = receiver;
    data.amount = amount;
    data.pin = pin;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then(response => {
        if (response.ok) {
            console.log('Payment successful');
            return "Payment successful";
        } else {
            console.log('Payment failed');
            return "Payment failed";
        }
    }).catch(error => {
        return error;
    });
}