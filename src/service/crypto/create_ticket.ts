
const {
  keccak256,
  toBuffer,
  ecsign,
  bufferToHex,
} = require("ethereumjs-utils");
import { ethers } from 'ethers';





function createTicket(hash: any, signerPvtKey: any) {
  return ecsign(hash, signerPvtKey);
}

function generateHashBuffer(typesArray: any, valueArray: any) {
  return keccak256(
    toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
      valueArray))
  );
}

function serializeTicket(ticket: any) {
  return {
    r: bufferToHex(ticket.r),
    s: bufferToHex(ticket.s),
    v: ticket.v,
  };
}

export const createTicketForRecovery = (newAccount: string, signerPvtKey: string) => {

  const privateKey = Buffer.from(signerPvtKey, 'hex')

  const hashBuffer = generateHashBuffer(
    ["address"],
    [newAccount]
  );
  const ticket = createTicket(hashBuffer, privateKey);

  return { ticket }
}





