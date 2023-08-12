import 'dotenv/config'

import fastify from 'fastify'
import fastifyAuth from '@fastify/auth'
import services from './src/complex/index.mjs'


const app = fastify({
    logger: {
        level: 'debug'
    }
})
app.route({
    method: "GET",
    url: "/health",
    handler: (_, reply) => {
        reply.send({ message: "it's alive" });
    },
})
app.register(async instance => {
    // isloates the routes from the rest of the app so that we can avoid the auth
    // this decorated function will only be part of the lifecycle of the routes defined in this instance
    instance.decorate('passThrough', async function (request, reply) {
        instance.log.info(`passing through ${request.url}`)
    })
        // sets up auth plugin
        .register(fastifyAuth)
        // after allows for the previous plugins to be registered before routes are defined
        .after(() => {
            instance
                // on request hook is called before the route handler for routes instantiated by this instance, after this point
                .addHook('onRequest', instance.auth([instance.passThrough]))
                .route({
                    method: "GET",
                    url: "/info",
                    handler: (_, reply) => {
                        reply.send({ message: `${process.env.TZ}` });
                    },
                })
        })
})

// segmented routes
app.register(async instance => {
    // setup generic auth
    for (const service in services) {
        const { enableVar, registerFunction, name } = services[service]
        if (process.env[enableVar]) {
            app.log.info(`Registering ${name}`)
            registerFunction(instance)
            continue;
        }
        app.log.info(`Skipping ${name}`)
    }
})

app.listen({ port: 3000 }, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
})