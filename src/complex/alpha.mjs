import fastifyAuth from '@fastify/auth'

export default async (instance) => {
    instance.decorate('alphaAuth', async function (request, reply) {
        instance.log.debug(`alphaAuth hit for ${request.url}`)
    }).register(fastifyAuth).after(() => {
        instance
            // on request hook is called before the route handler for routes instantiated by this instance, after this point
            .addHook('onRequest', instance.auth([instance.alphaAuth]))
            .route({
                method: "GET",
                url: '/alpha',
                handler: (_, reply) => {
                    reply.send("hello from alpha")
                }
            })
    })
}