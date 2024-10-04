// Selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

let coinCount = 0; // Initialize the coin count

// If startQuiz button clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); // Show info box
}

// If exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
}

// If continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    showQuetions(0); // Call showQuestions function
    queCounter(1); // Pass 1 parameter to queCounter
    startTimer(15); // Call startTimer function
    startTimerLine(0); // Call startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// If restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); // Show quiz box
    result_box.classList.remove("activeResult"); // Hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); // Call showQuestions function
    queCounter(que_numb); // Pass que_numb value to queCounter
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    startTimer(timeValue); // Call startTimer function
    startTimerLine(widthValue); // Call startTimerLine function
    timeText.textContent = "Time Left"; // Change the text of timeText to Time Left
    next_btn.classList.remove("show"); // Hide the next button
}

// If quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); // Reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// If Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { // If question count is less than total question length
        que_count++; // Increment the que_count value
        que_numb++; // Increment the que_numb value
        showQuetions(que_count); // Call showQuestions function
        queCounter(que_numb); // Pass que_numb value to queCounter
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        startTimer(timeValue); // Call startTimer function
        startTimerLine(widthValue); // Call startTimerLine function
        timeText.textContent = "Time Left"; // Change the timeText to Time Left
        next_btn.classList.remove("show"); // Hide the next button
    } else {
        clearInterval(counter); // Clear counter
        clearInterval(counterLine); // Clear counterLine
        showResult(); // Call showResult function
    }
}

// ...

// Modify the showQuetions function to shuffle options
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    // Get the selected question
    const selectedQuestion = questions[index];

    // Create a new span tag for the selected question
    let que_tag = '<span>' + selectedQuestion.numb + ". " + selectedQuestion.question + '</span>';

    // Shuffle the order of options randomly
    const shuffledOptions = shuffleArray(selectedQuestion.options);

    // Create option tags for the shuffled options
    let option_tag = '';
    for (let i = 0; i < shuffledOptions.length; i++) {
        option_tag += '<div class="option" onclick="optionSelected(this)"><span>' + shuffledOptions[i] + '</span></div>';
    }

    que_text.innerHTML = que_tag; // Add the question to the HTML
    option_list.innerHTML = option_tag; // Add the shuffled options to the HTML
}

// ...

// If user clicked on option
function optionSelected(answer) {
    clearInterval(counter); // Clear counter
    clearInterval(counterLine); // Clear counterLine
    let userAns = answer.textContent; // Get user selected option
    let correcAns = questions[que_count].answer; // Get correct answer from array
    const allOptions = option_list.children.length; // Get all option items

    if (userAns == correcAns) { // If user selected option is equal to array's correct answer
        userScore += 1; // Upgrade score value with 1
        coinCount += 10; // Increase coin count
        answer.classList.add("correct"); // Add green color to correct selected option
        answer.insertAdjacentHTML("beforeend", '<div class="coin-icon">+10 coins</div>'); // Add coin icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); // Add red color to correct selected option
        answer.insertAdjacentHTML("beforeend", '<div class="coin-icon">+0 coins</div>'); // Add coin icon to incorrect selected option
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { // If there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); // Add green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", '<div class="coin-icon">+10 coins</div>'); // Add coin icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); // Once user selects an option, disable all options
    }
    next_btn.classList.add("show"); // Show the next button if user selected any option
}

function showResult() {
    info_box.classList.remove("activeInfo"); // Hide info box
    quiz_box.classList.remove("activeQuiz"); // Hide quiz box
    result_box.classList.add("activeResult"); // Show result box
    const scoreText = result_box.querySelector(".score_text");

    // Modify the scoreText to include the earned coin count
    let scoreTag = '';
    if (userScore > 3) {
        scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length +
            '</p>. You earned <span class="coins">' + coinCount + ' coins</span>.</span>';
    } else if (userScore > 1) {
        scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length +
            '</p>. You earned <span class="coins">' + coinCount + ' coins</span>.</span>';
    } else {
        scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length +
            '</p>. <br> You earned <span class="coins"> <p>' + coinCount + '</p> coins</span>.</span>';
    }

    scoreText.innerHTML = scoreTag;
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; // Change the value of timeCount with time value
        time--; // Decrement the time value
        if (time < 9) { // If timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; // Add a 0 before time value
        }
        if (time < 0) { // If timer is less than 0
            clearInterval(counter); // Clear counter
            timeText.textContent = "Time Off"; // Change the time text to time off
            const allOptions = option_list.children.length; // Get all option items
            let correcAns = questions[que_count].answer; // Get correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { // If there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); // Add green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", '<div class="coin-icon">+10 coins</div>'); // Add coin icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); // Once user selects an option, disable all options
            }
            next_btn.classList.add("show"); // Show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; // Upgrade time value with 1
        time_line.style.width = time + "px"; // Increase width of time_line with px by time value
        if (time > 549) { // If time value is greater than 549
            clearInterval(counterLine); // Clear counterLine
        }
    }
}

function queCounter(index) {
    // Create a new span tag and pass the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; // Add new span tag inside bottom_ques_counter
}

// Define a function to shuffle an array randomly
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}
