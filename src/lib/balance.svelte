<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    let konto = "";
    let pin = "";

    function handleSubmit() {}
</script>

<Label class="mb-2 mt-6">Kontonummer</Label>
<div class="mb-6 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={konto}
            placeholder="gulliwerner"
            required
            class="mr-2"
        />
        <Checkbox id="lockBetrag" />
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
    <Button type="submit">Submit</Button>
</form>
