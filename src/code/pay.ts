import { url } from './server';
import { token } from './server';
import Decimal from 'decimal.js';

export async function handlePayment(sender: string, receiver: string, pin: string, amount: string): Promise<string> {
    var data = {
        from: sender,
        to: receiver,
        amount: amount,
        pin: pin
    };
    var ReturnText = ""
    var a = "";
    try {
        var response = await fetch(url + "/pay", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        console.log(await response.text());
        if (response.status === 200) {

            ReturnText = "Erfolgreich Bezahlt: " + amount + "D" + " (Mit Steuren: " + new Decimal(amount).mul(1.1).toString() + "D)";
        } else if (response.status == 201) {
            var text = await response.text();
            if (text.includes("pin")) ReturnText = "Falsche Pin!";
            else if (text.includes("no row")) ReturnText = "Konto nicht gefunden!";
            else if (text.includes("funds")) ReturnText = "Nicht genug Geld!";
            else if (text.includes("suspended")) ReturnText = "Konto gesperrt! Bitte versuchen sie es später nochmal!";
            else if (text.includes("suspended")) ReturnText = "Konto gesperrt!";
        }
        else {
            ReturnText = "Bezahlung fehlgeschlagen";
        }
    } catch (error) {
        ReturnText = "Bezahlung fehlgeschlagen";
    }
    return ReturnText;
}