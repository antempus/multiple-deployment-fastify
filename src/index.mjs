const services = {
    alpha: {
        name: 'alpha',
        enableVar: 'ENABLE_ALPHA',
        registerFunction: async (instance) => {
            instance.register(import('./alpha.mjs'))
        }
    },
    beta: {
        name: 'beta',
        enableVar: 'ENABLE_BETA',
        registerFunction: async (instance) => {
            instance.register(import('./beta.mjs'))
        }
    }
}
export default services