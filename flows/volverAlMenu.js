const { addKeyword } = require('@bot-whatsapp/bot');

// Nuevo flujo para volver al menú principal
const volverAlMenuFlow = addKeyword('0')
    .addAnswer(
        "Saliendo... Puedes volver a acceder a este menú escribiendo '*hola*'.",
        { capture: true },
        async (ctx, { gotoFlow }) => {
            return gotoFlow(require('../app').flowPrincipal);  // Volver al flujo principal
        }
    );

module.exports = volverAlMenuFlow;
