const Combat = require('./src/combat.js');
const Attack = require('./src/attack');
const Party = require('./src/party.js');
const Combatant = require('./src/combatant.js');
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("dex.json");
const db = low(adapter);
const fs = require('fs');

const jimp = require('jimp')
var random = function (start,end){
    return Math.floor(Math.random()*(end-start+1)+start);
}

let idinput = random(1,31)
let opinput = random(1,31)
//let idinput = `20`
//let opinput =  `23`
	   let namekl = db
      .get("server")
      .find({ numero: `${idinput}` })
      .value().name;
      
       let nameop = db
      .get("server")
      .find({ numero: `${opinput}` })
      .value().name;
  
      let realop = nameop.toLowerCase()
let realname = namekl.toLowerCase()


let imgkl = db
      .get("server")
      .find({ numero: `${idinput}`  })
      .value().img;
      let imgop = db
      .get("server")
      .find({ numero: `${opinput}`  })
      .value().img;
               async function main(){

let fonte = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)
  let avatar = await  jimp.read(`${imgkl}`)
	   let oponent = await  jimp.read(`${imgop}`)
               jimp.read('https://image.freepik.com/vetores-gratis/fundo-comic-versus-template_6735-40.jpg').then(fundo => {
 
	avatar.resize(200,200)
      oponent.resize(200,200)
  
	  fundo.composite(avatar,420 , 85).composite(oponent,7 ,85).write('resultado.png')

})
}
main()

let c = new Combat();
let ogre = new Combatant(`${namekl}`, 59, 16, 0, 6, 10, 2, 4);
let owlbear = new Combatant(`${nameop}`, 59, 16, 0, 6, 10, 2, 4);

let p1 = new Party();
p1.addMember(ogre);

let p2 = new Party();
p2.addMember(owlbear);

c.addParty(p1, `${namekl}`);
c.addParty(p2, `${nameop}`);

let winners = [];

for (let i = 0; i < 3; i++){
  winners.push(c.runFight(console.log));
  
  c.reset();
}

let parties = {};
for (let party_id in c.parties){
  parties[party_id] = 0;
}

let count = 1;
winners.forEach(function(winner_party){
  count++;
  parties[winner_party[0].party_id] += 1;
});

console.log('\nPorcentagem de Vitorias:');
for (let p in parties){
  console.log(p + ': ' + parties[p]*10+ '%');
}
