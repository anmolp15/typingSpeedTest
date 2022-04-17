// this list contains all sentences to be displayed for typing
const list = [
    "Finally he began typing. She heard him typing in the background. He whipped out his phone and trotted down the stairs, typing a response to one of the many texts he'd received.",
    "Try taking a typing speed test before and after to see for yourself. You can even work through this section multiple times and then track your progress.",
    "A good way to increase your typing speed is to type easy sentences over and over. That will help you to type smoothly without pausing.",
    "An English pangram is a sentence that contains all 26 letters of the English alphabet. The most well known English pangram is probably 'The quick brown fox jumps over the lazy dog'. My favorite pangram is 'Amazingly few discotheques provide jukeboxes'.",
    "Your speed and accuracy will be much higher when you can concentrate on the screen without looking at your hands."
];


const sentenseDisplay = document.getElementById("sentense-display");
const textArea = document.getElementById("input-text");
const btn = document.getElementById("start-btn");
const resultDiv = document.getElementById("results");

var startTime, endTime;
var randomIndex; // this index should only be chosen once - after clicking start and it need to maintain that value until next time start is clicked

btn.addEventListener('click', function() {

    // to get current date
    let date = new Date();

    if (btn.innerText == 'Start') {
        textArea.value = ''; // set the textarea empty
        startTime = date.getTime(); // get the starting time
        btn.innerText = 'Done'; // set the text of button to done
        textArea.focus(); // get text arear automatically in focus
        randomIndex = Math.floor(Math.random()*list.length); //generate randon number between 0 and array.length
        sentenseDisplay.innerText = list[randomIndex]; // get the sentense at random generated index and set it to div
    }
    else {
        endTime = date.getTime(); //get the end time
        var timeTaken = endTime - startTime; //totsl time taken between 2 button clicks
        btn.innerText = 'Start';
        var typedText = textArea.value; // get the typed string
        typedText = typedText.trim(); //remove extra spaces 
        var typedWordsArray = typedText.split(' '); // split string into array seperated with spaces
        var accuracy = accuracyFunction(list[randomIndex].split(' '), typedWordsArray);  //passing arrays to get accuracy
        var typedWordsCount; // to avoid problem due to empty string | array will still contain an element as '' making its length = 1;
        if(typedWordsArray == '') {
            typedWordsCount = 0;
        }else {
            typedWordsCount = typedWordsArray.length
        }
        var speed = Math.floor((typedWordsCount/timeTaken) *60000); //calculate speed using no. of typed words and time taken
        resultDiv.style.display = 'block';
        resultDiv.innerText =`Your speed is ${speed} words per minute with an Accuracy of ${accuracy}%`; // set the text
    }
})


// this function will return the accuracy of typed string by comparing it with actual string word by word
// function takes two arrays of string as arguments 
function accuracyFunction(actualWordsArray, typedWordsArray) {
    let correctCount = 0;
    actualWordsArray.forEach((item, index)=>{
        if (item == typedWordsArray[index]) {
            correctCount++;
        }     
    })
    return (correctCount/actualWordsArray.length)*100;
}