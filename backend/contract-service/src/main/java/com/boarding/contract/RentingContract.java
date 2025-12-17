package com.boarding.contract;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteCall;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

/**
 * <p>Auto generated code.
 * <p><strong>Do not modify!</strong>
 * <p>Please use the <a href="https://docs.web3j.io/command_line.html">web3j command line tools</a>,
 * or the org.web3j.codegen.SolidityFunctionWrapperGenerator in the 
 * <a href="https://github.com/hyperledger-web3j/web3j/tree/main/codegen">codegen module</a> to update.
 *
 * <p>Generated with web3j version 4.13.0.
 */
@SuppressWarnings("rawtypes")
public class RentingContract extends Contract {
    public static final String BINARY = "608060405234801561000f575f80fd5b506108978061001d5f395ff3fe608060405234801561000f575f80fd5b506004361061003f575f3560e01c806335817773146100435780638c5b838514610073578063ecb7b273146100a3575b5f80fd5b61005d600480360381019061005891906103e8565b6100bf565b60405161006a91906104a9565b60405180910390f35b61008d600480360381019061008891906103e8565b61016c565b60405161009a91906104a9565b60405180910390f35b6100bd60048036038101906100b891906104c9565b61021e565b005b60605f826040516100d09190610579565b908152602001604051809103902080546100e9906105bc565b80601f0160208091040260200160405190810160405280929190818152602001828054610115906105bc565b80156101605780601f1061013757610100808354040283529160200191610160565b820191905f5260205f20905b81548152906001019060200180831161014357829003601f168201915b50505050509050919050565b5f818051602081018201805184825260208301602085012081835280955050505050505f91509050805461019f906105bc565b80601f01602080910402602001604051908101604052809291908181526020018280546101cb906105bc565b80156102165780601f106101ed57610100808354040283529160200191610216565b820191905f5260205f20905b8154815290600101906020018083116101f957829003601f168201915b505050505081565b805f8360405161022e9190610579565b908152602001604051809103902090816102489190610792565b503373ffffffffffffffffffffffffffffffffffffffff167ff16295aa63179911800cb1d28cbdb031cdc0f71dced3ed9d106f1865ab6bdb7a8360405161028f91906104a9565b60405180910390a25050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6102fa826102b4565b810181811067ffffffffffffffff82111715610319576103186102c4565b5b80604052505050565b5f61032b61029b565b905061033782826102f1565b919050565b5f67ffffffffffffffff821115610356576103556102c4565b5b61035f826102b4565b9050602081019050919050565b828183375f83830152505050565b5f61038c6103878461033c565b610322565b9050828152602081018484840111156103a8576103a76102b0565b5b6103b384828561036c565b509392505050565b5f82601f8301126103cf576103ce6102ac565b5b81356103df84826020860161037a565b91505092915050565b5f602082840312156103fd576103fc6102a4565b5b5f82013567ffffffffffffffff81111561041a576104196102a8565b5b610426848285016103bb565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b8381101561046657808201518184015260208101905061044b565b5f8484015250505050565b5f61047b8261042f565b6104858185610439565b9350610495818560208601610449565b61049e816102b4565b840191505092915050565b5f6020820190508181035f8301526104c18184610471565b905092915050565b5f80604083850312156104df576104de6102a4565b5b5f83013567ffffffffffffffff8111156104fc576104fb6102a8565b5b610508858286016103bb565b925050602083013567ffffffffffffffff811115610529576105286102a8565b5b610535858286016103bb565b9150509250929050565b5f81905092915050565b5f6105538261042f565b61055d818561053f565b935061056d818560208601610449565b80840191505092915050565b5f6105848284610549565b915081905092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806105d357607f821691505b6020821081036105e6576105e561058f565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026106487fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261060d565b610652868361060d565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f61069661069161068c8461066a565b610673565b61066a565b9050919050565b5f819050919050565b6106af8361067c565b6106c36106bb8261069d565b848454610619565b825550505050565b5f90565b6106d76106cb565b6106e28184846106a6565b505050565b5b81811015610705576106fa5f826106cf565b6001810190506106e8565b5050565b601f82111561074a5761071b816105ec565b610724846105fe565b81016020851015610733578190505b61074761073f856105fe565b8301826106e7565b50505b505050565b5f82821c905092915050565b5f61076a5f198460080261074f565b1980831691505092915050565b5f610782838361075b565b9150826002028217905092915050565b61079b8261042f565b67ffffffffffffffff8111156107b4576107b36102c4565b5b6107be82546105bc565b6107c9828285610709565b5f60209050601f8311600181146107fa575f84156107e8578287015190505b6107f28582610777565b865550610859565b601f198416610808866105ec565b5f5b8281101561082f5784890151825560018201915060208501945060208101905061080a565b8683101561084c5784890151610848601f89168261075b565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220767f283f9b40d6ab842b6c39169bd58451b5c53e20732ab3294b9467d3d0080f64736f6c63430008140033";

    private static String librariesLinkedBinary;

    public static final String FUNC_CONTRACTS = "contracts";

    public static final String FUNC_GETCONTRACT = "getContract";

    public static final String FUNC_STORECONTRACT = "storeContract";

    public static final Event CONTRACTSIGNEDBYOWNER_EVENT = new Event("ContractSignedByOwner", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event CONTRACTSIGNEDBYRENTER_EVENT = new Event("ContractSignedByRenter", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    public static final Event CONTRACTSTORED_EVENT = new Event("ContractStored", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}, new TypeReference<Utf8String>() {}));
    ;

