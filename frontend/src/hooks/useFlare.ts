import { useState, useCallback } from 'react';

export function useFlare() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null); // To store any data returned from the script

  const runFlareScript = useCallback(async (wiseApiKey: string, tnxId: string) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      console.log('Calling run-flare API with wiseApiKey:', wiseApiKey, 'and tnxId:', tnxId);
      const response = await fetch('/api/run-flare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wiseApiKey, tnxId }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      setData(result); // Store the output or success message
      console.log('Script executed successfully:', result);

    } catch (e: any) {
      console.error('Error calling run-flare API:', e);
      setError(e.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { runFlareScript, isLoading, error, data };
}
