class WebteSubj {


    constructor(year, a, b, c, d, e, f, fn) {
        this.year = year;
        this.a = a
        this.b = b
        this.c = c
        this.d = d
        this.e = e
        this.f = f
        this.fn = fn

    }

    seeByYear() {
        console.log("Hi term" + this.a + this.b + this.c + this.d + this.e + this.f + this.fn + this.year);
    }
}

const pie17 = document.getElementById("pie17");
const pie18 = document.getElementById("pie18");
const pie19 = document.getElementById("pie19");
const pie20 = document.getElementById("pie20");
const pie21 = document.getElementById("pie21");
const pie22 = document.getElementById("pie22");

const requiredPies = [pie17,pie18,pie19,pie20,pie21,pie22];

const webteTermsList = []


function preparePieData(indx) {
    var retList = []
   // retList.push(webteTermsList[i].a);
    console.log(indx)
    console.log(webteTermsList);
    console.log(webteTermsList[indx].a);
    retList.push(webteTermsList[indx].b);
    retList.push(webteTermsList[indx].c);
    retList.push(webteTermsList[indx].d);
    retList.push(webteTermsList[indx].e);
    retList.push(webteTermsList[indx].f);
    retList.push(webteTermsList[indx].fn);
    return retList
}

function displayPies(){
    for (let i = 0; i <requiredPies.length ; i++) {
        var data = [{
            values: preparePieData(i),
            labels: ['A', 'B', 'C', 'D', 'E', 'Fx', 'Fn'],
            type: 'pie',
            textinfo: "label+percent",
        }];

        var layout = {
            autosize: true,
            height: 380,
            width: 380,
            showlegend: false,
            title: "Známky za obdobie "+webteTermsList[i].year
        };



        Plotly.newPlot(requiredPies[i], data, layout, {responsive: true});

    }
}

function prepareAData() {

    var trace1 = {
        x: returnValue("year"),
        y: returnValue("a"),
        type: 'bar',
        name: 'Á-čka',
        marker: {
            color: 'rgb(49,130,189)',
            opacity: 0.7,
        }
    }

    var data = [trace1];
    var layout = {

        title: 'A-čka z WEBTE pre daný rok',
        autosize: true,
        yaxis: {
            title: 'Počet žiakov',
            titlefont: {
                size: 16,
                color: 'rgb(107, 107, 107)'
            }
        },
        xaxis: {
            tickangle: -45
        },
        barmode: 'group'
    }

    Plotly.newPlot('myDiv', data, layout, {responsive: true});
}


function prepareCompletionData() {

    var allSuccessfullArray = [];
    for (let i = 0; i < returnValue("year").length; i++) {
        allSuccessfullArray[i] = Number(webteTermsList[i].a)
            + Number(webteTermsList[i].b)
            + Number(webteTermsList[i].c)
            + Number(webteTermsList[i].d)
            + Number(webteTermsList[i].e)

        console.log(webteTermsList[i].a
            + " " +webteTermsList[i].b
            + " " +webteTermsList[i].c
            + " " +webteTermsList[i].d
            + " " +webteTermsList[i].e)

        console.log(allSuccessfullArray[i])
    }

    var allUnSeccArray  = [];
    for (let i = 0; i <returnValue("year").length ; i++) {
        allUnSeccArray[i] = Number(webteTermsList[i].f)+Number(webteTermsList[i].fn)
    }

    console.log(allSuccessfullArray)
    console.log(allUnSeccArray)
    var trace1 = {

        y: allSuccessfullArray,
        x: returnValue("year"),
        text: allSuccessfullArray.map(String),
        type: 'bar',
        name: 'Prešli',
        marker: {
            color: 'rgb(121, 255, 77)',
            opacity: 0.7,
        }
    };

    //TODO DOLEYITE HORIYONTALNY https://plotly.com/javascript/configuration-options/
    var trace2 = {
        y: allUnSeccArray,
        x: returnValue("year"),
        text: allUnSeccArray.map(String),
        type: 'bar',
        name: 'Neprešli',
        marker: {
            color: 'rgb(255, 112, 77)',
            opacity: 0.7,
        }
    };

    var data = [trace1, trace2];

    var layout = {
        responsive: true,
        autosize: true,
        staticPlot: true,
        title: 'Hrdinovia čo prešli/neprešli',
        yaxis: {
            title: 'Počet žiakov',
            titlefont: {
                size: 16,
                color: 'rgb(107, 107, 107)'
            }
        },
        xaxis: {
            tickangle: -45
        },
        barmode: 'group'
    };

    Plotly.newPlot('mySecDiv', data, layout,{responsive: true}, {staticPlot: true});
}


function returnValue(what) {
    var retArr = [];
    for (let i = 0; i < webteTermsList.length; i++) {
        if (what === "year") {
            retArr.push(webteTermsList[i].year);
        } else if (what === "a") {
            retArr.push(webteTermsList[i].a);
        } else if (what === "b") {
            retArr.push(webteTermsList[i].b);
        } else if (what === "c") {
            retArr.push(webteTermsList[i].c);
        } else if (what === "d") {
            retArr.push(webteTermsList[i].d);
        } else if (what === "e") {
            retArr.push(webteTermsList[i].e);
        } else if (what === "fx") {
            retArr.push(webteTermsList[i].fx);
        } else if (what === "fn") {
            retArr.push(webteTermsList[i].fn);
        }
    }

    return retArr;
}

function parseXML() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "z03.xml", false);
    xmlHttp.send();
    const xmlDoc = xmlHttp.responseXML;

    const zaznamElements = xmlDoc.getElementsByTagName("zaznam");

    for (const zaznamElement of zaznamElements) {
        const year = zaznamElement.querySelector("rok").textContent.split(" ")[1];
        const hodnotenieElement = zaznamElement.querySelector("hodnotenie");
        const a = hodnotenieElement.querySelector("A").textContent;
        const b = hodnotenieElement.querySelector("B").textContent;
        const c = hodnotenieElement.querySelector("C").textContent;
        const d = hodnotenieElement.querySelector("D").textContent;
        const e = hodnotenieElement.querySelector("E").textContent;
        const fx = hodnotenieElement.querySelector("FX").textContent;
        const fn = hodnotenieElement.querySelector("FN").textContent;

        const webteSubj = new WebteSubj(year, a, b, c, d, e, fx, fn);
        webteTermsList.push(webteSubj);
        webteSubj.seeByYear();
    }
}






console.log("HI GIGI")
parseXML();
prepareAData();
prepareCompletionData();
displayPies();


