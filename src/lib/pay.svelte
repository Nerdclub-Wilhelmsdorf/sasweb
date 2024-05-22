<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { Modal } from "flowbite-svelte";
    let defaultModal = false;
    import { handlePayment } from "../code/pay";
    let sender = "";
    let reciever = "";
    let pin = "";
    let amount = "";

    let senderLocked = false;
    let recieverLocked = false;
    let amountLocked = false;

    function handleSubmit() {
        handlePayment(sender, reciever, pin, amount);
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

<form on:submit|preventDefault={handleSubmit}>
    <!-- ... -->
    <Button type="payButton">Bezahlen</Button>
</form>

<Modal title="Terms of Service" bind:open={defaultModal} autoclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new
        consumer privacy laws for its citizens, companies around the world are
        updating their terms of service agreements to comply.
    </p>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes
        into effect on May 25 and is meant to ensure a common set of data rights
        in the European Union. It requires organizations to notify users as soon
        as possible of high-risk data breaches that could personally affect
        them.
    </p>
    <svelte:fragment slot="footer">
        <Button on:click={() => alert('Handle "success"')}>I accept</Button>
        <Button color="alternative">Decline</Button>
    </svelte:fragment>
</Modal>
