let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
panacek = document.getElementById('panacek');
panacekSirka = panacek.width;
panacekVyska = panacek.height;

let mince, minceX, minceY, minceSirka, minceVyska, minceZvuk;
mince = document.querySelector('#mince');
minceSirka = mince.width;
minceVyska = mince.height;

let score;

let hudba, zvukMince, fanfara;
hudba = document.querySelector('#hudba')
zvukMince = document.querySelector('#zvukmince');
fanfara = document.querySelector('#zvukfanfara');

function priNacteniStranky() {
  panacekX = (window.innerWidth - panacekSirka) * 0.5;
  panacekY = (window.innerHeight - panacekVyska) * 0.5;
  score = 0;

  panacekPoloha();
  novaMince();
}

function panacekPoloha() {
	panacek.style.left = panacekX + 'px';
	panacek.style.top = panacekY + 'px';
}

function novaMince() {
	minceX = Math.random() * (window.innerWidth - minceSirka);
	minceY = Math.random() * (window.innerHeight - minceVyska);
	mince.style.left = minceX + 'px';
	mince.style.top = minceY + 'px';
}

function priStiskuKlavesy(akce) {

  hudba.play();

	// pohyb vlevo
	if (akce.key == 'ArrowLeft') {
		panacekX -= 10;
		if (panacekX < 0) {
			panacekX = 0;
		}
		panacek.src = 'obrazky/panacek-vlevo.png';
	}

	// pohyb vpravo
	if (akce.key == 'ArrowRight') {
		panacekX += 10;
		if (panacekX + panacekSirka > window.innerWidth) {
			panacekX = window.innerWidth - panacekSirka;
		}
		panacek.src = 'obrazky/panacek-vpravo.png';
	}

	// pohyb vzhuru
	if (akce.key == 'ArrowUp') {
		panacekY -= 10;
		if (panacekY < 0) {
			panacekY = 0;
		}
		panacek.src = 'obrazky/panacek-nahoru.png';
	}

	// pohyb dolu
	if (akce.key == 'ArrowDown') {
		panacekY += 10;
		if (panacekY + panacekVyska > window.innerHeight) {
			panacekY = window.innerHeight - panacekVyska;
		}
		panacek.src = 'obrazky/panacek.png';
	}

	panacekPoloha();
  naselMinci();
}

let zvuk = document.getElementsByTagName('audio');
function mute() {
  if (zvuk[0].volume > 0) {
    for (let a = 0; a < zvuk.length; a++) {
      zvuk[a].volume = 0;
    }
  } else {
    for (let a = 0; a < zvuk.length; a++) {
      zvuk[a].volume = 1.0;
    }
  }
}

// toto budeš potřebovat později
function naselMinci() {
  if (!( panacekX + panacekSirka < minceX || 
        minceX + minceSirka < panacekX || 
        panacekY + panacekVyska < minceY || 
        minceY + minceVyska < panacekY)) 
	// panacek a mince se prekryvaji 
    {
      score += 1;
      zvukMince.play()
      document.querySelector('#score').innerHTML = score
      novaMince();
      if (score >= 3) {
        mince.src = 'obrazky/mince-stribrna.png'
      }
      if (score >= 5) {
        mince.src = 'obrazky/mince.png'
      }
      if (score == 5) {
        fanfara.play()
        alert('Blahopreji k vyhre!')
      }
    }
}