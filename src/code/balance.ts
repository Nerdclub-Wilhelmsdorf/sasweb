import {url} from './server';
import {token} from './server';
export async function handleBalance(konto: string, pin: string): Promise<string> {
    var data = {
        acc1: konto,
        pin: pin
    }
    var ReturnText = ""
    try {
        var response = await fetch(url + "/balanceCheck", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            ReturnText = "Kontostand: " + await response.text() + "D";
        }
        else if (response.status == 201) {
            var text = await response.text();
            if (text.includes("pin")) ReturnText = "Falsche Pin!";
            else if (text.includes("no row")) ReturnText = "Konto nicht gefunden!";
            else if (text.includes("funds")) ReturnText = "Nicht genug Geld!";
            else if (text.includes("suspended")) ReturnText = "Konto gesperrt!";
        }
        else {
            console.log('Verbindung fehlgeschlagen');
            ReturnText = "Verbindung fehlgeschlagen";
        }
        // ReturnText = "Bezahlung fehlgeschlagen";
    } catch (error) {
        ReturnText = "Verbindung fehlgeschlagen";
    }
    return ReturnText;
}
