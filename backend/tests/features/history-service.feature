Feature: History Service

Scenario: Return all history for a user
  Given o método getHistory do HistoryService retorna um array com os itens de vídeo com videoIds "101", "203" e "402" para o usuário "1"
  When o método getHistory do HistoryService for chamado com o id do usuário "1"
  Then o array retornado deve conter a lista com os ids "101", "203" e "402"

Scenario: Return history item by video id for a user
  Given o método getHistoryItem chamado com "1" para o usuário "1" do HistoryService retorna um item com videoId "101"
  When o método getHistoryItem do HistoryService for chamado com o id "101"
  Then o item retornado deve ter videoId "101"

Scenario: Add history for a user
  Given existe um usuário com id "3" cadastrado no sistema
  And esse usuário não possui o vídeo "201" no histórico
  When faço uma requisição PUT para "/users/3/history" com o corpo:
    """
    {
      "videoId": "201",
      "titulo": "The Office - Episódio 3"
    }
    """
  Then o status da resposta deve ser "201 Created"
  And o corpo da resposta (JSON) contém "Vídeo adicionado ao histórico"
  And agora o histórico do usuário com id "3" possui o id "201"

Scenario: Update history for a user
  Given existe um usuário com id "3" que já possui o vídeo "201" no histórico
  When faço uma requisição PUT para "/users/3/history" com o corpo:
    """
    {
      "videoId": "201",
      "titulo": "The Office - Episódio 3"
    }
    """
  Then o status da resposta deve ser "200 OK"
  And o corpo da resposta (JSON) contém "Data de visualização atualizada"
