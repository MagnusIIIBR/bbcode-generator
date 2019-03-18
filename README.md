[align=center][b]Funcionalidades[/b]:[/align]
[b]------ FILMES/SÉRIES/EPISÓDIOS[/b]
- Gera o cabeçalho do filme contendo: Título original, Título traduzido e o ano de lançamento.
- Insere a capa/poster.
- Insere a Sinopse em PT-BR (há casos que a sinopse pode vir vazia por falta de sinopse no TMDb)
- Insere as críticas do filme bem como suas respectivas notas sendo elas de 3 fontes: IMDb, Rotten Tomatoes e Metacritic
- Insere o elenco do filme (Atores, atrizes e diretores)
- Valida se o código inserido é pertencente ao tipo de geração selecionada
- Pesquisa do filme com base no código do IMDb 
- Gerar BBCode

[b]--- Funcionalidades específicas para Filme:[/b]
- Insere informações do filme tais como: Data de lançamento, Tempo de Filme, Produtora, País de Origem, Gêneros (em inglês), Site do Filme

[b]--- Funcionalidades específicas para Série:[/b]
- Insere informações da série tais como: Data de lançamento, Tempo, País de Origem, Gêneros (em inglês), Site

[b]--- Funcionalidades específicas para Episódio:[/b]
- Insere informações da série tais como: Data de lançamento, Temporada, Episódio, Tempo, País de Origem, Gêneros (em inglês), Site

[b]------ Jogos de PC / STEAM[/b]
- Gera o cabeçalho do filme contendo: Título original e o ano de lançamento.
- Insere a capa.
- Insere a Sinopse em PT-BR (há casos que a sinopse pode vir em inglês por falta de tradução)
- Insere a crítica do jogo baseada no Metacritic
- Insere as informações do jogo (Data de lançamento, gêneros, publicadores, desenvolvedores, preço na loja STEAM, site)
- Insere imagens do jogo
- Pesquisa do jogo com base no código da STEAM 
- Gerar BBCode

[b]------ Aplicativos/Jogos da Google Play Store[/b]
- Gera o cabeçalho do filme contendo: Título original .
- Insere a capa.
- Insere a Sinopse em PT-BR (há casos que a sinopse pode vir em inglês por falta de tradução)
- Insere a crítica do aplicativo/jogo baseado na loja Play Store
- Insere as informações do jogo (Data de lançamento, gêneros, desenvolvedores, preço na loja Play Store, site)
- Insere imagens do aplicativo/jogo
- Pesquisa do jogo com base no código da Play Store 
- Gerar BBCode


[b]Como utilizar:[/b]
Filmes/Series/Episódios
1- Entrar no link do Gerador
2- Escolher no dropdown a opção que deseja gerar e apertar em escolher
3- Digite o código IMDb e aperte novamente em escolher (Código IMDb ele está na URL, ex: [url=https://www.imdb.com/title/tt0416449/]300[/url] o código é o tt0416449
4- Irá aparecer um botão Gerar BBCode, aperte nele
5- Irá aparecer um campo abaixo do botão com o BBCode gerado, copie ele para o texto da sua postagem

Jogos (Steam)
1- Entrar no link do Gerador
2- Escolher no dropdown a opção que deseja gerar e apertar em escolher
3- Digite o código Steam e aperte novamente em escolher (Código Steam ele está na URL, ex: [url=https://store.steampowered.com/app/601150/Devil_May_Cry_5/]Devil May Cry 5[/url] o código é o 601150- Irá aparecer um botão Gerar BBCode, aperte nele
5- Irá aparecer um campo abaixo do botão com o BBCode gerado, copie ele para o texto da sua postagem

Apps/Jogos (Google Play Store)
1- Entrar no link do Gerador
2- Escolher no dropdown a opção que deseja gerar e apertar em escolher
3- Digite o código Play Store e aperte novamente em escolher (Código Play Store ele está na URL, ex: [url=https://play.google.com/store/apps/details?id=com.chucklefish.stardewvalley]Stardew Valley[/url] o código é o com.chucklefish.stardewvalley- Irá aparecer um botão Gerar BBCode, aperte nele
5- Irá aparecer um campo abaixo do botão com o BBCode gerado, copie ele para o texto da sua postagem

Changelog: 
1.0.0: 
- Primeira versão estável
- Gera apenas Filmes

1.1.0: 
- Adicionado a geração de Séries
- Adicionado a geração de Episódios de Séries
- Inserido novas validações para caso o tipo de geração seja diferente do que o código IMDb retornou

1.1.1: 
- Adicionado a geração de Séries
- Adicionado a geração de Episódios de Séries
- Inserido novas validações para caso o tipo de geração seja diferente do que o código IMDb retornou
- Limpeza do código retirando comentários desnecessários
- Padronização das mensagens de alerta

1.1.2: 
- Retirada de código de IMDb fixo no campo de texto

1.1.3:
- Inserido mensagem "###### SINOPSE NÃO ENCONTRATADA ######" quando não houver sinopse em português para que o autor do torrent possa inserir manualmente apenas substituindo a mensagem
- Criada validação para não inserir o Site do Filme/Serie caso ele não tenha, isso estava quebrando algumas postagens

1.2.0
- Refatoração completa do código
- Tamanho dos separadores de filme/séries foram redimensionados
- A opção Série de TV, Episódio de Série de TV foram unificados na opção Filmes
- Adicionada a geração de BBCode para Jogos que estejam na STEAM, você utilizará o SteamId para gerar
- Correção de bugs

1.3.0
- Refatoração das rotas para pesquisa de jogos steam
- Criação do gerador para aplicativos android baseado na Play Store.



[b]Links:[/b]
[url=https://magnusiiibr.github.io/geradorcodigobb/]Link do Gerador[/url]
[url=https://github.com/MagnusIIIBR/geradorcodigobb]Link do repositório[/url]
