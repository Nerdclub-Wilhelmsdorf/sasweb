<script>
    import { Html5Qrcode } from "html5-qrcode";
    import { onMount } from "svelte";
    import { Button, Modal } from "flowbite-svelte";
    import {
        BalanceAccount,
        PaymentAmount,
        qrRoute,
        QrRoute,
        RecieverAccount,
        SenderAccount,
        ShowBalanceModal,
        ShowPayModal,
    } from "../code/stores";
    import { get } from "svelte/store";
    import { TerminalOutline } from "flowbite-svelte-icons";
    let scanning = false;

    /**
     * @type {Html5Qrcode}
     */
    let html5Qrcode;

    onMount(init);

    function init() {
        html5Qrcode = new Html5Qrcode("reader");
        html5Qrcode.start(
            { facingMode: "environment" },
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure,
        );
        scanning = true;
    }

    function start() {}
    //start();
    async function stop() {
        await html5Qrcode.stop();
        scanning = false;
    }

    /**
     * @param {any} decodedText
     * @param {any} decodedResult
     */
    function onScanSuccess(decodedText, decodedResult) {
        if (decodedText.startsWith("k:")) {
            decodedText = decodedText.replace("k:", "");
            let splitDecode = decodedText.split(";");
            let account = splitDecode[0];
            let amount = splitDecode[1];
            qrRoute.subscribe((value) => {
                if (value === QrRoute.QrBalance) {
                    stop();
                    ShowBalanceModal.set(false);
                    return;
                }
                if (
                    value === QrRoute.QrSender ||
                    value === QrRoute.QrReciever
                ) {
                    SenderAccount.set("");
                    RecieverAccount.set(account);
                    PaymentAmount.set(amount);

                    stop();
                    ShowPayModal.set(false);
                    return;
                }
            });
        }
        if (decodedText.startsWith("w:")) {
            decodedText = decodedText.replace("w:", "");
            qrRoute.subscribe((value) => {
                if (value === QrRoute.QrBalance) {
                    BalanceAccount.set(decodedText);
                    stop();
                    ShowBalanceModal.set(false);
                    return;
                }
                if (value === QrRoute.QrSender) {
                    SenderAccount.set(decodedText);
                    stop();
                    ShowPayModal.set(false);
                    return;
                }
                if (value === QrRoute.QrReciever) {
                    RecieverAccount.set(decodedText);
                    stop();
                    ShowPayModal.set(false);
                    return;
                }
            });
        }
    }

    /**
     * @param {any} error
     */
    function onScanFailure(error) {
        console.warn(`Code scan error = ${error}`);
    }
</script>

<main>
    <reader id="reader" />
    {#if scanning}
        <Button on:click={stop}>Abbrechen</Button>
    {:else}
        <Button on:click={start}>Start</Button>
    {/if}
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    reader {
        min-height: 300px;
        min-width: 300px;
        background-color: black;
    }
</style>
