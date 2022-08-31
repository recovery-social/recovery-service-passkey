
import { FastifyReply, FastifyRequest } from "fastify"
import { get, update } from "../../service/database"
import { verifyRegistrationResponse } from "@simplewebauthn/server"
import { rpID, origin } from "../../service/webauthn/constants"
import { FieldValue } from "firebase-admin/firestore";

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const { LSP11ContractAddress, body } = request.body as any

    const user: UserModel | null = await get('LSP11ContractAddresses', LSP11ContractAddress)

    if (!user) {
        return reply.status(400).send({ error: 'LSP11ContractAddress not found' })
    }

    if (!user.currentChallenge) {
        return reply.status(400).send({ error: 'no challenge in process' })
    }

    const expectedChallenge: string = user.currentChallenge;

    let verification;
    try {
        verification = await verifyRegistrationResponse({
            credential: body,
            expectedChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
        });
    } catch (error: any) {
        console.error(error);
        return reply.status(400).send({ error: error.message });
    }


    if (verification.verified && verification.registrationInfo) {
        const { credentialPublicKey, credentialID, counter } = verification.registrationInfo;

        const newAuthenticator: Authenticator = {
            credentialID,
            credentialPublicKey,
            counter,
        };

        await update('LSP11ContractAddresses', LSP11ContractAddress, {
            authenticators: FieldValue.arrayUnion(newAuthenticator)
        })
    }

    return { verified: true, pubKeyString: user.pubKeyString }
}