var GeradorFilmeSerieEpisodio = {

    IMDbId: null,

    TipoGerador: null,

    StaticUrl: {
        urlSeparatorImage: "https://i.imgur.com/e998H1V.png",
        urlMetacriticLogoImage: "https://i.imgur.com/hzTTczo.png",
        urlIMDBLogoImage: "https://i.imgur.com/Eeb73Th.png",
        urlRottenTomatoesLogoImage: "https://i.imgur.com/IVyct9e.png",
        baseUrlTMDbPoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"
    },

    Data: {
        OMDb: null,
        TMDb: null
    },

    Validar: function () {
        var isFilme = false;
        var isSerie = false;
        var isEpisodioSerie = false;

        if (this.IMDbId.trim().length == 0 || this.IMDbId == null) {
            bulmaToast.toast({ message: "O código do filme no IMDB é obrigatório", type: "is-danger", duration: 4000 });
            return false;
        }

        // $('#pageLoader').addClass("is-active");

        this.Data.OMDb = this.OMDbService(this.IMDbId.trim());
        this.Data.TMDb = this.TMDbService(this.IMDbId.trim());

        console.log(this.Data.OMDb);
        console.log(this.Data.TMDb);


        if (this.Data.TMDb.movie_results.length > 0) isFilme = true;
        if (this.Data.TMDb.tv_results.length > 0) isSerie = true;
        if (this.Data.TMDb.tv_episode_results.length > 0) isEpisodioSerie = true;

        if (isFilme) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Filme'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "1";
        }

        if (isSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Série de TV'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "2";
        }

        if (isEpisodioSerie) {
            bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Episódio de série de TV'!", type: "is-alert", duration: 4000 });
            this.TipoGerador = "3";
        }

        baseLib.copyToClipboard(this.GerarBBCode());
        bulmaToast.toast({ message: "BBCode copiado para a área de transferência!", type: "is-success", duration: 4000 });
        // debugger


    },

    GerarBBCode: function () {
        var str = `
            ${this.InserirSeparador()}
            ${this.InserirTitulo()}
            ${this.InserirSeparador()}
            ${this.InserirCapa()}
            ${this.InserirSeparador()}
            ${this.InserirSinopse()}
            ${this.InserirSeparador()}
            ${this.InserirInformacao()}
            ${this.InserirSeparador()}
            ${this.InserirElenco()}
            ${this.InserirSeparador()}
            ${this.InserirCritica()}
            `;

        return str;

    },

    InserirSeparador: function () {
        return `[align=center][img]${this.StaticUrl.urlSeparatorImage}[/img][/align]`;
    },

    InserirTitulo: function () {
        var retorno = "";
        switch (this.TipoGerador) {
            case "1":
                retorno += "[b][align=center]" + this.Data.TMDb.movie_results[0].title + " (" + this.Data.OMDb.Title + ")" + "[/align][/b]";
                break;
            case "2":
                retorno += "[b][align=center]" + this.Data.TMDb.tv_results[0].name + " (" + this.Data.OMDb.Title + ")" + "[/align][/b]";
                break;
            case "3":
                retorno += "[b][align=center]" + this.Data.TMDb.tv_episode_results[0].name + " (" + this.Data.OMDb.Title + ")" + "[/align][/b]";
            default:
                break;
        }

        var str = `${retorno}
                    [b][align=center] (-- ${this.Data.OMDb.Year} --) [/align][/b]`;

        return str;
    },

    InserirCapa: function () {
        switch (this.TipoGerador) {
            case "1":
                return `[align=center][img]${this.StaticUrl.baseUrlTMDbPoster + this.Data.TMDb.movie_results[0].poster_path}[/img][/align]`;
                break;
            case "2":
                return `[align=center][img]${this.StaticUrl.baseUrlTMDbPoster + this.Data.TMDb.tv_results[0].poster_path}[/img][/align]`;
                break;
            case "3":
                return `[align=center][img]${this.StaticUrl.baseUrlTMDbPoster + this.Data.TMDb.tv_episode_results[0].still_path}[/img][/align]`;
                break;
            default:
                break;
        };
    },

    InserirSinopse: function () {
        var sinopse = "";

        switch (this.TipoGerador) {
            case "1":
                sinopse = "\n[align=center]" + ((this.Data.TMDb.movie_results[0].overview.length == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.movie_results[0].overview) + "[/align]";
                break;
            case "2":
                sinopse = "\n[align=center]" + ((this.Data.TMDb.tv_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_results[0].overview) + "[/align]";
                break;
            case "3":
                sinopse = "\n[align=center]" + ((this.Data.TMDb.tv_episode_results[0].overview == 0) ? "###### SINOPSE NÃO ENCONTRATADA ######" : this.Data.TMDb.tv_episode_results[0].overview) + "[/align]";
                break;
            default:
                break;
        }


        var str = `[b][align=center]SINOPSE[/align][/b]
                    ${sinopse}`;


        return str;
    },

    InserirInformacao: function () {
        var str = "";
        str += "\n[b][align=center]INFORMAÇÕES[/align][/b]";

        switch (this.TipoGerador) {
            case "1":
            case "2":
                str += `\n[align=center]Data de Lançamento: ${this.Data.OMDb.Released} [/align]`;
                break;

            case "3":
                str += `\n[align=center]Data de Lançamento: ${baseLib.reformatDate(this.Data.TMDb.tv_episode_results[0].air_date)} [/align]`;
                str += `\n[align=center]Temporada: ${this.Data.OMDb.Season} [/align]`;
                str += `\n[align=center]Episódio: ${this.Data.OMDb.Episode} [/align]`;
                break;
            default:
                break;
        }


        str += `\n[align=center]Tempo: ${this.Data.OMDb.Runtime} [/align]`;

        if (selectedTipoGerador == "1") str += `\n[align=center]Produtora: ${this.Data.OMDb.Production} [/align]`;

        str += `\n[align=center]País de Origem: ${this.Data.OMDb.Country} [/align]`;
        str += `\n[align=center]Gêneros: ${this.Data.OMDb.Genre} [/align]`;
        if (this.Data.OMDb.Website != "N/A") str += `\n[align=center]Site: [url=${this.Data.OMDb.Website}] Clique aqui [/url][/align]`;

        return str;
    },

    InserirElenco: function () {
        var str = "";
        str += "\n[b][align=center]ELENCO[/align][/b]";

        this.Data.OMDb.Actors.split(',').forEach(element => {
            str += `\n[align=center] ${element.trim()} - ATOR/ATRIZ[/align]`
        });

        if (this.Data.OMDb.Director != "N/A") {
            this.Data.OMDb.Director.split(',').forEach(element => {
                str += `\n[align=center] ${element.trim()} - DIRETOR(A)[/align]`
            });
        }

        return str;
    },

    InserirCritica: function () {
        var str = "";

        if (this.Data.OMDb.Ratings.length > 0) {
            str += "\n[b][align=center]CRÍTICA[/align][/b]";

            this.Data.OMDb.Ratings.forEach(element => {
                switch (element.Source) {
                    case "Internet Movie Database":
                        str += `\n[align=center][img]${this.StaticUrl.urlIMDBLogoImage}[/img][/align]`;
                        str += `\n[align=center][b][url=https://www.imdb.com/title/${this.Data.OMDb.imdbID}]${element.Value.trim()}[/b][/url][/align]`
                        break;

                    case "Rotten Tomatoes":
                        str += `\n[align=center][img]${this.StaticUrl.urlRottenTomatoesLogoImage}[/img][/align]`;
                        str += `\n[align=center][b]${element.Value.trim()}[/b][/align]`

                        break;

                    case "Metacritic":
                        str += `\n[align=center][img]${this.StaticUrl.urlMetacriticLogoImage}[/img][/align]`;
                        str += `\n[align=center][b]${element.Value.trim()}[/b][/align]`
                        break;
                    default:
                        break;
                }
            });

        }

        return str;
    },

    InserirTrailer: function () {

    },

    InserirAgradecaComente: function () {

    },


    OMDbService: function () {
        var urlRequest = "https://www.omdbapi.com/?i=" + this.IMDbId + "&y=&plot=full&apikey=b045eb33";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    },

    TMDbService: function () {
        var urlRequest = "https://api.themoviedb.org/3/find/" + this.IMDbId + "?api_key=650fbb9313eab50f47bc5981772e8218&language=pt-BR&external_source=imdb_id";

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
            }
        });
        return result;
    }


};