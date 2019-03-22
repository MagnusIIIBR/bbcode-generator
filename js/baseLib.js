var baseLib = {

	StaticUrl: {
		urlSeparadorApresentaImage: "https://i.imgur.com/JnJo28z.png",
		urlSeparadorCapaImage: "https://i.imgur.com/RsvsIsD.png",
		urlSeparadorCriticasImage: "https://i.imgur.com/8R9tLXc.png",
		urlSeparadorDescricaoImage: "https://i.imgur.com/GiIopNR.png",
		urlSeparadorElencoImage: "https://i.imgur.com/rE8TCTC.png",
		urlSeparadorFichaTecnicaImage: "https://i.imgur.com/9WTTiYl.png",
		urlSeparadorInstalacaoImage: "https://i.imgur.com/MN9iOvd.png",
		urlSeparadorRequisitosmage: "https://i.imgur.com/CZKo3ux.png",
		urlSeparadorScreenshotImage: "https://i.imgur.com/s6nKxhr.png",
		urlSeparadorSinopseImage: "https://i.imgur.com/jxHMhwO.png",
		urlSeparadorTrailerImage: "https://i.imgur.com/nU7Q7Qx.png",

		urlLogoIMDbImage:"https://i.postimg.cc/Pr8Gv4RQ/IMDB.png",
		urlLogoMetacriticImage:"https://i.postimg.cc/SKkH5pNg/Metacritic45x45.png",
		urlLogoRottenTomatoesImage:"https://i.postimg.cc/rppL76qC/rotten.png",
		urlLogoGooglePlayStoreImage:"https://i.postimg.cc/pLRvYh7S/google.png",

		urlBaseTMDbPoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"
	},

	copyToClipboard: function (str) {
		const el = document.createElement('textarea');
		el.value = str;
		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		// debugger
	},

	reformatDate: function (dateStr) {
		dArr = dateStr.split("-");
		return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(2);
	},

	getYearFromDDMMMYYYY: function (dateStr) {
		dArr = dateStr.split(" ");
		return dArr[2];
	},

	showLoading: function (yesNo) {
		let loading = $('#pageLoader');

		console.log("Loading: " + yesNo);

		yesNo ? loading.addClass("is-active") : loading.removeClass("is-active");
	},




};
