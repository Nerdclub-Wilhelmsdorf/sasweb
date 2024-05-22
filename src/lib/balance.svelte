<script>
    import { Input, Label, Helper, Button, Checkbox, A } from "flowbite-svelte";
    let sender = "";
    let reciever = "";
    let password = "";
    let confirmPassword = "";

    function handleSubmit() {}
</script>

<form>
    <div class="grid gap-6 mb-6 md:grid-cols-2"></div>
    <div class="mb-6">
        <Label for="email" class="mb-2">Kontonummer</Label>
        <Input
            bind:value={sender}
            placeholder="Kontonummer des Senders"
            required
        />
    </div>
    <div class="mb-6">
        <Label for="pin" class="mb-2">PIN</Label>
        <Input
            bind:value={confirmPassword}
            type="password"
            placeholder="••••"
            required
        />
    </div>

    <form on:submit|preventDefault={handleSubmit}>
        <!-- ... -->
        <Button type="submit">Submit</Button>
    </form>
</form>
