Feature: Curtir
    As a usuário do plataforma
    I want to expressar minha preferência por conteúdos específicos
    So that i can acessar esse conteúdo posteriormente e receber melhores recomendações

Scenario: Clicar no botão de curtida
	Given Estou logado no plataforma como usuário
	And Estou com a série “The Boys” selecionada
	When Clico no botão de curtir
    And Acesso a lista "videos curtidos"
    Then A série "The Boys" está presente na lista

Scenario: Clicar novamente no botão de curtida
	Given Estou logado no plataforma como usuário
	And Estou com a série “The Boys” selecionada
    And a série "The Boys" está na lista de videos curtidos
	When Clico no botão de curtir
    Then Acesso a lista de videos curtidos
    And A série "The Boys" não está na lista de videos curtidos (correção simbólica adicionada)