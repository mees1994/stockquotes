Document all concepts and your implementation decisions.

---


#Return values from yahoo
Values available in the test urls.

    s   Symbol
    l1  Last Trade (Price Only)
    d1  Date of Last Trade
    t1  Time of Last Trade
    c1  Change (in points)
    o   Open price
    h   Day’s High
    g   Day’s Low
    v   Volume

All return values

    a	Ask
    a2	Average Daily Volume
    a5	Ask Size
    b	Bid
    b2	Ask (Real-time)
    b3	Bid (Real-time)
    b4	Book Value
    b6	Bid Size
    c	Change and Percent Change
    c1	Change
    c3	Commission
    c6	Change (Real-time)
    c8	After Hours Change (Real-time)
    d	Dividend/Share
    d1	Last Trade Date
    d2	Trade Date
    e	Earnings/Share
    e1	Error Indication (returned for symbol changed / invalid)
    e7	EPS Est. Current Yr
    e8	EPS Estimate Next Year
    e9	EPS Est. Next Quarter
    f6	Float Shares
    g	Day’s Low
    g1	Holdings Gain Percent
    g3	Annualized Gain
    g4	Holdings Gain
    g5	Holdings Gain Percent (Real-time)
    g6	Holdings Gain (Real-time)
    h	Day’s High
    i	More Info
    i5	Order Book (Real-time)
    j	52-week Low
    j1	Market Capitalization
    j3	Market Cap (Real-time)
    j4	EBITDA
    j5	Change From 52-week Low
    j6	Percent Change From 52-week Low
    k	52-week High
    k1	Last Trade (Real-time) With Time
    k2	Change Percent (Real-time)
    k3	Last Trade Size
    k4	Change From 52-wk High
    k5	Percent Change From 52-week High
    l	Last Trade (With Time)
    l1	Last Trade (Price Only)
    l2	High Limit
    l2	High Limit
    l3	Low Limit
    l3	Low Limit
    m	Day's Range
    m2	Day’s Range (Real-time)
    m3	50-day Moving Avg
    m4	200-day Moving Average
    m5	Change From 200-day Moving Avg
    m6	Percent Change From 200-day Moving Average
    m7	Change From 50-day Moving Avg
    m8	Percent Change From 50-day Moving Average
    n	Name
    n4	Notes
    o	Open
    p	Previous Close
    p1	Price Paid
    p2	Change in Percent
    p5	Price/Sales
    p6	Price/Book
    q	Ex-Dividend Date
    q	Ex-Dividend Date
    r	P/E Ratio
    r1	Dividend Pay Date
    r2	P/E (Real-time)
    r5	PEG Ratio
    r6	Price/EPS Est. Current Yr
    r7	Price/EPS Estimate Next Year
    s	Symbol
    s1	Shares Owned
    s7	Short Ratio
    s7	Short Ratio
    t1	Last Trade Time
    t6	Trade Links
    t7	Ticker Trend
    t8	1 yr Target Price
    v	Volume
    v1	Holdings Value
    v7	Holdings Value (Real-time)
    v7	Holdings Value (Real-time)
    w	52-week Range
    w	52-week Range
    w1	Day's Value Change
    w1	Day’s Value Change
    w4	Day's Value Change (Real-time)
    w4	Day’s Value Change (Real-time)
    x	Stock Exchange
    x	Stock Exchange
    y	Dividend Yield
    y	Dividend Yield

### Get the company name with a ticker symbol
    http://d.yimg.com/autoc.finance.yahoo.com/autoc?query=TICKER_SYMBOL&callback=YAHOO.Finance.SymbolSuggest.ssCallback

Replace `TICKER_SYMBOL` with your ticket symbol.


#Flow of the program
1. init
2. check for how the data should be retrieved
3. retrieve the data on the given way
4. draw the data

for local and ajax
5. change the data
6. draw it again (go to step 5 again)

for real time (websocket)
5. go back to step 3

#Concepts
For every concept the following items:

