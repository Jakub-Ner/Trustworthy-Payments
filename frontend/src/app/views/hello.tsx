import { Button } from "@/components/ui/button"

export default function Hello({
  connect,
}: {
  account: string | null;
  connect: () => void;
}) {
  return (
    <>
      <p className="text-center mb-12 max-w-md  text-muted-foreground">
        Tired of payment lag and uncertainty? 🐢
        <br />
        In today&lsquo;s lightning-fast digital finance,
        <br />
        <strong>you need proof, and you need it now</strong>. 
        <br /><br />
        Trustworthy Transfers is revolutionizing how you verify your Wise payments, seamlessly bridging traditional finance with the transparent power of the blockchain. ✨
        <br /><br />
        By intelligently integrating with <strong>Flare Oracle</strong> to interact directly with Wise Transfers and utilizing <strong>Blockscout</strong> for real-time discovery and status updates, we generate a unique blockchain transaction. This acts as an immutable, instantly verifiable confirmation of your payment.
      </p>
      <Button
        variant="outline"
        onClick={connect}>
        Connect to MetaMask
      </Button>
    </>
  );
}

