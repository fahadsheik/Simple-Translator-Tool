let langOption = document.querySelectorAll('select');
let fromText = document.querySelector('.fromText');
let transText = document.querySelector('.toTranslate');
let fromVoice = document.querySelector('.from');
let toVoice = document.querySelector('.to');
let cpyBtn= document.querySelector('.bx-copy');
let countValue = document.querySelector('.code_len');
let exchangeLang=document.querySelector('.bx-transfer');

langOption.forEach((get, con) => {
  for (let countryCode in language) {
    let selected = '';
    if ((con == 0 && countryCode == "en-GB") || (con == 1 && countryCode == "bn-IN")) {
      selected = "selected";
    }
    let option = `<option value="${countryCode}" ${selected}>${language[countryCode]}</option>`;
    get.insertAdjacentHTML('beforeend', option);
  }
});

fromText.addEventListener('input', function () {
  let content = fromText.value;
  let fromContent = langOption[0].value;
  let transContent = langOption[1].value; // Changed to second select

  let transLINK = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${transContent}`;

  fetch(transLINK)
    .then(response => response.json())
    .then(data => {
      transText.value = data.responseData.translatedText;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

fromVoice.addEventListener('click', function(){
    let fromTalk;
    fromTalk= new SpeechSynthesisUtterance(fromText.value);
    fromTalk.lang=langOption[0].value;
    speechSynthesis.speak(fromTalk)
})
toVoice.addEventListener('click', function(){
    let fromTalk;
    fromTalk= new SpeechSynthesisUtterance(transText.value);
    fromTalk.lang=langOption[1].value;
    speechSynthesis.speak(fromTalk)
})

cpyBtn.addEventListener('click',function(){
    navigator.clipboard.writeText(transText.value);
})

fromText.addEventListener('keyup',function() {
    countValue.innerHTML = `${fromText.value.length.toLocaleString()}/5,000`;
})

exchangeLang.addEventListener('click',function() {
    let tempText =fromText.value;
    fromText.value=transText.value;
    transText.value=tempText;

    let tempOpt=langOption[0].value;
    langOption[0].value=langOption[1].value;
    langOption[1].value = tempOpt;
})

