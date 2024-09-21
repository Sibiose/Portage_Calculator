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
    let ageElement = document.getElementById("total-VC");
    let cronologicalAge = calculateAge();
    if(cronologicalAge <= 0){
        return;
    }
    ageElement.innerText = "Vârsta cronologică = " + cronologicalAge.toFixed(2);
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
    resultTotalQd.innerText = "QD TOTAL = " + finalQd.toFixed(2) + " ";
    let span = document.createElement("span");
    span.innerText = getQdValue(finalQd);
    span.style.color = getColorFromRange(finalQd);
    resultTotalQd.appendChild(span);
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
    if(!birthDateInput.value || !evaluationDateInput.value){
        birthDateInput.style.color = "red";
        evaluationDateInput.style.color = "red";
        return 0;
    } else{
        birthDateInput.style.color = "black";
        evaluationDateInput.style.color = "black";
    }
    let birthDate = new Date(birthDateInput.value);
    let evaluationDate = new Date(evaluationDateInput.value);

    const diffInMs = evaluationDate - birthDate;
    const msInYear = 1000 * 60 * 60 * 24 * 365.25; // Includes leap years
    let age = diffInMs / msInYear;
    if(age <= 0 ){
        birthDateInput.style.color = "red";
        evaluationDateInput.style.color = "red";
        return 0;
    } else{
        birthDateInput.style.color = "black";
        evaluationDateInput.style.color = "black";
    }
    return diffInMs / msInYear;
}

const calculateDomainVm = (domain) =>{
    let totalScore = 0;

    for(let i = 0; i <= domain.levels.length -1; i++){
        let level = domain.levels[i];
        let levelInput = document.getElementById("level-"+ domain.title + level.value);
        let levelValue = getParsedValue(levelInput.value, level.totalNr);
        let levelScore = levelValue * 100 / level.totalNr;
        totalScore += levelScore;
        if(levelScore <= 30){
            break;
        }
    }
    return totalScore / 100;
}

const getColorFromRange = (value, min = 30, max = 130) =>{
    // Clamp the value to the given range
    if (value < min) value = min;
    if (value > max) value = max;

    // Find the percentage position of the value in the range
    let ratio = (value - min) / (max - min);

    // Calculate red and green components based on the ratio
    let red = Math.round(255 * (1 - ratio));  // Red decreases as value increases
    let green = Math.round(255 * ratio);      // Green increases as value increases

    // Return the color in RGB format
    return `rgb(${red}, ${green}, 0)`;
}



