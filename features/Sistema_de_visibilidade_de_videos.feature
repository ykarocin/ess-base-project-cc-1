Feature: Sistema de Visibilidade de Vídeos

  As um usuário
  I want visualizar vídeos com uma interface de reprodução e interações
  So that eu possa assistir, curtir ou compartilhar os vídeos facilmente.


    Scenario: Compartilhar vídeo copiando a URL
    Given o usuário está na página de visualização do vídeo "Stranger Things - Episódio Piloto"
    When o usuário clica no botão "Compartilhar"
    And o usuário clica em "Copiar URL"
    Then a URL da página de visualização do vídeo "Stranger Things - Episódio Piloto" é copiada para a área de transferência
    And o usuário vê uma confirmação "URL copiada com sucesso!"
    
    Scenario: Registrar visualização no histórico ao acessar a página de visualização
    Given o usuário está logado na plataforma
    And o usuário possui o vídeo "The Office - Episódio 3" no banco de dados
    When o usuário clica no vídeo "The Office - Episódio 3"
    Then o usuário é redirecionado para a página de visualização do vídeo "The Office - Episódio 3"
    And "The Office - Episódio 3" aparece no topo da lista de histórico de visualizações do usuário