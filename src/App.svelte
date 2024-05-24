<script>
  import Pay from "./lib/pay.svelte";
  import Balance from "./lib/balance.svelte";
  import QrDialog from "./lib/qr.svelte";
  import { Link, Route } from "svelte-routing";
  import { Credit_card, Person } from "svelte-google-materialdesign-icons";
  var pay = true;
  import {
    BottomNav,
    BottomNavItem,
    Skeleton,
    ImagePlaceholder,
    Modal,
    Spinner,
  } from "flowbite-svelte";
  import { AdjustmentsVerticalOutline } from "flowbite-svelte-icons";
  import { ShowLoadingModal } from "./code/stores";
  var gray =
    "w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
  var primary =
    "w-6 h-6 mb-1 text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
  var isLoading = true;

  function handleBalanceClick() {
    pay = false;
    balanceColors = primary;
    payColors = gray;
  }
  function handlePayClick() {
    pay = true;
    payColors = primary;
    balanceColors = gray;
  }
  var payColors = primary;
  var balanceColors = gray;
  ShowLoadingModal.subscribe((value) => {
    isLoading = value;
  });
</script>

<meta
  name="viewport"
  content="width=device-width, initial-scale=1, maximum-scale=1"
/>
<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
<h1>SaS Pay</h1>
<body>
  {#if pay}
    <Pay />
  {/if}
  {#if !pay}
    <Balance />
  {/if}

  <overlay class="fixed_bottom_bar">
    {#if !isLoading}
      <BottomNav position="absolute" classInner="grid-cols-2">
        <BottomNavItem btnName="Bezahlen" on:click={handlePayClick}>
          <Credit_card class={payColors} style="outline: none; box-shadow: none; border: none;" />
        </BottomNavItem>

        <BottomNavItem btnName="Kontostand" on:click={handleBalanceClick}>
          <Person class={balanceColors} style="outline: none; box-shadow: none; border: none;"/>
        </BottomNavItem>
      </BottomNav>
    {/if}
  </overlay>
</body>

{#if isLoading}
  <Modal
    open
    style="outline: none; box-shadow: none; border: none;"
    dismissable={false}
    class="modal"
  >
    <div class="p-4 flex justify-center items-center">
      <div class="flex flex-col justify-center items-center">
        <h2 class="text-lg font-semibold text-center">Loading...</h2>
        <Spinner class="w-9 h-9 text-primary-500 mt-1" />
      </div>
    </div>
  </Modal>
{/if}

