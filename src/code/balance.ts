const token = 'test';
export async function handleBalance(konto: string, pin: string) : Promise<string> {
        var data = {
            acc1: konto,
            pin: pin
        }
        var ReturnText = ""
        try {
        var response = await fetch("https://saswdorf.de:8443/balanceCheck", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            if (response.status === 200) {
                ReturnText = "Kontostand: " + await response.text() + "D";
            } else {
                console.log('Verbindung fehlgeschlagen');
                ReturnText = "Verbindung fehlgeschlagen";
            }
           // ReturnText = "Bezahlung fehlgeschlagen";
    } catch (error) {
        ReturnText = "Verbindung fehlgeschlagen";
    }
    return ReturnText;
    }
