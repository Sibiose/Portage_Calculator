

export const levels = [{title:"0-1 ani", value:1},{title:"1-2 ani", value:2},{title:"2-3 ani", value:3},
    {title:"3-4 ani", value:4},{title:"4-5 ani", value:5},{title:"5-6 ani", value:6}]


export const domains = [
    {title:"Socializare", questionsNr:83, levels:[{value:1, totalNr:28},
        {value:2, totalNr:16},{value:3, totalNr:7},{value:4, totalNr:12},
        {value:5, totalNr:9},{value:6, totalNr:11}]},

    {title:"Limbaj", questionsNr:99, levels:[{value:1, totalNr:10},
        {value:2, totalNr:18},{value:3, totalNr:30},{value:4, totalNr:12},
        {value:5, totalNr:15},{value:6, totalNr:14}]},

    {title:"Autoservire", questionsNr:105, levels:[{value:1, totalNr:13},
        {value:2, totalNr:13},{value:3, totalNr:26},{value:4, totalNr:15},
        {value:5, totalNr:23},{value:6, totalNr:15}]},

    {title:"Cognitiv", questionsNr:108, levels:[{value:1, totalNr:14},
        {value:2, totalNr:10},{value:3, totalNr:16},{value:4, totalNr:24},
        {value:5, totalNr:22},{value:6, totalNr:22}]},

    {title:"Motor", questionsNr:140, levels:[{value:1, totalNr:45},
        {value:2, totalNr:18},{value:3, totalNr:17},{value:4, totalNr:15},
        {value:5, totalNr:16},{value:6, totalNr:29}]}
];

export const qdValues = [
    {min: 0, max: 30, title:"Retard profund"},
    {min: 31,max: 39, title:"Retard sever"},
    {min: 40,max: 54, title:"Retard moderat"},
    {min: 55,max: 69, title:"Retard ușor"},
    {min: 70,max: 79, title:"Zona de graniță"},
    {min: 80,max: 89, title:"Mediu inferior"},
    {min: 90,max: 109, title:"Mediu"},
    {min: 110,max: 119, title:"Mediu superior"},
    {min: 120,max: 129, title:"Foarte bine"},
    {min: 130,max: 200, title:"Excepțional"}
]

export const createForm = (parentContainer) =>{
    domains.forEach((domain)=>{
    //Create Domain container
    let domainContainer = document.createElement("div");
    domainContainer.classList.add("domainContainer");
    parentContainer.appendChild(domainContainer);

    let domainTitle = document.createElement("h3");
    domainTitle.innerText = domain.title;
    domainContainer.appendChild(domainTitle);
    domain.levels.forEach((level)=>{
        //Create level container
        let levelContainer = document.createElement("div");
        levelContainer.classList.add("levelContainer");
        domainContainer.appendChild(levelContainer);

        let levelTitle = document.createElement("paragraph");
        levelTitle.classList.add("level-title");
        levelTitle.innerText = levels.find((v)=> v.value === level.value).title;
        levelContainer.appendChild(levelTitle);

        let inputElement = document.createElement("input");
        inputElement.type = "number";
        inputElement.value = 0;
        inputElement.id = "level-"+ domain.title + level.value;
        inputElement.classList.add("input-element")
        inputElement.addEventListener("input", (e)=>{
            let value = e.target.valueAsNumber;
            if(value > level.totalNr){
                e.target.value = level.totalNr;
            } else if(value < 0){
                e.target.value = 0;
            }
        })
        let inputContainer = document.createElement("div");
        inputContainer.classList.add("input-container");
        levelContainer.appendChild(inputContainer);
        let totalLabel = document.createElement("paragraph");
        totalLabel.classList.add("input-label");
        totalLabel.innerText = " / " + level.totalNr;
        inputContainer.appendChild(inputElement)
        inputContainer.appendChild(totalLabel);
    })
})
}

export const createResultsTab = (parentContainer) =>{
    domains.forEach((domain)=>{
        let domainTitle = document.createElement("h3");
        let resultDomainContainer = document.createElement("div");
        resultDomainContainer.classList.add("result-domain-container")
        domainTitle.innerText = domain.title;
        parentContainer.appendChild(resultDomainContainer);
        resultDomainContainer.appendChild(domainTitle);
    
        let qd = document.createElement("h4");
        qd.id = "result-qd-"+ domain.title;
        qd.innerText = "QD =  ";
        let vm = document.createElement("h4");
        vm.id = "result-vm-"+ domain.title;
        vm.innerText = "VM =  ";
        resultDomainContainer.appendChild(qd);
        resultDomainContainer.appendChild(vm);
        
    })
}
