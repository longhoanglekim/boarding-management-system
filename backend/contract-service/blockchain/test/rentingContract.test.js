const assert = require('assert');
const ganache = require('ganache-cli');
// Sử dụng Web3 từ thư viện web3
const {Web3} = require('web3');
const web3 = new Web3(ganache.provider());
// Import ABI và EVM (Bytecode) đã biên dịch
const {abi, evm} = require('../compile.js');

let accounts;
let rentingContract;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    // Khởi tạo và Triển khai Contract
    rentingContract = await new web3.eth.Contract(abi)
        .deploy({data : evm.bytecode.object})
        .send({
            from : accounts[0],
            // 💡 SỬA: Đặt Gas Limit ở mức an toàn, dưới giới hạn Block của Ganache
            gas : '5000000',
            // GasPrice: Thường không cần thiết trên Ganache mới, nhưng để an toàn,
            // nên đặt một giá trị hợp lý theo đơn vị Wei.
            gasPrice : '5000000000' // 5 Gwei
        });
})

describe("Test renting contract", () => {
    it("deploy a contract", () => {
        // Kiểm tra xem contract đã được triển khai thành công chưa
        assert.ok(rentingContract.options.address, "Contract deployment failed: Address not found.");
        console.log("Contract deployed successfully at address:", rentingContract.options.address);
        console.log(rentingContract)
    })
})