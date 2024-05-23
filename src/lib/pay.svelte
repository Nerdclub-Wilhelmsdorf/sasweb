<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { Modal } from "flowbite-svelte";
    import { handlePayment } from "../code/pay";
    import { Qr_code } from "svelte-google-materialdesign-icons";

    import {
        qrRoute,
        QrRoute,
        ShowPayModal,
        SenderAccount,
        RecieverAccount,
        ShowLoadingModal,
    } from "../code/stores";

    import { Html5Qrcode } from "html5-qrcode";
    import Qr from "./qr.svelte";

    let showQrCode = false;
    let defaultModal = false;
    let sender = "";
    let reciever = "";
    let pin = "";
    let amount = "";
    let ModalText = "";
    let senderLocked = false;
    let recieverLocked = false;
    let amountLocked = false;
    ShowPayModal.subscribe((value) => {
        showQrCode = value;
    });
    SenderAccount.subscribe((value) => {
        sender = value;
    });
    RecieverAccount.subscribe((value) => {
        reciever = value;
    });
    async function handleSubmit() {
        ShowLoadingModal.set(true);
        ModalText = await handlePayment(sender, reciever, pin, amount);
        ShowLoadingModal.set(false);

        if (!senderLocked) {
            SenderAccount.set("");
            sender = "";
        }
        if (!recieverLocked) {
            RecieverAccount.set("");
            reciever = "";
        }
        if (!amountLocked) {
            amount = "";
        }
        pin = "";
        defaultModal = true;
        ShowLoadingModal.set(false);
    }
</script>

<Label class="mb-2 mt-6">Sender</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={sender}
            placeholder="Kontonummer des Senders"
            required
            class="mr-2"
            disabled={senderLocked}
        />
        <Button
            pill={false}
            class="!p-2 mr-2 text-secondary-700"
            size="sm"
            disabled={senderLocked}
            on:click={() => {
                qrRoute.set(QrRoute.QrSender);
                ShowPayModal.set(true);
                SenderAccount.set("");
            }}
        >
            <Qr_code class="w-6 h-6 text-secondary-700" />
        </Button>

        <Checkbox
            class="without-ring"
            outline="none"
            id="lockSender"
            bind:checked={senderLocked}
        />
    </div>
</div>

<Label class="mb-2 mt-6">Empfänger</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={reciever}
            placeholder="Kontonummer des Empfängers"
            required
            class="mr-2"
            disabled={recieverLocked}
        />
        <Button
            pill={false}
            class="!p-2 mr-2 text-secondary-700"
            size="sm"
            disabled={recieverLocked}
            on:click={() => {
                qrRoute.set(QrRoute.QrReciever);
                ShowPayModal.set(true);
                SenderAccount.set("");
            }}
        >
            <Qr_code class="w-6 h-6 text-secondary-700" />
        </Button>

        <Checkbox
            id="lockSender2"
            class="without-ring"
            bind:checked={recieverLocked}
        />
    </div>
</div>

<Label class="mb-2 mt-6">Betrag</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={amount}
            placeholder="12"
            required
            class="mr-2"
            disabled={amountLocked}
        />
        <Checkbox
            id="lockBetrag"
            class="without-ring"
            bind:checked={amountLocked}
        />
    </div>
</div>

<Label for="pin" class="mb-2 mt-6">PIN</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={pin}
            type="password"
            placeholder="••••"
            required
            class="mr-2"
        />
        <div class="spacer"></div>
        <style>
            .spacer {
                width: 16px;
                height: 16px;
            }
        </style>
    </div>
</div>
<Button
    on:click={handleSubmit}
    disabled={sender === "" ||
        reciever === "" ||
        pin === "" ||
        amount === "" ||
        isNaN(Number(pin)) ||
        isNaN(Number(amount)) ||
        !Number.isInteger(Number(pin)) ||
        pin.length !== 4 ||
        reciever == sender}>Bezahlen</Button
>
{sender === "" || reciever === "" || pin === "" || amount === ""
    ? "(nicht alle Felder ausgefüllt)"
    : isNaN(Number(pin)) || isNaN(Number(amount))
      ? "(PIN und Betrag müssen Zahlen sein)"
      : !Number.isInteger(Number(pin))
        ? "(PIN muss eine ganze Zahl sein)"
        : pin.length !== 4
          ? "(PIN muss 4-stellig sein)"
          : reciever == sender
            ? "(Sender und Empfänger dürfen nicht gleich sein)"
            : ""}
<overlay>
    <Modal bind:open={defaultModal} autoclose>
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {ModalText}
        </p>
        <svelte:fragment slot="footer">
            <Button on:click={() => (defaultModal = false)}>Ok</Button>
        </svelte:fragment>
    </Modal>
</overlay>

{#if showQrCode}
    <Modal
        open
        autoclose
        on:close={() => ShowPayModal.set(false)}
        dismissable={false}
    >
        <Qr></Qr>
    </Modal>
{/if}
