var baseLib = {

    StaticUrl: {
		urlSeparatorImage: "https://i.imgur.com/e998H1V.png",
        urlMetacriticLogoImage: "https://i.imgur.com/hzTTczo.png",
        urlIMDBLogoImage: "https://i.imgur.com/Eeb73Th.png",
        urlRottenTomatoesLogoImage: "https://i.imgur.com/IVyct9e.png",
        baseUrlTMDbPoster: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/",
        urlPlayStoreLogoImage: "https://i.imgur.com/W4czhNc.png"
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
