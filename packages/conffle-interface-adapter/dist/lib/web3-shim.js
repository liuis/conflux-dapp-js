"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("../Config");
const conflux_web_1 = __importDefault(require("conflux-web"));
const providers_1 = require("conflux-web/providers");
Config_1.catProd.info("Provider:" + providers_1.Provider);
//import { EthereumDefinition } from "./ethereum-overloads";
const conflux_overloads_1 = require("./conflux-overloads");
const quorum_overloads_1 = require("./quorum-overloads");
const fabric_evm_overloads_1 = require("./fabric-evm-overloads");
const initInterface = (web3Shim) => __awaiter(this, void 0, void 0, function* () {
    const networkTypes = new Map(Object.entries({
        //     "ethereum": EthereumDefinition,
        "conflux": conflux_overloads_1.ConfluxDefinition,
        "quorum": quorum_overloads_1.QuorumDefinition,
        "fabric-evm": fabric_evm_overloads_1.FabricEvmDefinition
    }));
    networkTypes.get(web3Shim.networkType).initNetworkType(web3Shim);
});
;
// March 14, 2019 - Mike Seese:
// This shim was intended to be temporary (see the above comment)
// with the idea of a more robust implementation. That implementation
// would essentially take this shim and include it under the
// ethereum/apis/web3 (or something like that) structure.
// I chose to extend/inherit web3 here to keep scope minimal for
// getting web3 to behave with Quorum and AxCore (future/concurrent PR).
// I wanted to do as little changing to the original Truffle codebase, and
// for it to still expect a web3 instance. Otherwise, the scope of these
// quick support work would be high. The "Web3Shim" is a shim for only
// web3.js, and it was not intended to serve as the general purpose
// truffle <=> all DLTs adapter. We have other commitments currently that
// should drive the development of the correct architecture of
// `truffle-conflux-interface-adapter`that should use this work in a more
// sane and organized manner.
class Web3Shim extends conflux_web_1.default {
    constructor(options) {
        super();
        if (options) {
            this.networkType = options.networkType || "conflux";
            if (options.provider) {
                this.setProvider(options.provider);
            }
        }
        else {
            this.networkType = "conflux";
        }
        initInterface(this);
    }
    setNetworkType(networkType) {
        this.networkType = networkType;
        initInterface(this);
    }
}
exports.Web3Shim = Web3Shim;
;
//# sourceMappingURL=web3-shim.js.map