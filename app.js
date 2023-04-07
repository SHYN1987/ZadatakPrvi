const fs = require('fs');

function findSentence(brojFile, nizRijeci, nizRecenica) {
  console.log(`Unesite datoteku ${brojFile}:`);
  process.stdin.once('data', (data) => {
    const path = data.toString().trim();
    fs.readFile(path, 'utf8', (err, sadrzaj) => {
      if (err) {
        console.error(err);
        return;
      }
    //   console.log(sadrzaj);
      try {
        if (brojFile === 1) {
          nizRijeci = sadrzaj.toLowerCase();
          
        // Provjera da li text ima minimalno 2 rijeci 
          const numWords = nizRijeci.split(/[.,;:\s\d]+/).map(word => word.toLowerCase());;
          if (numWords < 2) {
            console.error("Prva datoteka mora imati najmanje 2 rijeci.");
            process.exit(1);
          }
        } else if (brojFile === 2) {
        
        // Recenice se razdvajaju nakon sljedecih znakova interpunkcije: . ! i ? 
          nizRecenica = sadrzaj.split(/[.?!]/).map(sentence => sentence.trim());
          const words = nizRijeci.split(/[.,;:\s]+/).map(word => word.toLowerCase());
          const matchingSentences = nizRecenica.filter(sentence => {
            const sentenceWords = sentence.split(/[.,;:\s]+/).map(word => word.toLowerCase());
            return words.every(word => sentenceWords.includes(word));
          });
          console.log(`Recenice koje sadrze sve rijeci iz prve datoteke :`);
          if(matchingSentences.length === 0){
            console.log("Nijedna recenica ne sadrzi iste rijeci kao na spisku");
          } else {
            console.log(matchingSentences);
          }
        }
        if (brojFile < 2) {
            findSentence(brojFile + 1, nizRijeci, nizRecenica);
        } else {
          process.exit();
        }
      } catch (e) {
        console.error(e.message);
        findSentence(brojFile, nizRijeci, nizRecenica);
      }
    });
  });
}

findSentence(1, null, null);
