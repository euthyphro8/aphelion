

interface ICustomer {
    id: string;
    name: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    company: string;
    avatar: string;
}

export class Main {
    
    constructor() {
        const btn = document.getElementById("populate") as HTMLButtonElement;
        btn.onclick = () => this.populateData();
    }

    public async populateData() {
        let tableBody = document.getElementById("table-body")
        let url = "https://cs4350.herokuapp.com/demo/all";
        let data = await this.loadData(url);
        tableBody.innerHTML = this.createHtmlFromArray(data);
    }

    public async loadData(url: string) : Promise<ICustomer[]> {
        let result = await fetch(url);
        return await result.json() as ICustomer[];
    }

    public createHtmlFromArray(dataArray : ICustomer[]) : string {
        let listHtml = "";
        let template = document.getElementById("table-template");
        let templateHtml = template.innerHTML;

        for(let index = 0; index < dataArray.length; index++) {
            listHtml += templateHtml.replace(/{{id}}/g,         dataArray[index].id);
            listHtml += templateHtml.replace(/{{name}}/g,       dataArray[index].name);
            listHtml += templateHtml.replace(/{{username}}/g,   dataArray[index].username);
            listHtml += templateHtml.replace(/{{email}}/g,      dataArray[index].email);
            listHtml += templateHtml.replace(/{{address}}/g,    dataArray[index].address);
            listHtml += templateHtml.replace(/{{phone}}/g,      dataArray[index].phone);
            listHtml += templateHtml.replace(/{{website}}/g,    dataArray[index].website);
            listHtml += templateHtml.replace(/{{company}}/g,    dataArray[index].company);
            listHtml += templateHtml.replace(/{{avatar}}/g,     dataArray[index].avatar);
        }
        return listHtml;
    }
}

new Main();