// alert("hello")
const frame = document.getElementById('frame');
// console.log(question);
const ques = document.getElementById('question');
// console.log(optionBox);


async function fetchData() {
    let response = await fetch('https://opentdb.com/api.php?amount=1&category=9&type=multiple');
    try {

        let data = await response.json();
        return data;
    } catch (error) {
        console.log('Error is HERE' + error);

    }
}


async function useData() {
    const data = await fetchData();
    console.log(data);
    // option array
    let allAnswers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];

    // Fisher-Yates shuffle algorithm to randomize the array
    for (let i = allAnswers.length - 1; i >= 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        [allAnswers[i], allAnswers[randomIndex]] = [allAnswers[randomIndex], allAnswers[i]];  // Swap elements
    }
    console.log(allAnswers);
    let h2;
    //adding questions and option on the page 
    ques.innerHTML = data.results[0].question;;

    let option = document.getElementsByClassName('ans');
    let ansSpace = Array.from(option);
    // adding options
    for (let i = 0; i < 4; i++) {
        ansSpace[i].innerHTML = allAnswers[i];

    }

    selectAnswer(data,ansSpace);
}

async function selectAnswer(d,allOption) {

    let correctAnswer = d.results[0].correct_answer;
    console.log(correctAnswer);
    console.log(allOption);
    
    let ent;
    const opt = document.getElementById('options')
    ent = opt.addEventListener('click', (e) => {
        console.log(e.target.classList);
        if(e.target.classList == 'ans' ){
        e.target.style.backgroundColor= 'yellow '
        for(let choice of allOption) {
            choice.classList.add('disabled');
        }
        
    }
    })
}

useData();

const next = document.getElementById('next');
next.addEventListener('click', () => {
    useData();
    selectAnswer();
})



