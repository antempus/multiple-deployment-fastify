import fastifyAuth from '@fastify/auth'

export default async (instance) => {
    instance.decorate('betaAuth', async function (request, reply) {
        instance.log.debug(`betaAuth hit for ${request.url}`)
    }).register(fastifyAuth).after(() => {
        instance
            // on request hook is called before the route handler for routes instantiated by this instance, after this point
            .addHook('onRequest', instance.auth([instance.betaAuth]))
            .route({
                method: "GET",
                url: '/beta',
                handler: (_, reply) => {
                    reply.send("hello from beta")
                }
            })
    })
}