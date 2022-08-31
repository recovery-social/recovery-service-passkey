//import { isValidChecksumAddress, unpadBuffer, BN } from 'ethereumjs-util'
const { privateToAddress } = require("ethereumjs-utils");
import { ethers } from "ethers";
import crypto from "crypto";


export const createPrivatePublicKey = () => {
    const pvtKey = crypto.randomBytes(32);
    const pvtKeyString = pvtKey.toString("hex");
    const pubKeyString = ethers.utils.getAddress(
        privateToAddress(pvtKey).toString("hex"));
    console.log({ pubKeyString, pvtKeyString });
    return { pubKeyString, pvtKeyString };
}