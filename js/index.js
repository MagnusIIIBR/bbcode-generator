var urlSeparatorImage = "https://i.imgur.com/doYqKGb.png";

var urlMetacriticLogoImage = "https://i.imgur.com/hzTTczo.png";
var urlIMDBLogoImage = "https://i.imgur.com/Eeb73Th.png";
var urlRottenTomatoesLogoImage = "https://i.imgur.com/IVyct9e.png";

var baseUrlTMDbPoster = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"
var dataFromOMDB = null;
var dataFromTMDB = null;
var selectedTipoGerador = 0;

$(window).on('load', function () {
    console.log('All assets are loaded')


    bindButtons();
});

function bindButtons() {
    $('#btnTipoGerador').click(function () {
        selectedTipoGerador = $('#cmbTipoGerador').val();


        switch (selectedTipoGerador) {
            case "1":
            case "2":
            case "3":
                $('#divFilmeSerie').show();
                break;

            default:
                break;
        }

    });

    $('#btnLoadImdb').click(function () {
        var isFilme = false;
        var isSerie = false;
        var isEpisodioSerie = false;

        var txtImdbId = $("#txtImdbId");
        if (txtImdbId.val().trim().length == 0) {
            bulmaToast.toast({ message: "O código do filme no IMDB é obrigatório" , type: "is-danger", duration: 4000});
            return false;
        }

        $('#pageLoader').addClass("is-active");

        dataFromOMDB = loadFromOMDB(txtImdbId.val());
        dataFromTMDB = loadFromTMDB(txtImdbId.val());

        if (dataFromTMDB.movie_results.length > 0) isFilme = true;
        if (dataFromTMDB.tv_results.length > 0) isSerie = true;
        if (dataFromTMDB.tv_episode_results.length > 0) isEpisodioSerie = true;

        if (selectedTipoGerador == "1" && !isFilme) {
            if (isSerie) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Série de TV', mas relaxa, já arrumei pra você!" , type: "is-alert", duration: 4000});
                selectedTipoGerador = "2";
                $('#cmbTipoGerador').val("2");
            }
            
            if (isEpisodioSerie) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Episódio de série de TV', mas relaxa, já arrumei pra você!"  , type: "is-alert", duration: 4000});
                selectedTipoGerador = "3";
                $('#cmbTipoGerador').val("3");
            }
        }

        if (selectedTipoGerador == "2" && !isSerie) {
            if (isFilme) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Filme', mas relaxa, já arrumei pra você!" , type: "is-alert", duration: 4000 });
                selectedTipoGerador = "1";
                $('#cmbTipoGerador').val("1");
            }
            
            if (isEpisodioSerie) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Episódio de série de TV', mas relaxa, já arrumei pra você!"  , type: "is-alert", duration: 4000});
                selectedTipoGerador = "3";
                $('#cmbTipoGerador').val("3");
            }
        }

        
        if (selectedTipoGerador == "3" && !isEpisodioSerie) {
            if (isFilme) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Filme', mas relaxa, já arrumei pra você!"  , type: "is-alert", duration: 4000});
                selectedTipoGerador = "1";
                $('#cmbTipoGerador').val("1");
            }
            
            if (isSerie) {
                bulmaToast.toast({ message: "O código IMDB usado pertence ao tipo 'Série de TV', mas relaxa, já arrumei pra você!" , type: "is-alert", duration: 4000 });
                selectedTipoGerador = "2";
                $('#cmbTipoGerador').val("2");
            }
        }

        console.log(dataFromOMDB);
        console.log(dataFromTMDB);

        $('#pageLoader').removeClass("is-active");

        $('#btnGerar').show();

        bulmaToast.toast({ message: "Pronto! Basta clicar em Gerar BBCode!"  , type: "is-success", duration: 4000});

    });


    $('#btnGerar').click(function () {

        var BBCode = "";
        BBCode = gerarBBCodeSerieFilmes();

        $('#txtBBCode').val(BBCode);

        // copyTextToClipboard(BBCode);

        $('#divBBCode').show();

        bulmaToast.toast({ message: "BBCode gerado! Basta copiar para sua postagem!" , type: "is-success", duration: 4000});
    });
};

var gerarBBCodeSerieFilmes = function () {
    var BBCode = "";

    BBCode += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    BBCode += addBreakLines();

    switch (selectedTipoGerador) {
        case "1":
            BBCode += "[b][align=center]" + dataFromTMDB.movie_results[0].title + " (" + dataFromOMDB.Title + ")" + "[/align][/b]";
            break;
        case "2":
            BBCode += "[b][align=center]" + dataFromTMDB.tv_results[0].name + " (" + dataFromOMDB.Title + ")" + "[/align][/b]";
            break;
        case "3":
            BBCode += "[b][align=center]" + dataFromTMDB.tv_episode_results[0].name + " (" + dataFromOMDB.Title + ")" + "[/align][/b]";
            break;

        default:
            break;
    }
    BBCode += "[b][align=center] (-- " + dataFromOMDB.Year + " --) [/align][/b]";

    BBCode += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    BBCode += addBreakLines();

    switch (selectedTipoGerador) {
        case "1":
            BBCode += "[align=center]" + formatImageBBCodeWithUrl(baseUrlTMDbPoster + dataFromTMDB.movie_results[0].poster_path) + "[/align]";
            break;
        case "2":
            BBCode += "[align=center]" + formatImageBBCodeWithUrl(baseUrlTMDbPoster + dataFromTMDB.tv_results[0].poster_path) + "[/align]";
            break;
        case "3":
            BBCode += "[align=center]" + formatImageBBCodeWithUrl(baseUrlTMDbPoster + dataFromTMDB.tv_episode_results[0].still_path) + "[/align]";
            break;

        default:
            break;
    }

    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += formatDescricaoBBCode();

    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += formatInformacoesBBCode();

    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += formatElencoBBCode();

    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += addBreakLines();
    BBCode += formatCriticasBBCode();

    return BBCode;
};

var formatDescricaoBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]SINOPSE[/align][/b]";
    switch (selectedTipoGerador) {
        case "1":
            str += "\n[align=center]" + dataFromTMDB.movie_results[0].overview + "[/align]";
            break;
        case "2":
            str += "\n[align=center]" + dataFromTMDB.tv_results[0].overview + "[/align]";
            break;
        case "3":
            str += "\n[align=center]" + dataFromTMDB.tv_episode_results[0].overview + "[/align]";
            break;
        default:
            break;
    }

    return str;
}

var formatInformacoesBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]INFORMAÇÕES[/align][/b]";

    switch (selectedTipoGerador) {
        case "1":
        case "2":
            str += "\n[align=center]Data de Lançamento: " + dataFromOMDB.Released + "[/align]";
            break;

        case "3":
            str += "\n[align=center]Data de Lançamento: " + reformatDate(dataFromTMDB.tv_episode_results[0].air_date) + "[/align]";
            str += "\n[align=center]Temporada: " + dataFromOMDB.Season + "[/align]";
            str += "\n[align=center]Episódio: " + dataFromOMDB.Episode + "[/align]";
            break;
        default:
            break;
    }


    str += "\n[align=center]Tempo: " + dataFromOMDB.Runtime + "[/align]";
    if (selectedTipoGerador == "1") {
        str += "\n[align=center]Produtora: " + dataFromOMDB.Production + "[/align]";
    }
    str += "\n[align=center]País de Origem: " + dataFromOMDB.Country + "[/align]";
    str += "\n[align=center]Gêneros: " + dataFromOMDB.Genre + "[/align]";
    str += "\n[align=center]Site: [url=" + dataFromOMDB.Website + "] Clique aqui [/url][/align]";

    return str;
}

function reformatDate(dateStr) {
    dArr = dateStr.split("-");
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
}


var formatElencoBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]ELENCO[/align][/b]";
    var arr = dataFromOMDB.Actors.split(',');

    arr.forEach(element => {
        str += "\n[align=center]" + element.trim() + " - ATOR/ATRIZ[/align]"
    });

    if (dataFromOMDB.Director != "N/A") {
        arr = dataFromOMDB.Director.split(',');

        arr.forEach(element => {
            str += "\n[align=center]" + element.trim() + " - DIRETOR(A)[/align]"
        });
    }

    return str;
}

var formatImageBBCodeWithUrl = function (url) {
    return "[img]" + url + "[/img]"
}
var addBreakLines = function () {
    return "\n"
}



var formatCriticasBBCode = function () {
    var str = "";

    if (dataFromOMDB.Ratings.length > 0) {
        str += "[align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align]";
        str += "\n[b][align=center]CRÍTICA[/align][/b]";

        dataFromOMDB.Ratings.forEach(element => {
            switch (element.Source) {
                case "Internet Movie Database":
                    str += "\n[align=center]" + formatImageBBCodeWithUrl(urlIMDBLogoImage) + "[/align]";
                    str += "\n[align=center][b][url=https://www.imdb.com/title/" + dataFromOMDB.imdbID + "/]" + element.Value.trim() + "[/b][/url][/align]"
                    break;

                case "Rotten Tomatoes":
                    str += "\n[align=center]" + formatImageBBCodeWithUrl(urlRottenTomatoesLogoImage) + "[/align]";
                    str += "\n[align=center][b]" + element.Value.trim() + "[/b][/align]"

                    break;

                case "Metacritic":
                    str += "\n[align=center]" + formatImageBBCodeWithUrl(urlMetacriticLogoImage) + "[/align]";
                    str += "\n[align=center][b]" + element.Value.trim() + "[/b][/align]"
                    break;
                default:
                    break;
            }



        });

    }

    return str;
}

var formatImageBBCodeWithUrl = function (url) {
    return "[img]" + url + "[/img]"
}
var addBreakLines = function () {
    return "\n"
}



var loadFromOMDB = function (imdbId) {
    var urlRequest = "https://www.omdbapi.com/?i=" + imdbId + "&y=&plot=full&apikey=b045eb33";

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

var loadFromTMDB = function (imdbId) {
    var urlRequest = "https://api.themoviedb.org/3/find/" + imdbId + "?api_key=650fbb9313eab50f47bc5981772e8218&language=pt-BR&external_source=imdb_id";

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

function copyTextToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}