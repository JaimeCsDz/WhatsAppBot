const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const fs = require('fs');
const path = require('path');

// Cargar el menú de la categoría ventas
const menuPath = path.join(__dirname, '../mensajes/ventas.txt');
const menu = fs.existsSync(menuPath) ? fs.readFileSync(menuPath, 'utf8') : 'Menú no disponible.';

//Archivos de texto categorias ventas
const cancelarPath = path.join(__dirname, '../mensajes/ventas/cancelarVenta.txt');
const cancelarVenta = fs.existsSync(cancelarPath) ? fs.readFileSync(cancelarPath, 'utf8') : 'Menú no disponible.';

//Archivos de texto categorias ventas
const abrirPath = path.join(__dirname, '../mensajes/ventas/abrirVenta.txt');
const abrirVenta = fs.existsSync(abrirPath) ? fs.readFileSync(abrirPath, 'utf8') : 'Menú no disponible.';

//Archivos de texto categorias ventas
const ordenesPath = path.join(__dirname, '../mensajes/ventas/ordenVenta.txt');
const ordenVenta = fs.existsSync(ordenesPath) ? fs.readFileSync(ordenesPath, 'utf8') : 'Menú no disponible.';


const ventasFlow = addKeyword(EVENTS.ACTION).addAnswer(
    menu,
    { capture: true },
    async (ctx, { gotoFlow, fallBack, flowDynamic }) => {
        if (!["1", "2", "3", "0"].includes(ctx.body)) {
            return fallBack(
                "Respuesta no válida, por favor selecciona una de las opciones."
            );
        }
    switch (ctx.body) {
        case "1":
            return await flowDynamic(cancelarVenta);
        case "2":
            return await flowDynamic(abrirVenta);
        case "3":
            return await flowDynamic(ordenVenta);
        case "0":
            return gotoFlow(require('../app').flowPrincipal);
        }
    }
)

module.exports = ventasFlow;
