class Category {
    static Revenue = new Category('revenue');
    static Employee = new Category('employees');
    static Insolvency = new Category('insolvency');

    constructor(name) {
        this.name = name;
    }

    toString() {
        return this.name;
    }
}

function colorHeatmap(category) {
    switch (category) {
        case Category.Revenue.name:
            console.log('selected revenue');
            applyHeatmapColorsFromFile('Dataset/csv/Umsatzrückgang.csv');
            buildLegendRevenue();
            break;
        case Category.Employee.name:
            console.log('selected employees');
            applyHeatmapColorsFromFile('Dataset/csv/Arbeitsplatzverlust.csv');
            buildLegendEmplyees();
            break;
        case Category.Insolvency.name:
            console.log('selected insolvency');
            applyHeatmapColorsFromFile('Dataset/csv/Insolvenzentwicklung.csv');
            buildLegendInsolvencies();
            break;
    }
}

function applyHeatmapColorsFromFile(filename) {
    d3.csv(filename, function (data) {
        data.forEach(function (x, _) {
            const state = x['Bundesland'];
            const value = x['Vergleich'];
            if(filename.includes('Umsatzrückgang') ){
                setColorRevenue(state, value);
            }else if(filename.includes('Arbeitsplatzverlust') ){
                setColorEmployees(state, value);
            }else{
                setColorInsolvencies(state, value);
            }

        })
    });
}

function updateMouseOvers(category) {
    mouseOverInfoCollectionForCategory(category, function(collection) {
        configureMouseOvers(collection);
    })
}

function updateChart(category, state) {
    d3.csv(datasetForCategory(category), function (data) {
        const stateEntry = data.filter(entry => entry['Bundesland'] === state);
        const months = Object.entries((Object.entries(stateEntry)[0][1])).slice(1);
        let result = [];
        for (const key in months) {
            const date = d3.timeParse("%Y-%m-%d")(months[key][0]);
            const value = months[key][1];
            if (value != "NaN") {
                result.push({date, value});
            }
        }
        console.log("cart" + category)
        createAreaGraph(result, category);
    })
}

function mouseOverInfoCollectionForCategory(category, callback) {
    d3.csv(rankingForCategory(category), function(data) {
        callback(STATES.map(function(state) {
            const stateData = data.filter(entry => entry["Bundesland"] === toTitleCase(state))[0];
            const rankingInfo = new RankingInfo(
                state,
                stateData["Entwicklung"],
                stateData["Vergleich"],
                stateData["Platz"]
            );
            return mouseOverConfig(category, rankingInfo)
        }));
    })
}

function RankingInfo(state, development, comparison, rank) {
    this.state = state;
    this.development = development;
    this.comparison = comparison;
    this.rank = rank;
}

function mouseOverConfig(category, rankingInfo) {
    switch (category) {
        case Category.Employee.name:
            return [rankingInfo.state, rankingInfo.rank + " der höchsten Arbeitsplatzverluste", "Rückgang: " + rankingInfo.development, "Vorjahresvergleich: -" + rankingInfo.comparison + "%"];
        case Category.Insolvency.name:
            return [rankingInfo.state, rankingInfo.rank + " der Insolvenzentwicklung", "Entwicklung: " + rankingInfo.development, "Vorjahresvergleich: " + rankingInfo.comparison + "%"];
        case Category.Revenue.name:
            return [rankingInfo.state, rankingInfo.rank + " der höchsten Umsatzverluste", "Rückgang: " + rankingInfo.development, "Vorjahresvergleich: -" + rankingInfo.comparison + "%"];
    }
}
function datasetForCategory(category) {
    switch (category) {
        case Category.Employee.name:
            return "./Dataset/csv/employees.csv";
        case Category.Insolvency.name:
            return "./Dataset/csv/insolvencies.csv";
        case Category.Revenue.name:
            return "./Dataset/csv/revenue.csv";
    }
}

function rankingForCategory(category) {
    switch (category) {
        case Category.Employee.name:
            return "./Dataset/csv/Arbeitsplatzverlust.csv";
        case Category.Insolvency.name:
            return "./Dataset/csv/Insolvenzentwicklung.csv";
        case Category.Revenue.name:
            return "./Dataset/csv/Umsatzrückgang.csv";
    }
}

//https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
function toTitleCase(str) {
    return str.replace(
        /([^\W_]+[^\s-]*) */g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}