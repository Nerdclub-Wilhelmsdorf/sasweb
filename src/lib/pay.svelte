<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    let sender = "";
    let reciever = "";
    let pin = "";
    let amount = "";
    function handleSubmit() {}
</script>

<form>
    <Label class="mb-2 mt-6">Sender</Label>
    <div class="mb-6 flex items-center">
        <div class="w-full flex items-center">
            <Input
                bind:value={sender}
                placeholder="Kontonummer des Senders"
                required
                class="mr-2"
            />

            <Checkbox id="lockSender" />
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
            />

            <Checkbox id="lockSender2" />
        </div>
    </div>
    <Label class="mb-2 mt-6">Betrag</Label>
    <div class="mb-6 flex items-center">
        <div class="w-full flex items-center">
            <Input bind:value={amount} placeholder="12" required class="mr-2" />

            <Checkbox id="lockSender3" />
        </div>
    </div>
    <div class="mb-6">
        <Label for="pin" class="mb-2">PIN</Label>
        <Input bind:value={pin} type="password" placeholder="••••" required />
    </div>

    <form on:submit|preventDefault={handleSubmit}>
        <!-- ... -->
        <Button type="payButton">Bezahlen</Button>
    </form>
</form>
