const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const fs = require('fs');
const path = require('path');

const menuPath = path.join(__dirname, './mensajes/menu.txt');
const menu = fs.existsSync(menuPath) ? fs.readFileSync(menuPath, 'utf8') : 'Menú no disponible.';

const ventasFlow = require('./flows/VentasFlow');

const saludo = addKeyword(EVENTS.WELCOME).addAnswer(
    'Hola, bienvenido, para acceder al menú escribe la palabra "*hola*".',
    {capture: true},
    async (ctx, {gotoFlow}) => {
        return gotoFlow(flowPrincipal);
    }
)

// Flujo principal
const flowPrincipal = addKeyword(['hola', 'Hola', 'alo'])
    .addAnswer(
        `Hola, bienvenido. ¿Qué opción deseas?🤖\n\n${menu}`,
        { capture: true },
        async (ctx, { gotoFlow, flowDynamic, fallBack }) => {
            console.log("Respuesta capturada en el flujo principal:", ctx.body);

            if (!["1", "2", "3", "4", "5", "0"].includes(ctx.body)) {
                return fallBack("Respuesta no válida, por favor selecciona una de las opciones.");
            }

            switch (ctx.body) {
                case "1":
                    return gotoFlow(ventasFlow);
                case "2":
                    return await flowDynamic("Has seleccionado la opción 2.");
                case "3":
                    return await flowDynamic("Has seleccionado la opción 3.");
                case "4":
                    return await flowDynamic("Has seleccionado la opción 4.");
                case "5":
                    return await flowDynamic("Has seleccionado la opción 5.");
                case "0":
                    return gotoFlow("Saliendo... Puedes volver a acceder a este menú escribiendo '*Menu*'.");
            }
        }
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([saludo, flowPrincipal, ventasFlow]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();

module.exports.flowPrincipal = flowPrincipal;