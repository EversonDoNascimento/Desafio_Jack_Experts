import { execSync } from "child_process";
// Configurando o banco de dados de teste
const setupTestDatabase = async () => {
  try {
    // Sempre que o comando de teste rodar o prisma irá resetar o banco de dados
    // Isso evita possíveis conflitos de dados existentes
    console.log("Resetando banco de dados de teste...");
    execSync("npx prisma migrate reset --force --skip-generate --skip-seed");
  } catch (error) {
    // Caso algum erro ocorra
    console.error("Erro ao configurar o banco de dados de teste:", error);
    process.exit(1);
  }
};

setupTestDatabase();
