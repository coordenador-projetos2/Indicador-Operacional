# Painel Operacional

Painel web para exibição contínua de indicadores/apresentações em TV.

## Estrutura

- `index.html` — página principal.
- `css/style.css` — aparência do painel.
- `js/config.js` — configurações que normalmente serão alteradas.
- `js/app.js` — lógica do painel.
- `slides/` — imagens exibidas.
- `assets/` — arquivos auxiliares.

## Como adicionar ou trocar slides

1. Coloque a imagem dentro de `slides/`.
2. Abra `js/config.js`.
3. Adicione o nome do arquivo no array `slides`.
4. Salve e publique.

Exemplo:

```js
slides: [
    "Slide1.png",
    "Slide2.png",
    "Slide6.png"
]
```

## Como alterar o tempo

Em `js/config.js`:

```js
tempoSlide: 10000
```

- `5000` = 5 segundos
- `10000` = 10 segundos
- `15000` = 15 segundos
- `30000` = 30 segundos

## Atualização automática

Por padrão, a página recarrega a cada 30 minutos:

```js
atualizacaoAutomatica: true,
tempoAtualizacao: 1800000
```

## Tela da TV

O projeto tenta usar a Screen Wake Lock API para manter a tela ativa quando o navegador permitir.

Importante: TVs LG/webOS podem aplicar o próprio comportamento de screensaver. O Wake Lock não deve ser tratado como garantia universal. Para uso em produção, testar no modelo e versão de webOS da TV.

## Publicação

O projeto é estático e pode ser publicado em serviços de hospedagem estática, como Netlify ou GitHub Pages.

## Próxima evolução

A próxima versão pode mover a configuração dos slides para um `config.json`, permitindo atualizar a programação sem editar a lógica do painel.
