// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {ContractRegistry} from "@flarenetwork/flare-periphery-contracts/coston2/ContractRegistry.sol";
import {IWeb2Json} from "@flarenetwork/flare-periphery-contracts/coston2/IWeb2Json.sol";

struct WiseTransfer {
    uint256 id;
    string status;
    uint256 rate;
    string sourceCurrency;
    string targetCurrency;
    uint256 sourceValue;
    uint256 targetValue;
    string created;
}

struct DataTransportObject {
    uint256 id;
    string status;
    uint256 rate;
    string sourceCurrency;
    string targetCurrency;
    uint256 sourceValue;
    uint256 targetValue;
    string created;
}

interface IWiseTransferListV2 {
    function addTransfer(IWeb2Json.Proof calldata data) external;
    function getAllTransfers()
        external
        view
        returns (WiseTransfer[] memory);
}

contract WiseTransferListV2 {
    mapping(uint256 => WiseTransfer) public transfers;
    uint256[] public transferIds;

    function addTransfer(IWeb2Json.Proof calldata data) public {
        require(isJsonApiProofValid(data), "Invalid proof");

        DataTransportObject memory dto = abi.decode(
            data.data.responseBody.abiEncodedData,
            (DataTransportObject)
        );

        require(transfers[dto.id].id == 0, "Transfer already exists");

        WiseTransfer memory transfer = WiseTransfer({
            id: dto.id,
            status: dto.status,
            rate: dto.rate,
            sourceCurrency: dto.sourceCurrency,
            targetCurrency: dto.targetCurrency,
            sourceValue: dto.sourceValue,
            targetValue: dto.targetValue,
            created: dto.created
        });

        transfers[dto.id] = transfer;
        transferIds.push(dto.id);
    }

    function getAllTransfers()
        public
        view
        returns (WiseTransfer[] memory)
    {
        WiseTransfer[] memory result = new WiseTransfer[](
            transferIds.length
        );
        for (uint256 i = 0; i < transferIds.length; i++) {
            result[i] = transfers[transferIds[i]];
        }
        return result;
    }

    function abiSignatureHack(DataTransportObject calldata dto) public pure {}

    function isJsonApiProofValid(
        IWeb2Json.Proof calldata _proof
    ) private view returns (bool) {
        // Inline the check for now until we have an official contract deployed
        return ContractRegistry.getFdcVerification().verifyJsonApi(_proof);
    }
}
