let ruzeKom = document.getElementById("ruza");
let ljiljaniKom = document.getElementById("ljiljan");
let gerberiKom = document.getElementById("gerber");
let dodatniPoklon = document.getElementsByName("dodatno");
let plusDodatno = document.querySelectorAll(".hidden");
let nacinPlacanja = document.getElementsByName("placanje");
let rezultatPorudzbine = document.querySelectorAll(".rezultat-hidden");
let paragrafRezultat = document.querySelectorAll(".para-hidden");
let alertParagraf = document.getElementById("hidden-alert-para");

let checkbox1 = document.querySelector("input[id='bombonjera']");
let checkbox2 = document.querySelector("input[id='cokolada']");
let checkbox3 = document.querySelector("input[id='sampanjac']");

let btnIzracunaj = document.querySelector(`button[type="submit"]`);
let btnResetuj = document.querySelector(`button[type="reset"]`);

let ruzaFotoDiv = document.getElementById("ruza-foto");
let ljiljanFotoDiv = document.getElementById("ljiljan-foto");
let gerberFotoDiv = document.getElementById("gerber-foto");

let ukupnaCenaBezPopusta = document.getElementById("uk-cena-bez-popusta");
let ukupnaCenaPopust = document.getElementById("uk-cena-popust");
let ukupnaCenaKes = document.getElementById("uk-cena-kes");

let prikaziSlike = () => {
  for (let i = 0; i < ruzeKom.value; i++) {
    let imgRuza = document.createElement("img");
    imgRuza.src = "slike/ruzapng.png";
    imgRuza.style.width = "40px";
    ruzaFotoDiv.append(imgRuza);
  }
  for (let i = 0; i < ljiljaniKom.value; i++) {
    let imgLjiljan = document.createElement("img");
    imgLjiljan.src = "slike/ljiljanpng.png";
    imgLjiljan.style.width = "40px";
    ljiljanFotoDiv.append(imgLjiljan);
  }
  for (let i = 0; i < gerberiKom.value; i++) {
    let imgGerber = document.createElement("img");
    imgGerber.src = "slike/gerberpng.png";
    imgGerber.style.width = "40px";
    gerberFotoDiv.append(imgGerber);
  }
};

btnIzracunaj.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    ruzeKom.value == "" &&
    ljiljaniKom.value == "" &&
    gerberiKom.value == "" &&
    !checkbox1.checked &&
    !checkbox2.checked &&
    !checkbox3.checked
  ) {
    setTimeout(function () {
      window.location.reload(1);
    }, 2000);
    return alertParagraf.classList.remove("hidden-alert");
  }

  if (
    ruzeKom.value == 0 &&
    ljiljaniKom.value == 0 &&
    gerberiKom.value == 0 &&
    !checkbox1.checked &&
    !checkbox2.checked &&
    !checkbox3.checked
  ) {
    setTimeout(function () {
      window.location.reload(1);
    }, 2000);
    return alertParagraf.classList.remove("hidden-alert");
  }

  let valueR = ruzeKom.value * 150;
  let valueLj = ljiljaniKom.value * 120;
  let valueG = gerberiKom.value * 70;
  let ukupnoZaCvece = valueR + valueLj + valueG;
  let ukupnoZaDodatniPoklon = 0;

  dodatniPoklon.forEach((poklon) => {
    if (poklon.checked) {
      ukupnoZaDodatniPoklon += 500;

      if (poklon.value == "bombonjera") {
        plusDodatno[0].classList.remove("hidden");
      }
      if (poklon.value == "cokolada") {
        plusDodatno[1].classList.remove("hidden");
      }
      if (poklon.value == "sampanjac") {
        plusDodatno[2].classList.remove("hidden");
      }
    }
  });

  let ukupnoZaSve = ukupnoZaCvece + ukupnoZaDodatniPoklon;
  let ukupnaCenaSaPopustom = 0;
  let ukupnaCenaZaKes = 0;

  nacinPlacanja.forEach((nacin) => {
    if (nacin.checked) {
      if (nacin.value == "kartica" && ukupnoZaSve > 2000) {
        ukupnaCenaSaPopustom = ukupnoZaSve - ukupnoZaSve * 0.1;
        ukupnaCenaPopust.textContent = ukupnaCenaSaPopustom;
        ukupnaCenaBezPopusta.textContent = ukupnoZaSve;
        paragrafRezultat[0].classList.remove("para-hidden");
        paragrafRezultat[1].classList.remove("para-hidden");
        paragrafRezultat[2].classList.add("para-hidden");
      } else {
        ukupnaCenaZaKes = ukupnoZaSve;
        ukupnaCenaKes.textContent = ukupnoZaSve;
        paragrafRezultat[0].classList.add("para-hidden");
        paragrafRezultat[1].classList.add("para-hidden");
        paragrafRezultat[2].classList.remove("para-hidden");
      }
    }
  });
  prikaziSlike();

  rezultatPorudzbine.forEach((rezultat) => {
    if (rezultat.classList.contains("rezultat-hidden")) {
      rezultat.classList.remove("rezultat-hidden");
    }
  });
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
});

// Block submit btn
btnIzracunaj.addEventListener("click", (e) => {
  setTimeout(() => (e.target.disabled = true), 0);
});

btnResetuj.addEventListener("click", () => {
  ukupnaCenaBezPopusta.textContent = "";
  ukupnaCenaPopust.textContent = "";
  ruzaFotoDiv.textContent = "";
  ljiljanFotoDiv.textContent = "";
  gerberFotoDiv.textContent = "";

  plusDodatno.forEach((poklon) => {
    if (!poklon.classList.contains("hidden")) {
      poklon.classList.add("hidden");
    }
  });

  btnIzracunaj.disabled = false;

  rezultatPorudzbine.forEach((rezultat) => {
    if (!rezultat.classList.contains("rezultat-hidden")) {
      rezultat.classList.add("rezultat-hidden");
    }
  });
});
