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