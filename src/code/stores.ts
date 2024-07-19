import { writable } from 'svelte/store';

export enum QrRoute {
    QrSender,
    QrReciever,
    QrBalance,
}
export const qrRoute = writable(QrRoute.QrSender);
export const BalanceAccount = writable("");
export const ShowBalanceModal = writable(false);
export const ShowPayModal = writable(false);
export const SenderAccount = writable("");
export const RecieverAccount = writable("");
export const ShowLoadingModal = writable(false);
export const PaymentAmount = writable("");