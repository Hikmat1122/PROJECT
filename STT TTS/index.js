const startRecordButton = document.getElementById('start record')
const stopRecordButton = document.getElementById('stop record')
const transcriptDisplay = document.getElementById('transcript')

let recognition;
if ('webkitSpeechRecognition' in window){
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        startRecordButton.disabled = true;
        stopRecordButton.disabled = false;
        transcriptDisplay.innerHTML = "Listening.."
    };

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++){
            if (event.results[i].isFinal) {
                transcript += event.results[i][0].transcript;
            }
        }
        transcriptDisplay.innerHTML = transcript;
    };
    recognition.onerror = function (event) {
        console.log(event.error);
    }
    recognition.onend = function (){
        startRecordButton.disabled = false;
        stopRecordButton.disabled = true;
    };
} else {
    alert('Speech recognition not supported in this browser.');
}
startRecordButton.addEventListener('click', () => {
    recognition.start();
});

stopRecordButton.addEventListener('click', () => {
    recognition.stop();
});

const speakButton = document.getElementById('speak');
const textInput = document.getElementById('text-input');

speakButton.addEventListener('click', () => {
    const text = textInput.value;
    if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
});
