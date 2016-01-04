var express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server)
    port = 1337;


server.listen(port);
app.get("/", function (req, res) {
    res.sendfile(__dirname + "/index.html");
    console.log("Listening on port " + port);
});

var str = '{"query":{"count":27,"created":"2013-10-02T11:38:21Z","lang":"en-US","diagnostics":{"publiclyCallable":"true","url":{"execution-start-time":"1","execution-stop-time":"67","execution-time":"66","content":"http://download.finance.yahoo.com/d/quotes.csv?s=ibm+orcl+bcs+stt+jpm+lgen.l+ubs+db+ben+cs+bk+kn.pa+gs+lm+ms+mtu+ntrs+gle.pa+bac+av+sdr.l+dodgx+slf+sl.l+nmr+ing+bnp.pa&f=sl1d1t1c1ohgv&e\u200c?=.csv"},"user-time":"68","service-time":"66","build-version":"0.2.1867"},"results":{"row":[{"col0":"BCS","col1":"17.42","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"8900"},{"col0":"STT","col1":"66.70","col2":"10/1/2013","col3":"4:05pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"JPM","col1":"51.96","col2":"10/1/2013","col3":"4:00pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"500"},{"col0":"LGEN.L","col1":"196.40","col2":"10/2/2013","col3":"7:19am","col4":"-0.90","col5":"196.40","col6":"197.90","col7":"195.20","col8":"2986239"},{"col0":"UBS","col1":"20.79","col2":"10/1/2013","col3":"4:03pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"DB","col1":"46.86","col2":"10/1/2013","col3":"4:02pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"12700"},{"col0":"BEN","col1":"50.85","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"CS","col1":"31.31","col2":"10/1/2013","col3":"4:02pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"500"},{"col0":"BK","col1":"30.75","col2":"10/1/2013","col3":"4:00pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"KN.PA","col1":"3.753","col2":"10/2/2013","col3":"7:21am","col4":"+0.103","col5":"3.66","col6":"3.769","col7":"3.654","col8":"3447906"},{"col0":"GS","col1":"159.00","col2":"10/1/2013","col3":"4:00pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"200"},{"col0":"LM","col1":"33.80","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"MS","col1":"27.14","col2":"10/1/2013","col3":"4:00pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"MTU","col1":"6.37","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"NTRS","col1":"54.73","col2":"10/1/2013","col3":"4:00pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"GLE.PA","col1":"38.825","col2":"10/2/2013","col3":"7:22am","col4":"+0.975","col5":"37.685","col6":"38.985","col7":"37.565","col8":"3261198"},{"col0":"BAC","col1":"13.90","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"24750"},{"col0":"AV","col1":"13.26","col2":"10/1/2013","col3":"4:04pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"SDR.L","col1":"2611.00","col2":"10/2/2013","col3":"7:21am","col4":"-2.00","col5":"2600.00","col6":"2612.00","col7":"2560.00","col8":"44957"},{"col0":"DODGX","col1":"152.84","col2":"10/1/2013","col3":"6:25pm","col4":"+1.41","col5":"N/A","col6":"N/A","col7":"N/A","col8":"N/A"},{"col0":"SLF","col1":"32.04","col2":"10/1/2013","col3":"4:02pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"SL.L","col1":"345.30","col2":"10/2/2013","col3":"7:22am","col4":"-0.80","col5":"345.30","col6":"346.20","col7":"340.40","col8":"897480"},{"col0":"NMR","col1":"7.78","col2":"10/1/2013","col3":"4:01pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"0"},{"col0":"ING","col1":"11.77","col2":"10/1/2013","col3":"4:02pm","col4":"0.00","col5":"N/A","col6":"N/A","col7":"N/A","col8":"4000"},{"col0":"BNP.PA","col1":"51.13","col2":"10/2/2013","col3":"7:21am","col4":"+0.28","col5":"50.61","col6":"51.28","col7":"50.40","col8":"1576061"}]}}}';
var obj = JSON.parse(str);

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
}

function generateData() {
    var i, d, v, v1, r;
    for (i = 0; i < obj.query.results.row.length; i++) {
        d = new Date();
        r = rnd(90, 110) / 100;

        v = parseFloat(obj.query.results.row[i].col1);

        v1 = (v * r ).toFixed(3);
        obj.query.results.row[i].col1 = v1;
        // date
        obj.query.results.row[i].col2 = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
        // time
        obj.query.results.row[i].col3 = formatAMPM(d);
        //
        if (obj.query.results.row[i].col5)
            obj.query.results.row[i].col4 = (v - v1).toFixed(2);

        // volume
        v = parseFloat(obj.query.results.row[i].col8);
        if (v == 0) {
            v = 100;
        }
        v1 = (v * r).toFixed(0);
        obj.query.results.row[i].col8 = v1;
    }
}


// Sends a message every 1000 milliseconds
setInterval(function () {
    var d = new Date();
    generateData();
    io.sockets.emit("stockquotes", obj);
}, 1000);

io.sockets.on("connection", function (socket) {

});
