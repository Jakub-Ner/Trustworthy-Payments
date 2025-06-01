import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process'; // Node.js module to run shell commands
import util from 'util';

const execPromise = util.promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(`Received request method: ${req.method}`); // Log the request method
  if (req.method === 'POST') {
    const { wiseApiKey, tnxId } = req.body;

    if (!wiseApiKey || !tnxId) {
      return res.status(400).json({ error: 'Missing wiseApiKey or tnxId' });
    }

    try {
      // Construct the command
      console.log(`Received wiseApiKey: ${wiseApiKey}`);
      console.log(`Received tnxId: ${tnxId}`);

      const command = `cd ../blockchain; pwd; export WISE_API_KEY=${wiseApiKey} && export TNX_ID=${tnxId} && npx hardhat run scripts/Web2Json.ts --network coston2`;

      console.log(`Executing command: ${command}`); // For server-side logging

      const { stdout, stderr } = await execPromise(command, {
      });

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: 'Error executing script', details: stderr });
      }

      console.log(`stdout: ${stdout}`);
      res.status(200).json({ success: true, output: stdout });

    } catch (error: any) {
      console.error(`Execution error: ${error.message}`);
      res.status(500).json({ error: 'Failed to execute script', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
