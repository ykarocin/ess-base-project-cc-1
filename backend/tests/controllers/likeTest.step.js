import { loadFeature, defineFeature } from "jest-cucumber";
import supertest from "supertest";
import fs from "fs";
import path from "path";
import { app } from "../../src/app";

const feature = loadFeature("tests/features/like.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    let response;
    let usersData;

    beforeAll(() => {
        // Carregar os dados do users.json antes dos testes
        const filePath = path.resolve("./src/database/users.json");
        usersData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });

    test("Obter a lista de séries curtidas pelo usuário", ({ given, when, then, and }) => {
        
        given(/^O usuário "(.*)" está logado no sistema$/, (userName) => {
            // Verifica se o usuário existe no JSON
            const userExists = usersData.some(user => user.user === userName);
            expect(userExists).toBe(true); // O teste falhará se o usuário não existir
        });

        when(/^Uma requisição “GET” é enviada para “\/user\/seriesCurtidas\/(.*)”$/, async (userId) => {
            response = await request.get(`/user/seriesCurtidas/${userId}`);
        });

        then(/^O status da resposta deve ser “200”$/, () => {
            expect(response.status).toBe(200);
        });

        and(/^O JSON da resposta contém a lista “séries curtidas”$/, () => {
            expect(response.body).toHaveProperty("Séries Curtidas");
        });

        and(/^A lista contém o item “(.*)”$/, (serie) => {
            expect(response.body["Séries Curtidas"]).toContain(serie);
        });
    });
});
