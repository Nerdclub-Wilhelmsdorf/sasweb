<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { handleBalance } from "../code/balance";
    import { Modal } from "flowbite-svelte";
    let defaultModal = false;
    let ModalText = "";
    let konto = "";
    let pin = "";
    let kontoLocked = false

    async function handleSubmit() {
        ModalText = await handleBalance(konto,pin)
        defaultModal = true
        if (!kontoLocked){
            konto = ""
        }
        pin = ""
    }
</script>

<Label class="mb-2 mt-6">Kontonummer</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={konto}
            placeholder="gulliwerner"
            required
            disabled={kontoLocked}
            class="mr-2"
        />
        <Checkbox id="lockBetrag" bind:checked="{kontoLocked}"/>
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
            pattern={"\d*"}
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
        konto === "" || pin === ""
        || isNaN(Number(pin)) || !Number.isInteger(Number(pin)) || pin.length !== 4
    }
>Kontostand</Button>

<Modal title="Status" bind:open={defaultModal} autoclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {ModalText}
    </p>
    <svelte:fragment slot="footer">
        <Button on:click={() => defaultModal = false}>Bestätigen</Button>
    </svelte:fragment>
</Modal>
