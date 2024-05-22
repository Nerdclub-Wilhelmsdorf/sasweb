const token = 'test';
import Decimal from 'decimal.js';

export async function handlePayment(sender: string, receiver: string, pin: string, amount: string) : Promise<string> {
    var data = {
        acc1: sender,
        acc2: receiver,
        amount: amount,
        pin: pin
    };   
    var ReturnText = ""
    try {

  
    var response = await fetch("https://saswdorf.de:8443/pay", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        if (response.status === 200) {
            console.log('Payment successful');
            ReturnText = "Erfolgreich Bezahlt: " + amount + "D" + " (Mit Steuren: " + new Decimal(amount).mul(1.1).toString() + "D)";
        } else {
            console.log('Payment failed');
            ReturnText = "Bezahlung fehlgeschlagen";
        }
       // ReturnText = "Bezahlung fehlgeschlagen";
} catch (error) {
    ReturnText = "Bezahlung fehlgeschlagen";
}
return ReturnText;
}