import { Button } from "@/components/ui/button"

export default function Hello({
  connect,
}: {
  account: string | null;
  connect: () => void;
}) {
  return (
    <>
      <Button
        variant="outline"
        onClick={connect}>
        Connect to MetaMask
      </Button>
    </>
  );
}

