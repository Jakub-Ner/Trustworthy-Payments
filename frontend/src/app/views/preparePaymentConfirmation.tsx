import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react";

export const PreparePaymentConfirmation = ({
  onConfirm,
}: {
  onConfirm: (txnId: string) => void;
}) => {
  const [txnId, setTxnId] = useState("");
  return (
    <>
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
        onClick={() => onConfirm(txnId)}
      >
        Confirm Payment
      </Button>
      </>
  );
}
