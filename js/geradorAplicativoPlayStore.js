var GeradorAplicativoPlayStore = {

    GooglePlayId: null,

    Data: {
        GooglePlay: null
    },

    Validar: function () {

        if (this.GooglePlayId.trim().length == 0 || this.GooglePlayId == null) {
            bulmaToast.toast({ message: "O código do jogo na GOOGLE PLAY é obrigatório", type: "is-danger", duration: 4000 });
            return false;
        }

        this.Data.GooglePlay = this.GooglePlayService(this.GooglePlayId.trim());

        if (this.Data.GooglePlay ==  null || this.Data.GooglePlay == undefined) {
            bulmaToast.toast({ message: "O código do jogo na GOOGLE PLAY informado é inválido!", type: "is-danger", duration: 4000 });
            return false;
        }

        baseLib.copyToClipboard(this.GerarBBCode());
        bulmaToast.toast({ message: "BBCode copiado para a área de transferência!", type: "is-success", duration: 4000 });


    },

    GerarBBCode: function () {
        var str = `
            ${this.InserirTitulo()}
            ${this.InserirCapa()}
            ${this.InserirSinopse()}
            ${this.InserirInformacao()}
            ${this.InserirCritica()}
            ${this.InserirScreenshots()}
            `;

        return str;

    },

    InserirTitulo: function () {
        var str = ` [align=center][img]${baseLib.StaticUrl.urlSeparadorApresentaImage}[/img][/align]
                    [b][align=center] ${this.Data.GooglePlay.title} [/align][/b]`;

        return str;
    },

    InserirCapa: function () {
        return `[align=center][img]${baseLib.StaticUrl.urlSeparadorCapaImage}[/img][/align]
                [align=center][img]${this.Data.GooglePlay.headerImage}[/img][/align]`;
    },

    InserirSinopse: function () {
        var str = `[align=center][img]${baseLib.StaticUrl.urlSeparadorSinopseImage}[/img][/align]
                   [align=center]${this.Data.GooglePlay.description}[/align]`;


        return str;
    },

    InserirInformacao: function () {
        var str = "";
        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorFichaTecnicaImage}[/img][/align]`;
        str += `\n[align=center]Data de Lançamento: ${this.Data.GooglePlay.released} [/align]`;
        str += `\n[align=center]Gêneros: ${this.Data.GooglePlay.genre} [/align]`;
        str += `\n[align=center]Desenvolvedores: ${this.Data.GooglePlay.developer} [/align]`;
         str += `\n[align=center]Preço (na PlayStore): ${this.Data.GooglePlay.priceText} [/align]`;
        if (this.Data.GooglePlay.developerWebsite == null) str += `\n[align=center]Site: [url=${this.Data.GooglePlay.developerWebsite}] Clique aqui [/url][/align]`;

        return str;
    },

    InserirCritica: function () {
        var str = "";

        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorCriticasImage}[/img][/align]`;
        if (this.Data.GooglePlay.scoreText != "") {
            str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoGooglePlayStoreImage}[/img][/align]`;
            str += `\n[align=center][b][url=${this.Data.GooglePlay.url}]${this.Data.GooglePlay.scoreText}/5[/b][/url][/align]`
        } else {
            str += `\n[align=center][b]###### SEM CRÍTICA ######[/b][/align]`
        }

        return str;
    },

    InserirScreenshots: function () {
        var str = "";
        str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorScreenshotImage}[/img][/align]`;
        str += `\n[align=center]################# INSERIR IMAGENS AQUI ]#################[/align]`;

        // this.Data.GooglePlay.screenshots.forEach(element => {
        //     str += `\n[align=center][img]${element.trim()}[/img][/align]`
        // });

        return str;
    },

    InserirTrailer: function () {

    },

    InserirAgradecaComente: function () {

    },


    GooglePlayService: function () {
        var urlRequest = "https://vindicator.com.br/services/googleplay?id=" + this.GooglePlayId;

        var result = null;

        $.ajax({
            url: urlRequest,
            async: false,
            success: function (data) {
                result = data;
                console.log(result);
            }
        });
        return result;
    },
};