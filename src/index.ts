
import fastify from './fastify'
import { handler as onboardingRegister } from './routes/onboarding/register'
import { handler as onboardingVerify } from './routes/onboarding/verify'
import { handler as recover } from './routes/recover/recover'
import { handler as recoverVerify } from './routes/recover/verify'
import { initializeFirebase } from './service/database/firebase'


//! Views
fastify.get('/', (request, reply) => {
    reply.view("/templates/index.ejs");
})
fastify.get('/recover', (request, reply) => {
    reply.view("/templates/recover.ejs", {
        LSP11ContractAddress: (request.query as any).LSP11ContractAddress,
        newOwner: (request.query as any).newOwner
    });
})

fastify.get('/onboarding', (request, reply) => {
    reply.view("/templates/onboarding.ejs", {
        LSP11ContractAddress: (request.query as any).LSP11ContractAddress
    });
})

fastify.get('/info', (request, reply) => {
    reply.send({ name: 'authy', endpoint: 'http://localhost:3000' })
})

//! API
fastify.post('/api/onboarding/register', onboardingRegister)
fastify.post('/api/onboarding/verify', onboardingVerify)

fastify.post('/api/recover', recover)
fastify.post('/api/recover/verify', recoverVerify)

const port: any = process.env.PORT || 3000
console.log(`Starting server on port ${port}`)

fastify.listen({ port, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
    initializeFirebase()
})

export const app = fastify