<script>
  import Pay from "./lib/pay.svelte";
  import Balance from "./lib/balance.svelte";
  import { Link, Route } from "svelte-routing";
  var pay = true;
  import {
    BottomNav,
    BottomNavItem,
    Skeleton,
    ImagePlaceholder,
  } from "flowbite-svelte";
  import {
    HomeSolid,
    WalletSolid,
    AdjustmentsVerticalOutline,
    UserCircleSolid,
  } from "flowbite-svelte-icons";

  function handleBalanceClick() {
    pay = false;
    balanceColors =
      "w-6 h-6 mb-1 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";
    payColors =
      "w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
  }
  function handlePayClick() {
    pay = true;
    payColors =
      "w-6 h-6 mb-1 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";
    balanceColors =
      "w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
  }
  var payColors =
    "w-6 h-6 mb-1 text-blue-500 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-500";
  var balanceColors =
    "w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
</script>

<h1>SaS Pay</h1>

{#if pay}
  <Pay />
{/if}
{#if !pay}
  <Balance />
{/if}

<BottomNav position="absolute" classInner="grid-cols-2">
  <BottomNavItem btnName="Bezahlen" on:click={handlePayClick}>
    <WalletSolid class={payColors} />
  </BottomNavItem>
  <BottomNavItem btnName="Kontostand" on:click={handleBalanceClick}>
    <AdjustmentsVerticalOutline class={balanceColors} />
  </BottomNavItem>
</BottomNav>