- short description
- code example
- reference to mandatory documentation
- reference to alternative documentation (authoritative and authentic)

###Objects, including object creation and inheritance
Objects are variables that can contain many values. In most time's these values are in connection with the object. The values in the object are binded to a property.
    var stockQoute = {name: "Google", stockValue: "23.65", change: "1.32"};

Object can also contain methods like below:
    var person = (firstName: "Mees", lastName: "Schillemans", fullName: function() {return this.firstName + " " + this.lastName;};

To Access a property of an object you can use the following syntax:
    person.firstName; or person.fullName();

http://www.w3schools.com/js/js_objects.asp

OOP is a programming paradigm that uses abstrations to create models based on the real world. In javascript is this also possible.
Object inheritance can also be used with javascript as you can see below:

    var o = {
      a: 2,
      m: function(b){
        return this.a + 1;
      }
    };

    console.log(o.m()); // 3
    // When calling o.m in this case, 'this' refers to o

    var p = Object.create(o);
    // p is an object that inherits from o

    p.a = 12; // creates an own property 'a' on p
    console.log(p.m()); // 13
    // when p.m is called, 'this' refers to p.
    // So when p inherits the function m of o,
    // 'this.a' means p.a, the own property 'a' of p

https://developer.mozilla.org/nl/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

###websockets
WebSocket is a protocol providing full-duplex communication channels over a single TCP connection. A client(often a browser) can connect to a websocket, where after the server/websocket
can push data to the client. With websocket io this can be done with:
    io.sockets.emit("Message", message);

The client can connect to a websocket by:
    var socket = io.connect('http://localhost:3000');

    // Add a connect listener
    socket.on('connect',function() {
       console.log('Client has connected to the server!');
    });

To receive the data that is send from the server the client has to create a listener a is shown below:
    // Add a connect listener
    socket.on('stockquotes',function(data) {
        console.log('Received a message from the server!',data);
    });


###XMLHttpRequest
The XMLHttpRequest object is used to exchange data with a server behind the scenes.

With the XMLHttpRequest object you can:

Update a web page without reloading the page
Request data from a server after the page has loaded
Receive data from a server after the page has loaded
Send data to a server in the background

     var xhr;
     xhr = new XMLHttpRequest();
     xhr.open("GET", url); //url to open a connection to
     xhr.addEventListener("load", app.retrieveJSON); //callback function which handles the data
     xhr.send();

http://www.w3schools.com/xml/dom_http.asp

###AJAX
AJAX is a technique for creating fast and dynamic web pages.

AJAX allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes.
This means that it is possible to update parts of a web page, without reloading the whole page.

Classic web pages, (which do not use AJAX) must reload the entire page if the content should change. This is because AJAX makes asynchronous requests to the server.

http://www.w3schools.com/ajax/ajax_intro.asp

###Callbacks
A callback is a piece of code that is passed as an argument to another piece of code. These callback is handy to use by AJAX/XMLHttpRequest because these messages are asynchronous
and you don't know when they are executed completely.

As you can see below a Callback function is added to the XMLHttpRequest:
     var xhr;
     xhr = new XMLHttpRequest();
     xhr.open("GET", url); // Url for the connection
     xhr.addEventListener("load", app.retrieveJSON); // Callback function which handles the data
     xhr.send();

After the request is done the below function is executed with the new received data:
     retrieveJSON: function (response) {
         var data;

         data = JSON.parse(response.target.responseText);
         app.parseDataXhr(data.query.results.quote);
     },

http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/

###How to write testable code for unit-tests
What is important by writing code that you want to test later or before is that a function has one job.

Jasmin test are primarily two parts: a discribe block and an it block. In the below code you can see the syntax of a Jasmine test:
    describe('JavaScript addition operator', function () {
        it('adds two numbers together', function () {
            expect(1 + 2).toEqual(3);
        });
    });

With jasmine you can also add before and after functions so that every time the test environment is the same and fresh.

http://code.tutsplus.com/tutorials/testing-your-javascript-with-jasmine--net-21229
