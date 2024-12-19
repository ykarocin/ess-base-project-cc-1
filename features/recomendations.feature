Feature: Recomendação com base nas visualizações do usuário 
    As a usuário da plataforma
    I want to receber recomendções que sejam compatíveis com os meus gostos
    So that i can desfrutar das recomendações da plataforma
Scenario: Exibir recomendações para um usuário com histórico de visualizações
Given: Estou logado no plataforma como usuário
When: Acesso a tela inicial da plataforma
Then: Consigo Visualizar uma lista de título “For You” contendo as mídias “Homem Aranha, de volta ao lar”, “The Batman”, “The boys” e “Deadpool 2”
And: Consigo visualizar outra lista de título “For You” contendo as mídias “Anabelle 3”, “A Freira”, “Sorriso” e “A substância”