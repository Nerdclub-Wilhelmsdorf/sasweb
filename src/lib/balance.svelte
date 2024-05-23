<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    import { handleBalance } from "../code/balance";
    import { Modal } from "flowbite-svelte";
    import { Qr_code } from "svelte-google-materialdesign-icons";
    import {
        qrRoute,
        QrRoute,
        BalanceAccount,
        ShowBalanceModal,
        ShowLoadingModal,
    } from "../code/stores";
    let defaultModal = false;
    let showQrCode = false;
    let ModalText = "";
    let konto = "";
    let pin = "";
    let kontoLocked = false;
    BalanceAccount.subscribe((value) => {
        konto = value;
    });
    ShowBalanceModal.subscribe((value) => {
        showQrCode = value;
        console.log(value);
    });
    import { Html5Qrcode } from "html5-qrcode";
    import Qr from "./qr.svelte";
    import QrCode from "svelte-google-materialdesign-icons/Qr_code.svelte";

    async function handleSubmit() {
        ShowLoadingModal.set(true);
        ModalText = await handleBalance(konto, pin);
        defaultModal = true;
        if (!kontoLocked) {
            BalanceAccount.set("");
            konto = "";
        }
        pin = "";
        ShowLoadingModal.set(false);
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
        <Button
            pill={false}
            class="!p-2 mr-2 text-secondary-700"
            size="sm"
            disabled={kontoLocked}
            on:click={() => {
                BalanceAccount.set("");
                ShowBalanceModal.set(true);
                console.log(showQrCode);
                qrRoute.set(QrRoute.QrBalance);
            }}
        >
            <Qr_code class="w-6 h-6 text-secondary-700" />
        </Button>
        <Checkbox
            id="lockBetrag"
            class="without-ring"
            bind:checked={kontoLocked}
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
            pattern={"d*"}
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
    disabled={konto === "" ||
        pin === "" ||
        isNaN(Number(pin)) ||
        !Number.isInteger(Number(pin)) ||
        pin.length !== 4}>Kontostand</Button
>

<Modal
    bind:open={defaultModal}
    autoclose
    on:close={() => (defaultModal = false)}
>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {ModalText}
    </p>
    <svelte:fragment slot="footer">
        <Button on:click={() => (defaultModal = false)}>Ok</Button>
    </svelte:fragment>
</Modal>
