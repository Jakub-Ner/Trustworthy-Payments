import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";

export const PreparePaymentConfirmation = ({
  onConfirm,
}: {
  onConfirm: (apiKey: string, txnId: string) => void;
}) => {
  const [txnId, setTxnId] = useState("");
  const [apiKey, setApiKey] = useState("")
  return (
    <>
      <p className="text-center mb-12 max-w-md text-sm text-muted-foreground">
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

      <Textarea
        placeholder="Enter Your Wise API Key"
        className="w-full max-w-md mb-4"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        readOnly
      />

      <Textarea
        className="w-full max-w-md mb-4"
        placeholder="Enter ID of a Wise transaction you want to generate a payment confirmation for"
        value={txnId}
        onChange={(e) => setTxnId(e.target.value)}
        rows={5}
      />
      <Button
        variant="outline"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
        onClick={() => onConfirm(apiKey, txnId)}
      >
        Confirm Payment
      </Button>
    </>
  );
}
