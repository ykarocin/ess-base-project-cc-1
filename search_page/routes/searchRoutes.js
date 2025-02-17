const express = require('express');
const router = express.Router();

const filmes = [
    { titulo: "Vingadores", genero: "Ação", avaliacao: 8.5, ano: 2012 },
    { titulo: "Homem-Aranha", genero: "Ação", avaliacao: 7.8, ano: 2002 },
    { titulo: "Deadpool", genero: "Comédia", avaliacao: 8.0, ano: 2016 },
    { titulo: "Parasita", genero: "Drama", avaliacao: 8.6, ano: 2019 },
    { titulo: "A Culpa é das Estrelas", genero: "Romance", avaliacao: 7.7, ano: 2014 },
    { titulo: "Titanic", genero: "Romance", avaliacao: 8.0, ano: 1997 },
    { titulo: "Coringa", genero: "Drama", avaliacao: 8.4, ano: 2019 }
];

router.get("/", (req, res) => {
  let { genero, avaliacao_min, ano } = req.query;

  let resultados = filmes;

  if (genero) {
    resultados = resultados.filter(filme => filme.genero.toLowerCase() === genero.toLowerCase());
  }
  if (avaliacao_min) {
    resultados = resultados.filter(filme => filme.avaliacao >= parseFloat(avaliacao_min));
  }
  if (ano) {
    resultados = resultados.filter(filme => filme.ano === parseInt(ano));
  }

  res.json({ resultados, total: resultados.length });
});

module.exports = router;
