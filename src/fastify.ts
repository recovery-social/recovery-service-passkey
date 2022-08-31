import * as view from '@fastify/view';
import Fastify from 'fastify'
import fastifyEnv from '@fastify/env'
const path = require('path')

const fastify = Fastify({
    logger: true
})

fastify.register(require("@fastify/view"), {
    engine: {
        ejs: require("ejs"),
    },
});

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'assets'),
    prefix: '/assets/', // optional: default '/'
})

const schema = {
    type: 'object',
    required: ['PORT'],
    properties: {
        PORT: {
            type: 'string',
            default: 3000
        }
    }
}

const options = {
    confKey: 'config', // optional, default: 'config'
    schema: schema,
    dotenv: true
}

fastify.register(fastifyEnv, options)


// Declaration merging
declare module 'fastify' {
    export interface FastifyInstance {
        config: {}
        view: view.PointOfViewOptions

    }
}


export default fastify