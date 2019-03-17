var indexView = {
    selectedTipoGerador: 0,

    bindButtons: function () {
        $('#btnTipoGerador').click(function () {
            selectedTipoGerador = $('#cmbTipoGerador').val();

            switch (selectedTipoGerador) {
                case "1":
                    $('#divFilmeSerie').show();
                    break;
                case "2":
                    $('#divJogosSteam').show();
                    break;

                default:
                    break;
            }

        });

        $('#btnLoadImdb').click(function () {

            GeradorFilmeSerieEpisodio.IMDbId = $('#txtIMDbId').val().trim();
            GeradorFilmeSerieEpisodio.Validar();

        });

        $('#btnLoadSteam').click(function () {

            GeradorJogosSteam.SteamId = $('#txtSteamId').val().trim();
            GeradorJogosSteam.Validar();

        });

        jQuery.ajaxSetup({
	        beforeSend: function () {
                $('#pageLoader').addClass("is-active");
	        },
	        complete: function () {
                $('#pageLoader').removeClass("is-active");
	        },
	        success: function () { }
        });


    }
}
