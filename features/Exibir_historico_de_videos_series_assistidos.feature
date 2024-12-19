Feature: Exibir Histórico de Vídeos/Séries Assistidos e Assistidos Recentemente

  As a usuário
  I want Quero ver meu histórico de vídeos e séries assistidos
  So that eu possa acompanhar o que assisti e ver os itens assistidos recentemente


    Scenario: Registrar visualização ao acessar a página do vídeo
    Given o usuário está logado na plataforma
    And o usuário está na página inicial
    When o usuário seleciona e acessa o vídeo "Breaking Bad - Episódio 1"
    Then o usuário é redirecionado para a página de visualização do vídeo "Breaking Bad - Episódio 1"
    And "Breaking Bad - Episódio 1" aparece no topo do histórico de visualizações do usuário

	Scenario: Exibir mensagem padrão para usuários sem histórico de visualizações
    Given o usuário está logado na plataforma
    And o usuário nunca assistiu a nenhum vídeo/série
    When o usuário acessa a página de histórico de visualizações
    Then o sistema exibe a mensagem "Você ainda não assistiu a nenhum vídeo."
    And o sistema recomenda o vídeo mais assistido da plataforma "Stranger Things - Episódio Piloto"
