var geradorAlbumLastFM = {

	urlLastFM: null,

	Data: {
		LastFM: null
	},

	Validar: function () {

		try {
			baseLib.showLoading(true);

			var lastfmBaseUrl = ["https://www.last.fm/pt/music/", "https://www.last.fm/en/music/"];

			if (this.urlLastFM.trim().length == 0 || this.urlLastFM == null) {
				throw new Error("A URL do álbum no LastFM é obrigatória!");
			}

			this.Data.LastFM = this.LastFMService(this.urlLastFM.trim());
			console.log(this.Data.LastFM);

			if (this.Data.LastFM.error != undefined) {
				throw new Error("Erro: " + this.Data.LastFM.message);
			}

			baseLib.copyToClipboard(this.GerarBBCode());
			bulmaToast.toast({
				message: "BBCode copiado para a área de transferência!",
				type: "is-success",
				duration: 4000
			});
		} catch (error) {
			bulmaToast.toast({
				message: error.message,
				type: "is-danger",
				duration: 4000
			});
		} finally {
			baseLib.showLoading(false);
		}

	},

	GerarBBCode: function () {
		var str = `
            ${this.InserirTitulo()}
            ${this.InserirCapa()}
            ${this.InserirInformacao()}
            ${this.InserirFaixas()}
            `;

		return str;

	},

	InserirTitulo: function () {
		var str = `	[align=center][img]${baseLib.StaticUrl.urlSeparadorApresentaImage}[/img][/align]
					[b][align=center] ${this.Data.LastFM.album.name} [/align][/b]
					[b][align=center] ${this.Data.LastFM.album.artist} [/align][/b]`;

		return str;
	},

	InserirCapa: function () {
		var selectedCapa = this.Data.LastFM.album.image[3];
		if(selectedCapa == null || selectedCapa == undefined) selectedCapa = this.Data.LastFM.album.image[2];

		return `[align=center][img]${baseLib.StaticUrl.urlSeparadorCapaImage}[/img][/align]
				[align=center][img]${selectedCapa['#text']}[/img][/align]`;
	},

	InserirInformacao: function () {
		var str = "";
		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorFichaTecnicaImage}[/img][/align]`;
		if (this.Data.LastFM.album.release_date != undefined)  str += `\n[align=center]Data de Lançamento: ${this.Data.LastFM.data.release_date.date} [/align]`;
		str += `\n[align=center]Ouvintes (LastFM): ${this.Data.LastFM.album.listeners } [/align]`;
		str += `\n[align=center]Contagem de plays (LastFM): ${this.Data.LastFM.album.playcount} [/align]`;
		if (this.Data.LastFM.album.wiki != undefined) if (this.Data.LastFM.album.wiki.published != undefined) str += `\n[align=center]Publicação: ${this.Data.LastFM.album.wiki.published} [/align]`;
		if (this.Data.LastFM.album.url != null) str += `\n[align=center]Site: [url=${this.Data.LastFM.album.url}] Clique aqui [/url][/align]`;


		return str;
	},

	InserirFaixas: function () {
		var str = "";
		// str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorRequisitosmage}[/img][/align]`;

		var nroFaixa = 1;
		this.Data.LastFM.album.tracks.track.forEach(element => {
			str += `\n[align=center][b]${nroFaixa}[/b] - ${element.name} (${baseLib.fancyTimeFormat(element.duration)})[/align]`;
			nroFaixa++;
		});	

		// str += `\n[align=center]Ouvintes: ${this.Data.LastFM.data.genres.map(function (elem) { return elem.description; }).join(", ")} [/align]`;
		// str += `\n[align=center]Desenvolvedores: ${this.Data.LastFM.data.developers.join(", ")} [/align]`;

		return str;
	},

	InserirAgradecaComente: function () {

	},

	LastFMService: function () {
		var urlRequest = baseLib.StaticUrl.urlServiceLastFM + this.urlLastFM;

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
};
