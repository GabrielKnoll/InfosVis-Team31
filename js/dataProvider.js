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
    console.log('called colorHeatmap');
    switch (category) {
        case Category.Revenue.name:
            console.log('selected revenue');
            applyHeatmapColorsFromFile('Dataset/csv/Umsatzrückgang.csv');
            break;
        case Category.Employee.name:
            console.log('selected employees');
            applyHeatmapColorsFromFile('Dataset/csv/Arbeitsplatzverlust.csv');
            break;
        case Category.Insolvency.name:
            console.log('selected insolvency');
            applyHeatmapColorsFromFile('Dataset/csv/Insolvenzentwicklung.csv');
            break;
    }
}

function applyHeatmapColorsFromFile(filename) {
    d3.csv(filename, function (data) {
        data.forEach(function (x, _) {
            const state = x['Bundesländer'];
            const value = x['Vorjahresvergleich'];
            setColor(state, value);
        })
    });
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
        createAreaGraph(result);
    })
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