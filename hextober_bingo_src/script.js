const rawList = `Song on the radio, at the worst moment
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
Happy Music While Bad Thing
Alerted by the dog
Storm's a-brewin'
Gonna give you $100 to fuck off
Scary Door
Waylaid by bad weather
Taxidermy
That's not supposed to bend that way`;

const btn = document.querySelector("button");
const list = document.getElementById("bingoList");

const formattedList = rawList.split("\n")

if (btn) {
  btn.onclick = function () {
    fillGrid();
  };
}

if (list) {
	formattedList.forEach((e) => {
		const item = document.createElement('li');
		item.textContent = e;
		list.appendChild(item);
	});
}

const date = new Date();
if (date.getMonth() === 9 && date.getDate() === 20) {
	const bdayField = document.getElementById("bdayField");
	if (bdayField) {
		bdayField.textContent = "It's Alex's birthday :)";
	}
}

function isOctober20th(date = new Date()) {
  // getMonth() returns 0 for January, 9 for October
  return date.getMonth() === 9 && date.getDate() === 20;
}


function fillGrid() {
  let target;
  for (let i = 0; i < 25; i++) {
    target = document.getElementById("spook" + i);
    target.innerHTML = formattedList.splice(Math.floor(Math.random() * formattedList.length), 1);
    resizeToFit.resize();
  }
  document.getElementById("spook12").innerHTML = "FREE SPACE";
  resizeToFit.resize();
}

fillGrid();
