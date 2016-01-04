/*jslint browser: true, regexp: true */
/*global app, data, io */

(function () {
    "use strict";
    window.app = {

        series: {},

        socket: io("http://localhost:1337"),
        //socket: io("http://server7.tezzt.nl:1337"),

        settings: {
            refresh: 2000,
            ajaxUrl: "http://localhost/~theotheu/stockquotes/index.php",
            dataPoints: 100,
            getDataBy: 1       //1 = local; 2 = websocket; 3 = ajax;
        },

        rnd: function (input, range) {
            var max = input + range,
                min = input - range;
            return Math.floor(
                Math.random() * (max - min + 1)
            ) + min;
        },

        getFormattedDate: function (d) {
            var newDate, day, month;

            day = ("0" + (d.getDate())).slice(-2);
            month = ("0" + (d.getMonth() + 1)).slice(-2);
            newDate = month + "/" + day + "/" + d.getFullYear();

            return newDate;
        },

        getFormattedTime: function (d) {
            var hours = d.getHours(),
                minutes = d.getMinutes(),
                ampm = hours >= 12 ? 'pm' : 'am',
                strTime;
            hours = hours % 12;
            hours = hours || 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            strTime = hours + ':' + minutes + ' ' + ampm;
            return strTime;
        },

        generateTestData: function () {
            var company, quote, newQuote;

            for (company in app.series) {
                quote = app.series[company][0];
                newQuote = Object.create(quote);
                newQuote.col0 = company;
                newQuote.col1 = app.rnd(quote.col1, 3); // new value, should be calculated with rnd
                newQuote.col2 = app.getFormattedDate(new Date());
                newQuote.col3 = app.getFormattedTime(new Date()); // new time, including am, pm
                newQuote.col4 = newQuote.col1 - quote.col1;//-1 + Math.floor(Math.random() * 3); // difference of price value between this quote and the previous quote


                app.series[company].unshift(newQuote);
            }
        },

        parseData: function (rows) {
            var i, company;

            // Iterate over the rows and add to series
            for (i = 0; i < rows.length; i++) {
                company = rows[i].col0;

                // Check if array for company exist in series
                if (app.series[company] !== undefined) {
                    app.series[company].unshift(rows[i]);
                } else {
                    // company does not yet exist
                    app.series[company] = [rows[i]];
                }
            }
        },

        parseDataXhr: function (quote) {
            var i, company;

            // Loop over de bedrijfen en voeg ze toe aan stock
            for (i = 0; i < quote.length; i += 1) {
                //companySymbol = quote[i].symbol;
                company = quote[i].symbol;

                // Kijk of het bedrijf al bestaat in stock
                if (app.series[company] !== undefined) {
                    app.series[company].unshift(quote[i]);
                } else {
                    app.series[company] = [{
                        col0: quote[i].Symbol,
                        col1: quote[i].Open,
                        col2: quote[i].LastTradeDate,
                        col3: quote[i].LastTradeTime,
                        col4: quote[i].Change
                    }];
                }
            }
        },

        retrieveData: function () {
            var url = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22%2C%22BCS%22%2C%20%22STT%22%2C%20%22JPM%22%2C%20%22LGEN.L%22%2C%20%22UBS%22%2C%20%22DB%22%2C%20%22BEN%22%2C%20%22CS%22%2C%20%22BK%22%2C%20%22KN.PA%22%2C%20%22GS%22%2C%20%22LM%22%2C%20%22MTU%22)%20&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",
                xhr;

            xhr = new XMLHttpRequest();
            xhr.open("GET", url); // Url for the connection
            xhr.addEventListener("load", app.retrieveJSON); // Callback function which handles the data
            xhr.send();
        },

        retrieveJSON: function (response) {
            var data;

            data = JSON.parse(response.target.responseText);
            app.parseDataXhr(data.query.results.quote);
        },

        createValidCSSNameFromCompany: function (str) {
            // regular expression to remove everything
            // that is not out of A-z0-9
            return str.replace(/\W/g, "");
        },

        showData: function () {
            // return value is a dom
            var table, company, row, quote, cell, propertyName, propertyValue, headerValues, header;

            // Create table
            table = document.createElement("table");

            // Create header
            headerValues = ["Symbol", "Last Trade", "Date of Last Trade", "Time of Last Trade", "Change", "Open price", "Day’s High", "Day’s Low", "Volume"];
            row = document.createElement("tr");
            table.appendChild(row);

            for (header in headerValues) {
                cell = document.createElement("td");
                cell.innerText = headerValues[header];
                row.appendChild(cell);
            }

            // Create rows
            for (company in app.series) {
                quote = app.series[company][0];
                row = document.createElement("tr");
                row.id = app.createValidCSSNameFromCompany(company);

                // Create cells
                table.appendChild(row);

                // Iterate over quote to create cells
                for (propertyName in quote) {
                    propertyValue = quote[propertyName];
                    cell = document.createElement("td");
                    cell.innerText = propertyValue;
                    row.appendChild(cell);
                }

                if (quote.col4 < 0) {
                    row.className = "loser";
                } else if (quote.col4 > 0) {
                    row.className = "winner";
                }
            }

            return table;

        },

        getRealtimeData: function () {
            app.socket.on('stockquotes', function (data) {
                app.parseData(data.query.results.row);
            });
        },

        loop: function () {
            var table;

            if (app.settings.getDataBy === 1 || app.settings.getDataBy === 3) {
                app.generateTestData();
            }

            // remove old table
            document.querySelector("#container")
                .removeChild(
                    document.querySelector("table")
                );

            // add new table
            table = app.showData();
            app.container.appendChild(table);

            setTimeout(app.loop, app.settings.refresh);

        },

        initHTML: function () {
            var container, h1Node;

            // Create container
            container = document.createElement("div");
            container.id = "container";

            app.container = container;

            // Create title of application
            h1Node = document.createElement("h1");
            h1Node.innerText = "Real Time Stockquote App";

            app.container.appendChild(h1Node);

            return app.container;

        },

        init: function () {
            var container, table;

            // Add HTML to page
            container = app.initHTML();
            document.querySelector("body").appendChild(container);

            if (app.settings.getDataBy === 1) {
                // Parse initial data
                app.parseData(data.query.results.row);
            } else if (app.settings.getDataBy === 2) {
                app.getRealtimeData();
            } else {
                app.retrieveData();
            }

            table = app.showData();
            app.container.appendChild(table);

            app.loop();

        }

    };
}());



