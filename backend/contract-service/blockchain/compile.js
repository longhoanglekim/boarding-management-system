const path = require('path');
const fs = require('fs');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts', 'RentingContract.sol');
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'RentingContract.sol': {
            content: source
        }
    },
    settings: {
        // Dòng được THÊM vào để tương thích với Ganache EVM cũ:
        evmVersion: 'istanbul',
        // -------------------------------------------------------------
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
module.exports = output.contracts['RentingContract.sol']['RentingContract'];