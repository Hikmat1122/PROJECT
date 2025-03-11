const languages =[
    {code: 'en-US', name: 'English (US)' },
    {code: 'en-GB', name: 'English (UK)' },
    {code: 'es-ES', name: 'Spanish (Spain)' },
    {code: 'fr-FR', name: 'French' },
    {code: 'de-DE', name: 'German' },
    {code: 'hi-IN', name: 'Hindi' },
    {code: 'zh-CN', name: 'Chinese (Mandarin)' },
    {code: 'ar-SA', name: 'Arabic' },
];

const speechLangSelect = document.getElementById('speech-lang');
const ttsLangSelect = document.getElementById('tts-lang');

languages.forEach(lang => {
    let option1 = new Option(lang.name, lang.code);
    let option2 = new Option(lang.name, lang.code);
    speechLangSelect.add(option1);
    ttsLangSelect.add(option2);
});

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
        swal("Sorry!", "Opps, something went wrong. Please try again later.", "error");

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
    recognition.lang = speechLangSelect.value;
    recognition.start();
    swal("Listening...", "Please Speak Now!");
});

stopRecordButton.addEventListener('click', () => {
    recognition.stop();
   
});

document.getElementById("speak").addEventListener("click", function (){
    let text = document.getElementById("text-input").value;
    if (text.trim() ===""){
        swal("Sorry!", "Opps, Please enter some text.",);
        return;
        
    }
    let utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
    swal({
        title: "Speaking...",
        text: `"${text}" is being read aloud.` ,
        timer: 2000,
        showConfrimButton: false,
    });
});

// const speakButton = document.getElementById('speak');
// const textInput = document.getElementById('text-input');

// speakButton.addEventListener('click', () => {
//     const text = textInput.value;
//     if (text) {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.lang = ttsLangSelect.value;
//         window.speechSynthesis.speak(utterance);
//     }
    
// });