    @Deprecated
    protected RentingContract(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected RentingContract(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected RentingContract(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected RentingContract(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<ContractSignedByOwnerEventResponse> getContractSignedByOwnerEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(CONTRACTSIGNEDBYOWNER_EVENT, transactionReceipt);
        ArrayList<ContractSignedByOwnerEventResponse> responses = new ArrayList<ContractSignedByOwnerEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ContractSignedByOwnerEventResponse typedResponse = new ContractSignedByOwnerEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ContractSignedByOwnerEventResponse getContractSignedByOwnerEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CONTRACTSIGNEDBYOWNER_EVENT, log);
        ContractSignedByOwnerEventResponse typedResponse = new ContractSignedByOwnerEventResponse();
        typedResponse.log = log;
        typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ContractSignedByOwnerEventResponse> contractSignedByOwnerEventFlowable(
            EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getContractSignedByOwnerEventFromLog(log));
    }

    public Flowable<ContractSignedByOwnerEventResponse> contractSignedByOwnerEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CONTRACTSIGNEDBYOWNER_EVENT));
        return contractSignedByOwnerEventFlowable(filter);
    }

    public static List<ContractSignedByRenterEventResponse> getContractSignedByRenterEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(CONTRACTSIGNEDBYRENTER_EVENT, transactionReceipt);
        ArrayList<ContractSignedByRenterEventResponse> responses = new ArrayList<ContractSignedByRenterEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ContractSignedByRenterEventResponse typedResponse = new ContractSignedByRenterEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ContractSignedByRenterEventResponse getContractSignedByRenterEventFromLog(
            Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CONTRACTSIGNEDBYRENTER_EVENT, log);
        ContractSignedByRenterEventResponse typedResponse = new ContractSignedByRenterEventResponse();
        typedResponse.log = log;
        typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ContractSignedByRenterEventResponse> contractSignedByRenterEventFlowable(
            EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getContractSignedByRenterEventFromLog(log));
    }

    public Flowable<ContractSignedByRenterEventResponse> contractSignedByRenterEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CONTRACTSIGNEDBYRENTER_EVENT));
        return contractSignedByRenterEventFlowable(filter);
    }

    public static List<ContractStoredEventResponse> getContractStoredEvents(
            TransactionReceipt transactionReceipt) {
        List<Contract.EventValuesWithLog> valueList = staticExtractEventParametersWithLog(CONTRACTSTORED_EVENT, transactionReceipt);
        ArrayList<ContractStoredEventResponse> responses = new ArrayList<ContractStoredEventResponse>(valueList.size());
        for (Contract.EventValuesWithLog eventValues : valueList) {
            ContractStoredEventResponse typedResponse = new ContractStoredEventResponse();
            typedResponse.log = eventValues.getLog();
            typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
            typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
            responses.add(typedResponse);
        }
        return responses;
    }

    public static ContractStoredEventResponse getContractStoredEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CONTRACTSTORED_EVENT, log);
        ContractStoredEventResponse typedResponse = new ContractStoredEventResponse();
        typedResponse.log = log;
        typedResponse.account = (String) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.contractId = (String) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<ContractStoredEventResponse> contractStoredEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getContractStoredEventFromLog(log));
    }

    public Flowable<ContractStoredEventResponse> contractStoredEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CONTRACTSTORED_EVENT));
        return contractStoredEventFlowable(filter);
    }

    public RemoteFunctionCall<String> contracts(String param0) {
        final Function function = new Function(FUNC_CONTRACTS, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(param0)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<String> getContract(String contractId) {
        final Function function = new Function(FUNC_GETCONTRACT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(contractId)), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Utf8String>() {}));
        return executeRemoteCallSingleValueReturn(function, String.class);
    }

    public RemoteFunctionCall<TransactionReceipt> storeContract(String contractId,
            String contractHash) {
        final Function function = new Function(
                FUNC_STORECONTRACT, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.Utf8String(contractId), 
                new org.web3j.abi.datatypes.Utf8String(contractHash)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    @Deprecated
    public static RentingContract load(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new RentingContract(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static RentingContract load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new RentingContract(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static RentingContract load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new RentingContract(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static RentingContract load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new RentingContract(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static RemoteCall<RentingContract> deploy(Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return deployRemoteCall(RentingContract.class, web3j, credentials, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<RentingContract> deploy(Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(RentingContract.class, web3j, credentials, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    public static RemoteCall<RentingContract> deploy(Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return deployRemoteCall(RentingContract.class, web3j, transactionManager, contractGasProvider, getDeploymentBinary(), "");
    }

    @Deprecated
    public static RemoteCall<RentingContract> deploy(Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return deployRemoteCall(RentingContract.class, web3j, transactionManager, gasPrice, gasLimit, getDeploymentBinary(), "");
    }

    public static void linkLibraries(List<Contract.LinkReference> references) {
        librariesLinkedBinary = linkBinaryWithReferences(BINARY, references);
    }

    private static String getDeploymentBinary() {
        if (librariesLinkedBinary != null) {
            return librariesLinkedBinary;
        } else {
            return BINARY;
        }
    }

    public static class ContractSignedByOwnerEventResponse extends BaseEventResponse {
        public String account;

        public String contractId;
    }

    public static class ContractSignedByRenterEventResponse extends BaseEventResponse {
        public String account;

        public String contractId;
    }

    public static class ContractStoredEventResponse extends BaseEventResponse {
        public String account;

        public String contractId;
    }
}
