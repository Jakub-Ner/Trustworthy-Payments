import { Button } from "@/components/ui/button"
import { useState } from "react";
import { PassTextArea } from "@/components/ui/passTextArea";

export const PreparePaymentConfirmation = ({
  onConfirm,
}: {
  onConfirm: (apiKey: string, txnId: string) => void;
}) => {
  const [apiKey, setApiKey] = useState("");
  const [txnId, setTxnId] = useState("");
  if (apiKey && txnId) {
    onConfirm(apiKey, txnId);
  }
  if (!apiKey) {
    return <GetWiseApiKey onConfirm={setApiKey} />;
  }
  return <GetTransactionId onConfirm={setTxnId} />;
};

const GetTransactionId = ({
  onConfirm,
}: {
  onConfirm: (txnId: string) => void;
}) => {
  const [txnId, setTxnId] = useState("");
  return (
    <>
      <p className="text-center mb-12 max-w-md text-muted-foreground">
        🧾 <strong>Enter your Wise Transaction ID</strong> to generate a payment confirmation.
        <br /><br />
        💡 You can find your transaction ID in the <em>Payments</em> section of your Wise dashboard.
        Click into the specific transaction to copy the ID.
      </p>

      <PassTextArea
        placeholder="Paste your Wise Transaction ID"
        value={txnId}
        onChange={(text) => setTxnId(text)}
      />

      <Button
        variant="outline"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        onClick={() => onConfirm(txnId)}
      >
        Submit Transaction ID
      </Button>
    </>
  );
};

const GetWiseApiKey = ({
  onConfirm,
}: {
  onConfirm: (apiKey: string) => void;
}) => {
  const [apiKey, setApiKey] = useState("")
  return (
    <>
      <p className="text-center mb-12 max-w-md text-muted-foreground">
        🔐 <strong>To confirm your payment</strong>, please provide your Wise API Key and the transaction ID you’d like to verify.
        <br /><br />
        🧭 You can find your API Key by following these steps:
        <br /><br />
        <span className="inline-block text-left space-y-2">
          <span className="block pl-6 -indent-6">
            1. Click your profile picture in the top-right corner of the Wise dashboard.
          </span>
          <span className="block pl-6 -indent-6">
            2. Go to <em>Integrations and tools → API tokens</em>.
          </span>
        </span>
      </p>

      <PassTextArea
        placeholder="Enter Your Wise API Key"
        value={apiKey}
        onChange={(text) => setApiKey(text)}
      />

      <Button
        variant="outline"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        onClick={() => onConfirm(apiKey)}
      >
        Confirm Payment
      </Button>
    </>
  );
}
