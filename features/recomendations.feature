Feature: Recomendação com base nas visualizações do usuário 
    As a usuário da plataforma
    I want to receber recomendções que sejam compatíveis com os meus gostos
    So that i can desfrutar das recomendações da plataforma
Scenario: Exibir recomendações para um usuário com histórico de visualizações
Given Estou logado no plataforma como usuário
When Acesso a tela inicial da plataforma
Then Consigo visualizar uma lista de título “For You” contendo as mídias “Homem Aranha, de volta ao lar”, “The Batman”, “The boys” e “Deadpool 2”
And Consigo visualizar outra lista de título “For You” contendo as mídias “Anabelle 3”, “A Freira”, “Sorriso” e “A substância”
alteração provispria

Cenário 2: Exibir recomendações para um usuário sem histórico de visualizações
Given Estou logado como usuário
And Não possuo histórico de visualizações an plataforma 
When Acesso a tela inicial da plataforma
Then Visualizo a mensagem “Seja bem-vindo à plataforma, atualmente as suas recomendações estão usando métricas gerais dos nossos usuários. Elas vão ficar cada vez mais a sua cara com o passar do tempo :)”
And Consigo Visualizar uma lista de título “For You” contendo as mídias “Moana 2”, “Zootopia”, “The Soul”, “Valente” e “Enrolados”
And Consigo Visualizar  outra lista de título “For You” contendo as mídias “Robin-Hood - A origem”, “Uncharted - Fora do mapa”, “Os caçadores da arca perdida” e “Dungeons & Dragons - Honra entre rebeldes”