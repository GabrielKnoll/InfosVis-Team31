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

const ssv = d3.dsvFormat(';');
function colorHeatmap(category) {
    console.log('called colorHeatmap');
    var data;
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
    d3.csv(filename, function(data) {
        data.forEach(function(x,_) {
            const state = x['Bundesländer'];
            const value = x['Vorjahresvergleich'];
            setColor(state, value);
        })
    });
}