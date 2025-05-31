"use client"

import { useMetaMask } from "@/hooks/useMetamask";
import { NotificationProvider } from "@blockscout/app-sdk"
import Hello from "./views/hello";
import { PreparePaymentConfirmation } from "./views/preparePaymentConfirmation";

export default function Home() {
  const { account, connect } = useMetaMask();
  const onConfirm = (apiKey: string, txnId: string) => {
    console.log("Confirming payment with API Key:", apiKey);
    console.log("Confirming payment with token ID:", txnId);
  };

  return (
    <NotificationProvider>
      <div className="w-full text-center mt-4 absolute">
        <h1 className="text-2xl mt-4 font-bold">Trustworthy </h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {!account ? (
          <Hello
            account={account}
            connect={connect}
          />
        ) : (
          <PreparePaymentConfirmation
            onConfirm={onConfirm}
          />)}

      </div>
    </NotificationProvider>
  );
}
