import { domains, levels, qdValues, createForm, createResultsTab } from "./seed.js"

const calculatorContainer = document.getElementById("calculator-container");
const resultsContainer = document.getElementById("results-container");
const birthDateInput = document.getElementById("birth-date");
const evaluationDateInput = document.getElementById("evaluation-date");
const calculateBtn = document.getElementById("calculate-btn");

createForm(calculatorContainer);

createResultsTab(resultsContainer);

//Calculations part

calculateBtn.addEventListener("click", ()=>{

    let cronologicalAge = calculateAge();
    let totalQd = 0;
    let totalVM = 0;
    domains.forEach(domain=>{
        let domainQd = document.getElementById("result-qd-"+ domain.title);
        let domainVm = document.getElementById("result-vm-"+ domain.title);
        let vmScore = calculateDomainVm(domain);
        let qdScore = calculateQd(vmScore, cronologicalAge);
        domainVm.innerText = "VM = "+ vmScore.toFixed(2);
        domainQd.innerText = "QD = "+ qdScore.toFixed(2);
        totalQd += qdScore;
        totalVM += vmScore;
    })

    let resultTotalQd = document.getElementById("total-qd");
    let resultTotalVm = document.getElementById("total-vm");
    let finalQd = calculateQd(totalVM /5, cronologicalAge);
    let finalVm = totalVM /5; 
    resultTotalQd.innerText = "QD TOTAL = " + finalQd.toFixed(2) + " " + getQdValue(finalQd);
    resultTotalVm.innerText = "Vârsta mentală = " + finalVm.toFixed(2);
})

const getParsedValue = (value, max)=>{
    return value > max ? max : value < 0 ? 0 : value ?? 0;
}

const calculateQd = ( vm, vc)=>{
    return vm/vc * 100;
}

const getQdValue = (qd)=>{
return qdValues.find(value=> qd <= value.max && qd >= value.min)?.title ?? "";
}

const calculateAge = ()=>{
    let birthDate = new Date(birthDateInput.value);
    let evaluationDate = new Date(evaluationDateInput.value);
    const diffInMs = evaluationDate - birthDate;
    const msInYear = 1000 * 60 * 60 * 24 * 365.25; // Includes leap years
    return diffInMs / msInYear;
}

const calculateDomainVm = (domain) =>{
    let totalScore = 0;
    domain.levels.forEach(level=>{
        let levelInput = document.getElementById("level-"+ domain.title + level.value);
        let levelValue = getParsedValue(levelInput.value, level.totalNr);
        let levelScore = levelValue * 100 / level.totalNr;
        totalScore += levelScore;
    })
    return totalScore / 100;
}



