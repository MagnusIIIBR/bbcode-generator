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
                $('#divFilmeSerie').show();
                break;

            default:
                break;
        }

    });

    $('#btnLoadImdb').click(function () {
        var txtImdbId = $("#txtImdbId").val();
        if (txtImdbId.trim().length == 0) {
            alert("O código do filme no IMDB é obrigatório");
            return false;
        }

        $('#pageLoader').addClass("is-active");

        dataFromOMDB = loadFromOMDB(txtImdbId);
        dataFromTMDB = loadFromTMDB(txtImdbId);
       
        $('#pageLoader').removeClass("is-active");

        $('#btnGerar').show();

        bulmaToast.toast({ message: "Pronto! Basta clicar em Gerar BBCode!" });

    });


    $('#btnGerar').click(function () {

        var BBCode = "";

        switch (selectedTipoGerador) {
            case "1":

                BBCode += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
                BBCode += addBreakLines();
                BBCode += "[b][align=center]" + dataFromTMDB.movie_results[0].title + " (" + dataFromOMDB.Title + ")" + "[/align][/b]";
                BBCode += "[b][align=center] (" + dataFromOMDB.Year + ") [/align][/b]";

                BBCode += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
                BBCode += addBreakLines();

                BBCode += "[align=center]" + formatImageBBCodeWithUrl(baseUrlTMDbPoster + dataFromTMDB.movie_results[0].poster_path) + "[/align]";

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

                break;

            default:
                break;
        }

        $('#txtBBCode').val(BBCode);

        // copyTextToClipboard(BBCode);

        $('#divBBCode').show();

        bulmaToast.toast({ message: "BBCode gerado! Basta copiar para sua postagem!" });
    });
};


var formatDescricaoBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]SINOPSE[/align][/b]";
    str += "\n[align=center]" + dataFromTMDB.movie_results[0].overview + "[/align]";

    return str;
}

var formatInformacoesBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]INFORMAÇÕES[/align][/b]";
    str += "\n[align=center]Data de Lançamento: " + dataFromOMDB.Released + "[/align]";
    str += "\n[align=center]Tempo de Filme: " + dataFromOMDB.Runtime + "[/align]";
    str += "\n[align=center]Produtora: " + dataFromOMDB.Production + "[/align]";
    str += "\n[align=center]País de Origem: " + dataFromOMDB.Country + "[/align]";
    str += "\n[align=center]Gêneros: " + dataFromOMDB.Genre + "[/align]";
    str += "\n[align=center]Site: [url=" + dataFromOMDB.Website + "] Clique aqui [/url][/align]";

    return str;
}

var formatElencoBBCode = function () {
    var str = "";
    str += "[b][align=center]" + formatImageBBCodeWithUrl(urlSeparatorImage) + "[/align][/b]";
    str += "\n[b][align=center]ELENCO[/align][/b]";
    var arr = dataFromOMDB.Actors.split(',');

    arr.forEach(element => {
        str += "\n[align=center]" + element.trim() + " - ATOR(IZ)[/align]"
    });

    arr = dataFromOMDB.Director.split(',');

    arr.forEach(element => {
        str += "\n[align=center]" + element.trim() + " - DIRETOR(A)[/align]"
    });

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