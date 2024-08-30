// jest.setup.js
// Garantindo que no momento do teste a variável de ambiente utilizada seja a que contém as informações do banco de teste
require("dotenv").config({ path: ".env.test" });
