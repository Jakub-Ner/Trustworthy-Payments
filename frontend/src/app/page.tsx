"use client"

import { useMetaMask } from "@/hooks/useMetamask";
import Hello from "./views/hello";
import { PreparePaymentConfirmation } from "./views/preparePaymentConfirmation";

export default function Home() {
  const { account, connect } = useMetaMask();
  let view = <Hello account={account} connect={connect} />;

  const onConfirm = (apiKey: string, txnId: string) => {
    console.log("Confirming payment with API Key:", apiKey);
    console.log("Confirming payment with token ID:", txnId);
  };

  if (!account) view = <PreparePaymentConfirmation onConfirm={onConfirm} />;

  return (
    <>
      <div className="w-full text-center mt-4 absolute">
        <h1 className="text-2xl mt-4 font-bold">Trustworthy Payments</h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {view}
      </div>
    </>
  );
}
