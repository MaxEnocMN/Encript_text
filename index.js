const textarea = document.querySelector("#text");
const btnEncrypt = document.querySelector(".encrypt");
const btnDecrypt = document.querySelector(".decrypt");
const btnCopy = document.querySelector(".copy");
const encryptedTextarea = document.querySelector("#encrypted-textarea");
const cardContent = document.querySelector(".card__content");

function showTextEncrypted(textareaValue) {
       if (textareaValue !== "") {
           encryptedTextarea.classList.remove("hidden");
           cardContent.style.display = "none";
    } else {
         
        encryptedTextarea.classList.add("hidden");
         
        cardContent.style.display = "flex";
    }
         encryptedTextarea.value = textareaValue;
}

function showTextarea(textareaValue) {
    if (encryptedTextarea.value == "") {
        encryptedTextarea.classList.add("hidden");
        cardContent.style.display = "flex";
    }
        textarea.value = textareaValue;
}



function checkText(textareaValue) {
     let lowerCaseText = textareaValue.toLowerCase();

  let newText = lowerCaseText.replace(/á|à|ä/g, "a")
    .replace(/é|è|ë/g, "e")
    .replace(/í|ì|ï/g, "i")
    .replace(/ó|ò|ö/g, "o")
    .replace(/ú|ù|ü/g, "u")
    .replace(/ñ/g, "n")
    .replace(/ç/g, "c");

  return newText;
}

function replaceAccent(char) {
  const accents = ["á", "é", "í", "ó", "ú", "à", "è", "ì", "ò", "ù", "ä", "ë", "ï", "ö", "ü", "ñ", "ç"];
  const noAccent = ["a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "a", "e", "i", "o", "u", "n", "c"];

  const index = accents.indexOf(char);
  return index !== -1 ? noAccent[index] : char;
}

textarea.addEventListener("keyup", (event) => {
  let newText = "";
  for (let i = 0; i < event.target.value.length; i++) {
    newText += replaceAccent(event.target.value[i]);
  }
  textarea.value = newText;
});

function encryptText(textareaValue) {
   
    let cleanText = checkText(textareaValue);
    
    let newText = "";

    
    for (let i = 0; i < cleanText.length; i++) {
        let letter = cleanText[i];
       
        switch(letter) {
            
            case 'a':
                newText += "ai";
                break;
            
            case 'e':
                newText += "enter";
                break;
           
            case 'i':
                newText += "imes";
                break;
                         case 'o':
                newText += "ober";
                break;
                        case 'u':
                newText += "ufat";
                break;
             
            default:
                newText += letter;
        }
    }
     
    showTextEncrypted(newText);
}


 
function decryptText(textareaValue) {
    let cleanText = checkText(textareaValue);
        let newText = cleanText.replace(/ufat/g, "u")
                        .replace(/ober/g, "o")
                        .replace(/imes/g, "i")
                        .replace(/enter/g, "e")
                        .replace(/ai/g, "a");
    
    textareaValue = newText;
    showTextEncrypted(textareaValue);
}

function copyText(value) {
     
    let originalText = btnCopy.innerHTML;
     
    if (value !== "") {
        
        encryptedTextarea.select();
        encryptedTextarea.setSelectionRange(0, 999);
                navigator.clipboard.writeText(value);
        
        btnCopy.innerHTML = "¡Texto copiado!";
                setTimeout(function() {
            btnCopy.innerHTML = originalText;
        }, 1000);
    }
}

 

btnEncrypt.addEventListener("click", () => {
    encryptText(textarea.value);
});

btnDecrypt.addEventListener("click", () => {
    decryptText(textarea.value);
});

btnCopy.addEventListener("click", function() {
    copyText(encryptedTextarea.value);
});
