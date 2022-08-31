
import { FastifyReply, FastifyRequest } from "fastify"
import { get, update } from "../../service/database"
import { verifyAuthenticationResponse } from "@simplewebauthn/server"
import { rpID, origin } from "../../service/webauthn/constants"
import { createTicketForRecovery } from "../../service/crypto/create_ticket"

export const handler = async (request: FastifyRequest, reply: FastifyReply) => {
    const { LSP11ContractAddress, newOwner, body } = request.body as any

    const user: UserModel | null = await get('LSP11ContractAddresses', LSP11ContractAddress)

    if (!user) {
        return reply.status(400).send({ error: 'LSP11ContractAddress not found' })
    }

    if (!user.currentChallenge) {
        return reply.status(400).send({ error: 'no challenge in process' })
    }

    const authenticator: Authenticator | undefined = user.authenticators?.find(x => {
        console.log(x.credentialID, x.credentialID.toString('base64url'))
        console.log(body.id)
        return x.credentialID.toString('base64url') === body.id
    })

    if (!authenticator) {
        return reply.status(400).send({ error: 'authenticator not found' })
    }

    let verification;
    try {
        verification = await verifyAuthenticationResponse({
            credential: body,
            expectedChallenge: user.currentChallenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            authenticator,
        });
    } catch (error: any) {
        console.error(error);
        return reply.status(400).send({ error: error.message });
    }


    if (verification.verified && verification.authenticationInfo) {

        authenticator.counter = verification.authenticationInfo.newCounter

        await update('LSP11ContractAddresses', LSP11ContractAddress, {
            authenticators: user.authenticators
        })
        const { ticket } = createTicketForRecovery(newOwner, user.pvtKeyString!)
        return { ticket }
    }

    return reply.code(401).send({ error: 'not verified' })
}