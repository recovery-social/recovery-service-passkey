import { FastifyReply, FastifyRequest } from "fastify"
import { get, update } from "../../service/database"
import {
    generateAuthenticationOptions,
} from '@simplewebauthn/server';


export const handler = async (request: FastifyRequest, reply: FastifyReply) => {

    const { LSP11ContractAddress, newOwner } = request.body as any


    if (!LSP11ContractAddress) {
        return reply.status(400).send({ error: 'LSP11ContractAddress not provided' })
    }


    const user = await get('LSP11ContractAddresses', LSP11ContractAddress)

    if (!user) {
        return reply.status(400).send({ error: 'LSP11ContractAddress not found' })
    }

    const options = generateAuthenticationOptions({
        allowCredentials: user?.authenticators?.map(authenticator => ({
            id: authenticator.credentialID,
            type: 'public-key',
            transports: authenticator.transports,
        })),
        userVerification: 'preferred',
    });

    await update('LSP11ContractAddresses', LSP11ContractAddress, {
        currentChallenge: options.challenge
    });

    return options;
}