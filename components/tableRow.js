class TableRow extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});

        const tr = document.createElement("tr");
        tr.setAttribute("class", "table-row");

        const indexElem = tr.appendChild(document.createElement("td"));
        indexElem.setAttribute("class", "index");
        indexElem.textContent = this.getAttribute("index");

        const nameElem = tr.appendChild(document.createElement("td"));
        nameElem.setAttribute("class", "name");
        nameElem.textContent = this.getAttribute("name");

        const diffElem = tr.appendChild(document.createElement("td"));
        diffElem.setAttribute("class", "diff");
        diffElem.textContent = this.getAttribute("diff");

        const style = document.createElement('style');
        style.textContent = `
            td {
              border: 1px gray;
              text-align: left;
              padding: 10px;
            }

            tr {
                border-bottom: 0.8px solid rgba(128, 128, 128, 0.24);
            }
            
            tr:hover {
              border-radius: 5px;
            }
            
           td.index {
              width: 130px;
              position: relative;
            }
            
            td.name {
              width: 200px;
              position: relative;
              text-decoration: underline;
            }
            
            td.diff {
              width: 163px;
              position: relative;
            }
            
          
        `
        this.shadowRoot.append(style, tr);
    }
}

customElements.define("table-row-component", TableRow);

