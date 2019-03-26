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

		urlLogoIMDbImage: "https://i.postimg.cc/Pr8Gv4RQ/IMDB.png",
		urlLogoMetacriticImage: "https://i.postimg.cc/SKkH5pNg/Metacritic45x45.png",
		urlLogoRottenTomatoesImage: "https://i.postimg.cc/rppL76qC/rotten.png",
		urlLogoGooglePlayStoreImage: "https://i.postimg.cc/pLRvYh7S/google.png",

		urlBaseTMDbPoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/",

		urlServiceSteam:  "https://staging.vindicator.com.br/steam?id=",
		urlServiceOMDb:  "https://www.omdbapi.com/?i=",
		urlServiceTMDb:  "https://api.themoviedb.org/3/find/",
		urlServicePlayStore:  "https://staging.vindicator.com.br/googleplay?id=",
		urlServiceLastFM:  "https://staging.vindicator.com.br/lastfm?id=",
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

	//https://itsolutionstuff.com/post/how-to-remove-query-string-from-urlexample.html
	clearUrl: function (uri) {
		if (uri.indexOf("?") > 0) {
			var clean_uri = uri.substring(0, uri.indexOf("?"));
			return clean_uri;
		}
	},

	parseHtmlToBBCode: function (html) {

		html = html.replace(/<pre(.*?)>(.*?)<\/pre>/gmi, "$2");

		html = html.replace(/<h[1-7](.*?)>(.*?)<\/h[1-7]>/, "\n$2\n");

		//paragraph handling:
		//- if a paragraph opens on the same line as another one closes, insert an extra blank line
		//- opening tag becomes two line breaks
		//- closing tags are just removed
		// html += html.replace(/<\/p><p/<\/p>\n<p/gi;
		// html += html.replace(/<p[^>]*>/\n\n/gi;
		// html += html.replace(/<\/p>//gi;

		html = html.replace(/<br(.*?)>/gi, "\n");
		html = html.replace(/<textarea(.*?)>(.*?)<\/textarea>/gmi, "\$2");
		html = html.replace(/<b>/gi, "[b]");
		html = html.replace(/<i>/gi, "[i]");
		html = html.replace(/<u>/gi, "[u]");
		html = html.replace(/<\/b>/gi, "[/b]");
		html = html.replace(/<\/i>/gi, "[/i]");
		html = html.replace(/<\/u>/gi, "[/u]");
		html = html.replace(/<em>/gi, "[b]");
		html = html.replace(/<\/em>/gi, "[/b]");
		html = html.replace(/<strong>/gi, "[b]");
		html = html.replace(/<\/strong>/gi, "[/b]");
		html = html.replace(/<cite>/gi, "[i]");
		html = html.replace(/<\/cite>/gi, "[/i]");
		html = html.replace(/<font color="(.*?)">(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
		html = html.replace(/<font color=(.*?)>(.*?)<\/font>/gmi, "[color=$1]$2[/color]");
		html = html.replace(/<link(.*?)>/gi, "");
		html = html.replace(/<li(.*?)>(.*?)<\/li>/gi, "[*]$2");
		html = html.replace(/<ul(.*?)>/gi, "\n");
		html = html.replace(/<\/ul>/gi, "\n");
		html = html.replace(/<div>/gi, "\n");
		html = html.replace(/<\/div>/gi, "\n");
		html = html.replace(/<td(.*?)>/gi, " ");
		html = html.replace(/<tr(.*?)>/gi, "\n");

		html = html.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, "[img]$2[/img]");
		html = html.replace(/<a(.*?)href="(.*?)"(.*?)>(.*?)<\/a>/gi, "[url=$2]$4[/url]");

		html = html.replace(/<head>(.*?)<\/head>/gmi, "");
		html = html.replace(/<object>(.*?)<\/object>/gmi, "");
		html = html.replace(/<script(.*?)>(.*?)<\/script>/gmi, "");
		html = html.replace(/<style(.*?)>(.*?)<\/style>/gmi, "");
		html = html.replace(/<title>(.*?)<\/title>/gmi, "");
		html = html.replace(/<!--(.*?)-->/gmi, "\n");

		html = html.replace(/\/\//gi, "/");
		html = html.replace(/http:\//gi, "http://");

		html = html.replace(/<(?:[^>'"]*|(['"]).*?\1)*>/gmi, "");
		html = html.replace(/\r\r/gi, "");
		html = html.replace(/\[img]\//gi, "[img]");
		html = html.replace(/\[url=\//gi, "[url=");

		html = html.replace(/(\S)\n/gi, "$1 ");

		return html;
	},

	//https://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
	fancyTimeFormat: function (time) {
		// Hours, minutes and seconds
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = ~~time % 60;

		// Output like "1:01" or "4:03:59" or "123:03:59"
		var ret = "";

		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}

		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	}




};
