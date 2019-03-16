var indexView = {
    selectedTipoGerador: 0,

    bindButtons: function () {
        $('#btnTipoGerador').click(function () {
            selectedTipoGerador = $('#cmbTipoGerador').val();

            switch (selectedTipoGerador) {
                case "1":
                    $('#divFilmeSerie').show();
                case "2":
                case "3":
                    break;

                default:
                    break;
            }

        });

        $('#btnLoadImdb').click(function () {

            $('#pageLoader').addClass("is-active");

            GeradorFilmeSerieEpisodio.IMDbId =  $('#txtIMDbId').val().trim();
            GeradorFilmeSerieEpisodio.Validar();

            $('#pageLoader').removeClass("is-active");

            // $('#btnGerar').show();

            // bulmaToast.toast({ message: "Pronto! Basta clicar em Gerar BBCode!", type: "is-success", duration: 4000 });
            // bulmaToast.toast({ message: "BBCode gerado! Basta copiar para sua postagem!", type: "is-success", duration: 4000 });

        });

    }
}
