import { run, web3 } from "hardhat";
import { WiseTransferListV2Instance } from "../../typechain-types";
import { prepareAttestationRequestBase, submitAttestationRequest, retrieveDataAndProofBaseWithRetry } from "./Base";

const WiseTransferListV2 = artifacts.require("WiseTransferListV2");

const { WEB2JSON_VERIFIER_URL_TESTNET, VERIFIER_API_KEY_TESTNET, COSTON2_DA_LAYER_URL } = process.env;

const postProcessJq = `{id: .id, status: .status, rate: .rate, sourceCurrency: .sourceCurrency, targetCurrency: .targetCurrency, sourceValue: .sourceValue, targetValue: .targetValue, created: .created}`;
const httpMethod = "GET";

const queryParams = "{}";
const body = "{}";
const abiSignature = `{"components": [{"internalType": "uint256", "name": "id", "type": "uint256"},{"internalType": "string", "name": "status", "type": "string"},{"internalType": "uint256", "name": "rate", "type": "uint256"},{"internalType": "string", "name": "sourceCurrency", "type": "string"},{"internalType": "string", "name": "targetCurrency", "type": "string"},{"internalType": "uint256", "name": "sourceValue", "type": "uint256"},{"internalType": "uint256", "name": "targetValue", "type": "uint256"},{"internalType": "string", "name": "created", "type": "string"}],"name": "transfer","type": "tuple"}`;

const attestationTypeBase = "Web2Json";
const sourceIdBase = "PublicWeb2";
const verifierUrlBase = WEB2JSON_VERIFIER_URL_TESTNET;

async function prepareAttestationRequest(apiUrl: string, postProcessJq: string, abiSignature: string, headers: string) {
  const requestBody = {
    url: apiUrl,
    httpMethod: httpMethod,
    headers: headers,
    queryParams: queryParams,
    body: body,
    postProcessJq: postProcessJq,
    abiSignature: abiSignature,
  };

  const url = `${verifierUrlBase}Web2Json/prepareRequest`;
  const apiKey = VERIFIER_API_KEY_TESTNET || "";

  return await prepareAttestationRequestBase(url, apiKey, attestationTypeBase, sourceIdBase, requestBody);
}

async function retrieveDataAndProof(abiEncodedRequest: string, roundId: number) {
  const url = `${COSTON2_DA_LAYER_URL}api/v1/fdc/proof-by-request-round-raw`;
  console.log("Url:", url, "n");
  return await retrieveDataAndProofBaseWithRetry(url, abiEncodedRequest, roundId);
}

async function deployAndVerifyContract() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const args: any[] = [];
  const transferList: WiseTransferListV2Instance = await WiseTransferListV2.new(...args);
  try {
    await run("verify:verify", {
      address: transferList.address,
      constructorArguments: args,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.log(e);
  }
  console.log("WiseTransferListV2 deployed to", transferList.address, "\n");
  return transferList;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function interactWithContract(transferList: WiseTransferListV2Instance, proof: any) {
  console.log("Proof hex:", proof.response_hex, "\n");

  // A piece of black magic that allows us to read the response type from an artifact
  const IWeb2JsonVerification = await artifacts.require("IWeb2JsonVerification");
  const responseType = IWeb2JsonVerification._json.abi[0].inputs[0].components[1];
  console.log("Response type:", responseType, "\n");

  const decodedResponse = web3.eth.abi.decodeParameter(responseType, proof.response_hex);
  console.log("Decoded proof:", decodedResponse, "\n");
  const transaction = await transferList.addTransfer({
    merkleProof: proof.proof,
    data: decodedResponse,
  });
  console.log("Transaction:", transaction.tx, "\n");
  console.log("Wise Transfers:\n", await transferList.getAllTransfers(), "\n");
}

async function main() {
  const tnxId = process.env.TNX_ID || "";
  const wiseApiKey = process.env.WISE_API_KEY || "";

  console.log("Transaction ID:", tnxId, "\n");
  console.log("Wise API Key:", wiseApiKey, "\n");

  const headers = `{"Authorization": "Bearer ${wiseApiKey}"}`;
  const apiUrl = `https://api.transferwise.com/v1/transfers/${tnxId}`;
  const data = await prepareAttestationRequest(apiUrl, postProcessJq, abiSignature, headers);
  console.log("Data:", data, "\n");

  const abiEncodedRequest = data.abiEncodedRequest;
  const roundId = await submitAttestationRequest(abiEncodedRequest);

  const proof = await retrieveDataAndProof(abiEncodedRequest, roundId);

  const transferList: WiseTransferListV2Instance = await deployAndVerifyContract();

  await interactWithContract(transferList, proof);
}

void main().then(() => {
    process.exit(0);
});
