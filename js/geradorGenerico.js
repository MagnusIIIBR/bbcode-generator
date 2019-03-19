var GeradorGenerico = {

	StaticUrl: {
		urlSeparatorImage: "https://i.imgur.com/b7NydPU.png",
		urlMetacriticLogoImage: "https://i.imgur.com/hzTTczo.png",
	},

	Data: {
		Titulo: null,
		UrlCapa: null,
		Descricao: null,
		Info:[],
		Screenshot:[],
		Video: null
	},

	CarregarCampos: function(){
		this.Data.Titulo = $('#txtGenericoTitulo').val();
		this.Data.UrlCapa = $('#txtGenericoUrlCapa').val();
		this.Data.Descricao = $('#txtGenericoDescricao').val();


		this.Data.Video = $('#txtGenericoUrlVideo').val();
	},

	Validar: function () {



		try {

			if (this.SteamId.trim().length == 0 || this.SteamId == null) {
				throw new Error("O código do jogo na STEAM é obrigatório!");
			
			}
			this.Data.Steam = this.SteamService(this.SteamId.trim())[this.SteamId];

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
		}

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
            ${this.InserirRequisitos()}
            ${this.InserirSeparador()}
            ${this.InserirCritica()}
            ${this.InserirSeparador()}
            ${this.InserirScreenshots()}
            ${this.InserirSeparador()}
            ${this.InserirVideo()}

            `;

		return str;

	},

	InserirSeparador: function () {
		return `[align=center][img]${this.StaticUrl.urlSeparatorImage}[/img][/align]`;
	},

	InserirTitulo: function () {
		var str = `[b][align=center] ${this.Data.Steam.data.name} [/align][/b]
                   [b][align=center] (-- ${baseLib.getYearFromDDMMMYYYY(this.Data.Steam.data.release_date.date)} --) [/align][/b]`;

		return str;
	},

	InserirCapa: function () {
		return `[align=center][img]${this.Data.Steam.data.header_image}[/img][/align]`;
	},

	InserirSinopse: function () {
		var str = `[b][align=center]SINOPSE[/align][/b]
                   [align=center]${this.Data.Steam.data.about_the_game}[/align]`;


		return str;
	},

	InserirInformacao: function () {
		var str = "";
		str += "\n[b][align=center]INFORMAÇÕES[/align][/b]";
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
		str += "\n[b][align=center]REQUISITOS[/align][/b]";
		if (this.Data.Steam.data.pc_requirements.length > 0) {
			str += `\n[align=center]PC[/align]`;
			str += `\n[align=center][b]Mínimo[/b]: ${this.Data.Steam.data.minimum} [/align]`;
		}

		if (this.Data.Steam.data.mac_requirements.length > 0) {
			str += `\n[align=center]MAC[/align]`;
			str += `\n[align=center][b]Mínimo[/b]: ${this.Data.Steam.data.minimum} [/align]`;
		}

		if (this.Data.Steam.data.linux_requirements.length > 0) {
			str += `\n[align=center]LINUX[/align]`;
			str += `\n[align=center][b]Mínimo[/b]: ${this.Data.Steam.data.minimum} [/align]`;
		}

		return str;
	},

	InserirCritica: function () {
		var str = "";

		str += "\n[b][align=center]CRÍTICA[/align][/b]";
		if (this.Data.Steam.data.metacritic != null) {
			str += `\n[align=center][img]${this.StaticUrl.urlMetacriticLogoImage}[/img][/align]`;
			str += `\n[align=center][b][url=${this.Data.Steam.data.metacritic.url}]${this.Data.Steam.data.metacritic.score}/100[/b][/url][/align]`;
		} else {
			str += `\n[align=center][b]###### SEM CRÍTICA ######[/b][/align]`;
		}

		return str;
	},

	InserirScreenshots: function () {
		var str = "";
		str += "\n[b][align=center]SCREENSHOTS[/align][/b]";

		this.Data.Steam.data.screenshots.forEach(element => {
			str += `\n[align=center][img] ${element.path_full.trim()}[/img][/align]`;
		});

		return str;
	},

	InserirVideo: function () {
		var str = "";
		str += "\n[b][align=center]VIDEO[/align][/b]";

		if (this.Data.Steam.data.movies.length > 0) {
			str += `\n[align=center][video]${this.Data.Steam.data.movies[0].webm.max}[/video][/align]`;
		} else {
			str += `\n[align=center][b]###### SEM CRÍTICA ######[/b][/align]`;
		}

		return str;
	},

	InserirAgradecaComente: function () {

	},

	// InserirFieldInfo:function(){
	// 	// $('<div />').
	// };

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
