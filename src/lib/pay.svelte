<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { Modal } from "flowbite-svelte";
    let defaultModal = false;
    import { handlePayment } from "../code/pay";
    let sender = "";
    let reciever = "";
    let pin = "";
    let amount = "";
    let ModalText = "";
    let senderLocked = false;
    let recieverLocked = false;
    let amountLocked = false;

    async function handleSubmit(){
        ModalText = await handlePayment(sender, reciever, pin, amount);
        if (!senderLocked) {
            sender = "";
        }
        if (!recieverLocked) {
            reciever = "";
        }
        if (!amountLocked) {
            amount = "";
        }
        pin = "";
        defaultModal = true;
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

        <Checkbox id="lockSender" bind:checked={senderLocked} />
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

        <Checkbox id="lockSender2" bind:checked={recieverLocked} />
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
        <Checkbox id="lockBetrag" bind:checked={amountLocked} />
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
    disabled={
        sender === "" || reciever === "" || pin === "" || amount === ""
        || isNaN(Number(pin)) || isNaN(Number(amount)) || !Number.isInteger(Number(pin)) || pin.length !== 4
        || reciever == sender
    }
>Bezahlen</Button>

<Modal title="Status" bind:open={defaultModal} autoclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {ModalText}
    </p>
    <svelte:fragment slot="footer">
        <Button on:click={() => defaultModal = false}>Bestätigen</Button>
    </svelte:fragment>
</Modal>
