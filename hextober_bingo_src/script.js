const list = `Song on the radio, at the worst moment
Eat a bug
Ancient book
Got bit and said nothing
More than one goat
A body falls from a height
Enfant Terrible
Trapped in a cabin
Murdered for being too sexy
Murdered for being too horny
The bullets, they do nothing!
Cassandra of the movie
Pick up the phone, no one is there
Creepy doll
Everyone must look away
“Babe, COME ON”
On-the-nose-social commentary delivered out loud
“I’ll check it out real quick”
It’s right behind me isn’t it?
1st act relationship problems
The walls have eyes
We Do Things a Bit Differently Here
Look left, nothing. Look right, scare
Mirror scare
Car wont start
Post-defeat monster corpse lunge
Atrocity Exhibition (Montage)
Plants are horror
The skeptic doth protest too much
Glare To The Back of the Head
Explaining something out of breath
Oh No The House is Gross
Tripped at the worst moment
Wet for some reason
Likes to watch
Ominous Jésu
Shoulda led with that
No phone service/internet
Splits the party
Love triangle with a demon
Climactic building collapse
Sexual match cut
A single bloody hand
Title drop
"I'm sure there's a perfectly rational explanation"
Nosebleed
Monstervision tracking shot
Instrument plays itself
Body in the closet
Only a dream
Local freak explains all
The real horror is marriage
Locked in the basement
Lights Go Out
Diagnosis: Hysteria
Smashes one's head, on purpose
Why Are They Going There, Why Would They Want To Be There
Rotating blades, slowly approaching 
CRT Horror
Thematically relevant education materials
That's not proper knife technique
Clown 🤡
Happy Music While Bad Thing`;

const btn = document.querySelector("button");

if (btn) {
  btn.onclick = function () {
    fillGrid();
  };
}

function fillGrid() {
  let target;
  let arr = list.split("\n");
  for (let i = 0; i < 25; i++) {
    target = document.getElementById("spook" + i);
    target.innerHTML = arr.splice(Math.floor(Math.random() * arr.length), 1);
    resizeToFit.resize();
  }
  document.getElementById("spook12").innerHTML = "FREE SPACE";
  resizeToFit.resize();
}

fillGrid();
