var baseLib = {

    copyToClipboard : function (str) {
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
    }


};