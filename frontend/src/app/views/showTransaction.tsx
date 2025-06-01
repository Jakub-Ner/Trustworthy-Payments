import { useFlare } from "@/hooks/useFlare";
import { Button } from "@/components/ui/button";


export const ShowTransaction = ({
  wiseApiKey,
  tnxId,
}: {
  wiseApiKey: string;
  tnxId: string;
}) => {
  console.log("ShowTransaction component rendered with wiseApiKey:", wiseApiKey);
  const { runFlareScript, isLoading, error, data } = useFlare();

  const handleRunScript = async () => {
    await runFlareScript(wiseApiKey, tnxId);
  };

  return (
    <>
      <Button onClick={handleRunScript} disabled={isLoading}>
        {isLoading ? 'Generating confirmation it may take around 90 seconds...' : 'Generate Confirmation'}
      </Button>
      {error &&
        <p className="text-center mb-12 max-w-md text-muted-foreground mt-4">
          We couldn&lsquo;t generate confirmation. Make sure you have provided the correct Wise API key and transaction ID.
        </p>}
      {data && (
        <div>
          <p>Script Output:</p>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </>
  );
}
