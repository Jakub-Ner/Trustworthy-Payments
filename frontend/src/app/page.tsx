"use client"

import { useMetaMask } from "@/hooks/useMetamask";
import { NotificationProvider } from "@blockscout/app-sdk"
import Hello from "./views/hello";
import { PreparePaymentConfirmation } from "./views/preparePaymentConfirmation";
import { ShowTransaction } from "./views/showTransaction";
import { useState } from "react";

export default function Home() {
  const { account, connect } = useMetaMask();
  const [wiseApiKey, setWiseApiKey] = useState("");
  const [tnxId, setTxnId] = useState("");
  const onConfirm = (apiKey: string, txnId: string) => {
    setTxnId(txnId);
    setWiseApiKey(apiKey);
  };

  return (
    <NotificationProvider>
      <div className="w-full text-center mt-4 absolute">
        <h1 className="text-2xl mt-4 font-bold">Trustworthy Transfers</h1>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        {!account && (
          <Hello
            account={account}
            connect={connect}
          />
        )}

        {account && !tnxId && (
          <PreparePaymentConfirmation
            onConfirm={onConfirm}
          />)}

        {tnxId && wiseApiKey && (
          <ShowTransaction wiseApiKey={wiseApiKey} tnxId={tnxId} />
        )}

      </div>
    </NotificationProvider>
  );
}
