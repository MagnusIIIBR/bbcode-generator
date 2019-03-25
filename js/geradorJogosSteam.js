var GeradorJogosSteam = {

	SteamId: null,

	Data: {
		Steam: null
	},

	Validar: function () {

		try {
			baseLib.showLoading(true);

			if (this.SteamId.trim().length == 0 || this.SteamId == null) {
				throw new Error("O código do jogo na STEAM é obrigatório!");
			
			}
			this.Data.Steam = this.SteamService(this.SteamId.trim())[this.SteamId];
			console.log(this.Data.Steam);

			if (this.Data.Steam.success == false) {
				throw new Error("O código do jogo na STEAM informado é inválido!");
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
            ${this.InserirSinopse()}
            ${this.InserirInformacao()}
            ${this.InserirRequisitos()}
            ${this.InserirCritica()}
            ${this.InserirScreenshots()}
            `;

		return str;

	},

	InserirTitulo: function () {
		var str = `	[align=center][img]${baseLib.StaticUrl.urlSeparadorApresentaImage}[/img][/align]
					[b][align=center] ${this.Data.Steam.data.name} [/align][/b]
                   	[b][align=center] (-- ${baseLib.getYearFromDDMMMYYYY(this.Data.Steam.data.release_date.date)} --) [/align][/b]`;

		return str;
	},

	InserirCapa: function () {
		return `[align=center][img]${baseLib.StaticUrl.urlSeparadorCapaImage}[/img][/align]
				[align=center][img]${baseLib.clearUrl(this.Data.Steam.data.header_image)}[/img][/align]`;
	},

	InserirSinopse: function () {
		var str = `[align=center][img]${baseLib.StaticUrl.urlSeparadorDescricaoImage}[/img][/align]
                   [align=center]${baseLib.parseHtmlToBBCode(this.Data.Steam.data.about_the_game)}[/align]`;


		return str;
	},

	InserirInformacao: function () {
		var str = "";
		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorFichaTecnicaImage}[/img][/align]`;
		str += `\n[align=center]Data de Lançamento: ${this.Data.Steam.data.release_date.date} [/align]`;
		str += `\n[align=center]Gêneros: ${this.Data.Steam.data.genres.map(function (elem) { return elem.description; }).join(", ")} [/align]`;
		str += `\n[align=center]Publicadores: ${this.Data.Steam.data.publishers.join(", ")} [/align]`;
		str += `\n[align=center]Desenvolvedores: ${this.Data.Steam.data.developers.join(", ")} [/align]`;
		if (this.Data.Steam.data.price_overview != null) str += `\n[align=center]Preço (na STEAM): ${this.Data.Steam.data.price_overview.final_formatted} [/align]`;
		if (this.Data.Steam.data.website == null) str += `\n[align=center]Site: [url=${this.Data.Steam.data.website}] Clique aqui [/url][/align]`;

		return str;
	},

	InserirRequisitos: function () {
		var str = "";
		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorRequisitosmage}[/img][/align]`;
		if (this.Data.Steam.data.pc_requirements.length  != null  || this.Data.Steam.data.pc_requirements != undefined) {
			str += `\n[align=center]PC[/align]`;
			str += `\n[align=center] ${baseLib.parseHtmlToBBCode(this.Data.Steam.data.pc_requirements.minimum)} [/align]`;
		}

		if (this.Data.Steam.data.mac_requirements != null  || this.Data.Steam.data.mac_requirements != undefined) {
			str += `\n[align=center]MAC[/align]`;
			str += `\n[align=center] ${baseLib.parseHtmlToBBCode(this.Data.Steam.data.mac_requirements.minimum)} [/align]`;
		}

		if (this.Data.Steam.data.linux_requirements.length != null  || this.Data.Steam.data.linux_requirements != undefined) {
			str += `\n[align=center]LINUX[/align]`;
			str += `\n[align=center] ${baseLib.parseHtmlToBBCode(this.Data.Steam.data.linux_requirements.minimum)} [/align]`;
		}

		return str;
	},

	InserirCritica: function () {
		var str = "";

		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorCriticasImage}[/img][/align]`;
		if (this.Data.Steam.data.metacritic != null) {
			str += `\n[align=center][img]${baseLib.StaticUrl.urlLogoMetacriticImage}[/img][/align]`;
			str += `\n[align=center][b][url=${this.Data.Steam.data.metacritic.url}]${this.Data.Steam.data.metacritic.score}/100[/b][/url][/align]`;
		} else {
			str += `\n[align=center][b]###### SEM CRÍTICA ######[/b][/align]`;
		}

		return str;
	},

	InserirScreenshots: function () {
		var str = "";
		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorScreenshotImage}[/img][/align]`;

		this.Data.Steam.data.screenshots.forEach(element => {
			str += `\n[align=center][img]${baseLib.clearUrl(element.path_full.trim())}[/img][/align]`;
		});

		return str;
	},

	InserirVideo: function () {
		var str = "";
		str += `\n[align=center][img]${baseLib.StaticUrl.urlSeparadorTrailerImage}[/img][/align]`;

		if (this.Data.Steam.data.movies.length > 0) {
			str += `\n[align=center][video]${this.Data.Steam.data.movies[0].webm.max}[/video][/align]`;
		} else {
			str += `\n[align=center][b]###### SEM CRÍTICA ######[/b][/align]`;
		}

		return str;
	},

	InserirAgradecaComente: function () {

	},

	SteamService: function () {
		var urlRequest = "https://vindicator.com.br/services/steam?id=" + this.SteamId;

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
