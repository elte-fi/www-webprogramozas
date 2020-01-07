const puppeteer = require('puppeteer');
const { expect } = require('chai');
const Tester = require('../lib/tester.2.js');
const i18n = require("i18n")

const range = n => Array.from({ length: n }, (e, i) => i + 1);
const random = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
const randomString = (a = 5, b = 10) => Array.from({ length: random(a, b) }, e => String.fromCharCode(random(97, 122))).join('');
// const dashName = name => name.toLowerCase().replace(/ /g, "-")

const ENV = 'development'

const server = (ENV === 'development' 
        ? 'http://webprogramozas.inf.elte.hu/user/gyozke/dinnye/'
        : 'http://webprogramozas.inf.elte.hu/hallgatok/');
const user = process.argv[2].split('=')[1];
const test = process.argv[3].split('=')[1];
const testnumber = process.argv[4].split('=')[1];
const lang = process.argv[5].split('=')[1] || 'hu';

const tests = testnumber !== 'all' ? [parseInt(testnumber)] : range(100);

// i18n
i18n.configure({
  locales:['en', 'hu'],
  directory: __dirname + '/' + test + '.locales',
  defaultLocale: 'hu',
  // watch for changes in json files to reload locale on updates - defaults to false
  autoReload: false, //ENV === 'development',
  // whether to write new locale information to disk - defaults to true
  updateFiles: ENV === 'development',
  // sync locale information across all files - defaults to false
  syncFiles: false, //ENV === 'development',
});
i18n.setLocale(lang)
const { __ } = i18n;

/////////////////////////////////////////////////////////////////////////////////////////
// Fixtures
const trackFixtures = {
  "1": {
      "id": "1",
      "name": "Drum 1",
      "filename": "drum1.wav",
      "balance": -10,
      "volume": 35,
      "filters": [
          "XCompressor"
      ]
  },
  "2": {
      "id": "2",
      "name": "Drum 2",
      "filename": "drum2.wav",
      "balance": 15,
      "volume": 40,
      "filters": [
          "Compressor",
          "FFT"
      ]
  },
  "3": {
      "id": "3",
      "name": "Lead guitar",
      "filename": "lead.wav",
      "balance": -20,
      "volume": 60,
      "filters": [
          "Compressor",
          "Equalizer",
          "Reverb"
      ]
  },
  "4": {
      "id": "4",
      "name": "Acoustic guitar",
      "filename": "acoustic.wav",
      "balance": 20,
      "volume": 30,
      "filters": [
          "Pitch",
          "Reverb"
      ]
  },
  "5": {
      "id": "5",
      "name": "Keyboard",
      "filename": "piano.wav",
      "balance": 3,
      "volume": 75,
      "filters": [
          "FFT"
      ]
  },
}

const filterFixtures = {
  "1": {
      "id": "1",
      "name": "Compressor"
  },
  "2": {
      "id": "2",
      "name": "XCompressor"
  },
  "3": {
      "id": "3",
      "name": "Delay"
  },
  "4": {
      "id": "4",
      "name": "Reverb"
  },
  "5": {
      "id": "5",
      "name": "Equalizer"
  },
  "6": {
      "id": "6",
      "name": "FFT"
  },
  "7": {
      "id": "7",
      "name": "Gate"
  },
  "8": {
      "id": "8",
      "name": "Pitch"
  },
  "9": {
      "id": "9",
      "name": "Tune"
  },
  "10": {
      "id": "10",
      "name": "Low-frequency oscillator"
  }
}

/////////////////////////////////////////////////////////////////////////////////////////

describe(__('Webprogramozás zh: Mixer'), function () {
  let browser, page, tester;

  const url = (ENV === 'development' 
                ? server 
                : server + user + '/' + test + '/');

  this.timeout(5000);

  function runner(fn) {
    return async function () {
      await fn();
      await tester.run();
    }
  }

  before(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    tester = new Tester(page, expect);

    page.setDefaultNavigationTimeout(5000);
  });

  after(async () => {
    await browser.close();
    console.log(__(`########## Pontszám összesen: %s pont ##########`, tester.points));
  });

  beforeEach(() => {
    tester.start();
  });

  (tests.includes(1) ? describe : describe.skip)(__('1. feladat: A státuszsorban lévő hangerőkijelző elemeinek száma'), () => {

    it(__('Paraméter nélkül 100 vonal jelenik meg (2 pt)'), runner(() => {
      tester.visit(url + '__index.php')
      tester.$$('#status span').eval(spans => spans.length).should('equal', 100)
      tester.$$('#status span').eval(spans => spans.every(s => s.innerText.trim() === '|')).should('equal', true)
      tester.point(2);
    }));

    it(__('?bars= (2 pt)'), runner(() => {
      tester.visit(url + '__index.php?bars=')
      tester.$$('#status span').eval(spans => spans.length).should('equal', 100)
      tester.point(2);
    }));

    it(__('?bars=q (2 pt)'), runner(() => {
      tester.visit(url + '__index.php?bars=q')
      tester.$$('#status span').eval(spans => spans.length).should('equal', 100)
      tester.point(2);
    }));

    it(__('?bars=-10 (2 pt)'), runner(() => {
      tester.visit(url + '__index.php?bars=-10')
      tester.$$('#status span').eval(spans => spans.length).should('equal', 100)
      tester.point(2);
    }));

    it(__('?bars=200 (2 pt)'), runner(() => {
      const bars = random(150, 200)
      tester.visit(url + '__index.php?bars=' + bars)
      tester.$$('#status span').eval(spans => spans.length).should('equal', bars)
      tester.point(2);
    }));

  });

  (tests.includes(2) ? describe : describe.skip)(__('2. feladat: Track-ek listázása'), () => {

    before(async function () {
      tester.visit(url + '__index.php')
      await tester.run()
    });

    it(__('Track felépítése a megfelelő (1 pt)'), runner(() => {
      tester.$(`#tracks .track`);
      tester.$(`#tracks .track > header`);
      tester.$(`#tracks .track > header > a`);
      tester.$(`#tracks .track > header + span`);
      tester.$(`#tracks .track > header + span + input[type=range][min="0"][max="100"][step="5"]`);
      tester.$(`#tracks .track > header + span + input[type=range] + input[type=checkbox]`);
      tester.point(1);
    }));

    it(__('Track id-ja data attribútumban megjelenik (2 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`#tracks .track[data-id="${e.id}"]`);
      });
      tester.point(2);
    }));

    it(__('Track neve helyesen megjelenik (1 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`#tracks .track[data-id="${e.id}"] header`).prop('innerHTML').should('contain', e.name)
      });
      tester.point(1);
    }));

    it(__('Track hangereje helyesen beállításra került a range sliderben (2 pt)'), runner(() => {
      Object.values(trackFixtures).slice(0, 3).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`#tracks .track[data-id="${e.id}"] [type=range]`).prop('value').should('equal', e.volume.toString())
      });
      tester.point(2);
    }));

    it(__('Track nevének linkje megfelelő URL-re mutat (2 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`#tracks .track[data-id="${e.id}"] header a`).prop('href').should('contain', `id=${e.id}`)
      });
      tester.point(2);
    }));

    it(__('A státuszsorban megjelenik a trackek száma (2 pt)'), runner(() => {
      let n
      tester.$$('#tracks .track').should(tracks => n = tracks.length)
      tester.$(`#status`).prop('innerText').should('match', () => new RegExp(`Number of tracks:\\s*${n}`))
      tester.point(2);
    }));

  });

  (tests.includes(3) ? describe : describe.skip)(__('3. feladat: Track részleteinek megtekintése'), () => {

    it(__('Paraméter nélkül nem jelenik meg a részletek panel (4 pt)'), runner(() => {
      tester.visit(url + '__index.php')
      tester.element(`#details`).should('equal', null);
      tester.point(4);
    }));

    it(__('?id=1 --> részletek panel, helyes adatokkal (16 pt)'), runner(() => {
      const id = random(1, 5)
      tester.visit(url + '__index.php?id=' + id)

      tester.info(__('Alapadatok: name, filename, balance, volume'))
      tester.$(`#details`)
      tester.$(`#details dl`)
      tester.$(`#details dl > dd:nth-of-type(1)`).prop('innerText').should('equal', trackFixtures[id].name)
      tester.$(`#details dl > dd:nth-of-type(2)`).prop('innerText').should('equal', trackFixtures[id].filename)
      tester.$(`#details dl > dd:nth-of-type(3)`).prop('innerText').should('equal', trackFixtures[id].balance.toString())
      if (id < 4) {
        tester.$(`#details dl > dd:nth-of-type(4)`).prop('innerText').should('equal', trackFixtures[id].volume.toString())
      }
      tester.point(10);

      tester.info(__('Szűrők ellenőrzése'))
      tester.$$('#details .filters span')
        .eval(spans => JSON.stringify(Array.from(spans).map(s => s.innerText.trim())))
        .should('equal', JSON.stringify(trackFixtures[id].filters))
      tester.point(6);
    }));

  });

  (tests.includes(4) ? describe : describe.skip)(__('4. feladat: Új track hozzáadása'), () => {

    const errors = [
      "The track name is required",                 // 0                            
      "The track name is too long",                 // 1       
      "The audio filename is required",             // 2           
      "The audio filename has a wrong format",      // 3                  
      "The balance is required",                    // 4   
      "The balance has to be an integer",           // 5             
      "The balance has to be between -100 and 100", // 6                       
      "The volume is required",                     // 7   
      "The volume has to be an integer",            // 8            
      "The volume has to be between 0 and 100",     // 9                   
      "The volume has to be a multiple of 5",       // 10                 
    ]

    beforeEach(async function () {
      tester.visit(url + '__new.php')
    });

    it(__('Az űrlap elemei megvannak (1 pt)'), runner(() => {
      tester.$('form input[name=name]');
      tester.$('form input[name=filename]');
      tester.$('form input[name=balance]');
      tester.$('form input[name=volume]');
      tester.$('form textarea[name=filters]');
      tester.$('form [type=submit]');
      tester.point(1);
    }));

    it(__('Betöltéskor nincs hibaüzenet (1 pt)'), runner(() => {
      tester.element("div.errors").should('equal', null);
      tester.point(1);
    }));

    context(__('name mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=name]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[0])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[0])

        tester.point(1);
      }));

      it(__('Túl hosszú szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('maxLength', '100')
        tester.$('form [name=name]').set('value', '123456789012345678901')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[1])

        tester.point(2);
      }));
    })

    context(__('filename mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=filename]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[2])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=filename]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[2])

        tester.point(1);
      }));

      ['aaaaaa', '#apple', 'a@a.hu'].forEach(val => 
        it(__(`Rossz formátummal feltöltve: %s (2 pt)`, val), runner(() => {
          tester.$('form').set('noValidate', true)
          tester.$('form [name=filename]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('new.php'),
            __('Új track hozzáadása oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('div.errors').prop('innerHTML').should('contain', errors[3])

          tester.point(2);
        }))
      )
    })

    context(__('balance mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=balance]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[4])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[4])

        tester.point(1);
      }));

      it(__('Szöveggel feltöltve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', 'q')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[5])

        tester.point(2);
      }));

      ['-101', '101'].forEach(val => 
        it(__(`Rossz értékkel feltöltve: %s (2 pt)`, val), runner(() => {
          tester.$('form').set('noValidate', true)
          tester.$('form [name=balance]').set('type', 'text')
          tester.$('form [name=balance]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('new.php'),
            __('Új track hozzáadása oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('div.errors').prop('innerHTML').should('contain', errors[6])

          tester.point(2);
        }))
      )
    })

    context(__('volume mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form').eval(form => form.querySelector('[name=volume]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[7])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[7])

        tester.point(1);
      }));

      it(__('Szöveggel feltöltve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', 'q')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[8])

        tester.point(2);
      }));

      ['-1', '101'].forEach(val => 
        it(__(`Rossz értékkel feltöltve: %s (1 pt)`, val), runner(() => {
          tester.$('form').set('noValidate', true)
          tester.$('form [name=volume]').set('type', 'text')
          tester.$('form [name=volume]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('new.php'),
            __('Új track hozzáadása oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('div.errors').prop('innerHTML').should('contain', errors[9])

          tester.point(1);
        }))
      );

      ['1', '99'].forEach(val => 
        it(__(`Rossz értékkel feltöltve: %s (1 pt)`, val), runner(() => {
          tester.$('form').set('noValidate', true)
          tester.$('form [name=volume]').set('type', 'text')
          tester.$('form [name=volume]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('new.php'),
            __('Új track hozzáadása oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('div.errors').prop('innerHTML').should('contain', errors[10])

          tester.point(1);
        }))
      )
    })

    context(__('Minden mező együttes vizsgálata'), () => {
      it(__('Mindegyik üres (5 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '')
        tester.$('form [name=filename]').set('value', '')
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', '')
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[0])
          .should('contain', errors[2])
          .should('contain', errors[4])
          .should('contain', errors[7])
          .should(html => {
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[8])
            expect(html).to.not.contain(errors[9])
            expect(html).to.not.contain(errors[10])
          })

        tester.point(5);
      }));

      it(__('Túl hosszú track name (5 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '1234567890123456789011')
        tester.$('form [name=filename]').set('value', 'q.q')
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', '0')
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', '0')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[1])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
            expect(html).to.not.contain(errors[8])
            expect(html).to.not.contain(errors[9])
            expect(html).to.not.contain(errors[10])
          })

        tester.point(5);
      }));

      it(__('Rossz volume (5 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '123')
        tester.$('form [name=filename]').set('value', 'q.q')
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', '0')
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', '13')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[10])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
            expect(html).to.not.contain(errors[8])
            expect(html).to.not.contain(errors[9])
          })

        tester.point(5);
      }));

      it(__('Rossz formátumú filename, szöveges balance (5 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '123')
        tester.$('form [name=filename]').set('value', 'q.@')
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', 'q')
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', '15')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[3])
          .should('contain', errors[5])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
            expect(html).to.not.contain(errors[8])
            expect(html).to.not.contain(errors[9])
            expect(html).to.not.contain(errors[10])
          })

        tester.point(5);
      }));

      it(__('Az űrlap állapottartó (10 pt)'), runner(() => {
        const name = ''
        const filename = `${randomString()}.${randomString(3, 3)}`
        const balance = random(-100, 100).toString()
        const volume = random(0, 100).toString()
        const filters = range(random(1, 5)).map(() => randomString()).join('\n')

        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', name)
        tester.$('form [name=filename]').set('value', filename)
        tester.$('form [name=balance]').set('type', 'text')
        tester.$('form [name=balance]').set('value', balance)
        tester.$('form [name=volume]').set('type', 'text')
        tester.$('form [name=volume]').set('value', volume)
        tester.$('form [name=filters]').set('value', filters)

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Input mezők értékeinek ellenőrzése'));
        tester.$('form [name=name]').prop('value').should('equal', name)
        tester.$('form [name=filename]').prop('value').should('equal', filename)
        tester.$('form [name=balance]').prop('value').should('equal', balance)
        tester.$('form [name=volume]').prop('value').should('equal', volume)
        tester.$('form [name=filters]').prop('value').should('equal', filters)

        tester.point(10);
      }));

    })

    it(__('Helyes kitöltés (20 pt)'), runner(() => {
      const name = randomString()
      const filename = `${randomString()}.${randomString(3, 3)}`
      const balance = random(-100, 100).toString()
      const volume = (random(0, 20)*5).toString()
      const filters = range(random(1, 5)).map(() => randomString()).join('\n')

      tester.$('form').set('noValidate', true)
      tester.$('form [name=name]').set('value', name)
      tester.$('form [name=filename]').set('value', filename)
      tester.$('form [name=balance]').set('type', 'text')
      tester.$('form [name=balance]').set('value', balance)
      tester.$('form [name=volume]').set('type', 'text')
      tester.$('form [name=volume]').set('value', volume)
      tester.$('form [name=filters]').set('value', filters)

      tester.info(__('Kattintás a submit gombra'));
      tester.$('form [type=submit]').clickWithNavigation().should(() => 
      expect(page.url()).to.contain('index.php'),
        __('Főoldal jelenik meg')
      )
      
      tester.info(__('Adatok ellenőrzése a track listában'));
      tester.$$('#tracks .track')
        .eval((lis, name, volume) => 
          lis.some(li => li.innerHTML.includes(name) && 
                         li.querySelector('[type=range]').value === volume
          ),
          name, volume
        )
        .should('equal', true)
      tester.point(5);

      tester.info(__('A főoldal újbóli betöltése'));
      tester.visit(url + '__index.php')

      tester.info(__('A módosítások így is megjelennek a küldetések táblázatban'));
      tester.$$('#tracks .track')
        .eval((lis, name, volume) => 
          lis.some(li => li.innerHTML.includes(name) && 
                         li.querySelector('[type=range]').value === volume
          ),
          name, volume
        )
        .should('equal', true)

      tester.point(15);
    }));

  });

  (tests.includes(5) ? describe : describe.skip)(__('5. feladat: Szűrők megadása'), () => {

    beforeEach(async function () {
      tester.visit(url + '__new.php')
    });

    it(__('A select elemek és a gombok megvannak (1 pt)'), runner(() => {
      tester.$('select#all')
      tester.$('select#selected')
      tester.$('button#select')
      tester.$('button#deselect')
      tester.$('button#moveup')
      tester.$('button#movedown')
      tester.$('textarea[name=filters')
      tester.point(1);
    }));

    it(__('A select elemben mindegyik szűrő megjelenik (10 pt)'), runner(() => {
      tester.$('select#all').eval(select => Array.from(select.options).map(o => o.text.trim()).sort().join(',')).should(str => 
        expect(str).to.equal(Object.values(filterFixtures).map(i => i.name.trim()).sort().join(','))
      )
      tester.point(10);
    }));

    it(__('Egy szűrő kiválasztása (#select gomb működése)  (6 pt)'), runner(() => {
      const filter = randomString()
      tester.$('select#all').eval((select, filter) => select.add(new Option(filter, filter, true, true)), filter)
      tester.$('button#select').click()
      tester.$('select#all').eval((select, filter) => Array.from(select.options).map(o => o.text).includes(filter), filter).should('equal', false)
      tester.$('select#selected').eval((select, filter) => Array.from(select.options).map(o => o.text).includes(filter), filter).should('equal', true)
      tester.point(6);
    }));

    it(__('Egy szűrő visszarakása (#deselect gomb működése) (6 pt)'), runner(() => {
      const filter = randomString()
      tester.$('select#selected').eval((select, filter) => select.add(new Option(filter, filter, true, true)), filter)
      tester.$('button#deselect').click()
      tester.$('select#selected').eval((select, filter) => Array.from(select.options).map(o => o.text).includes(filter), filter).should('equal', false)
      tester.$('select#all').eval((select, filter) => Array.from(select.options).map(o => o.text).includes(filter), filter).should('equal', true)
      tester.point(6);
    }));

    it(__('Kiválasztott szűrő lefele mozgatása (#movedown gomb működése) (6 pt)'), runner(() => {
      const filters = range(5).map(() => randomString())
      const i = random(0, 3)
      const expectedNewFilters = [...filters];
      [expectedNewFilters[i], expectedNewFilters[i+1]] = [expectedNewFilters[i+1], expectedNewFilters[i]]

      tester.$('select#selected').set('innerHTML', '')
      tester.$('select#selected').eval((select, filters, i) => filters.forEach((filter, ii) => select.add(new Option(filter, filter, i===ii, i===ii))), filters, i)
      tester.$('button#movedown').click()
      tester.$('select#selected').eval(select => Array.from(select.options).map(o => o.text)).should('eql', expectedNewFilters)
      tester.point(6);
    }));

    it(__('Kiválasztott szűrő felfele mozgatása (#moveup gomb működése) (6 pt)'), runner(() => {
      const filters = range(5).map(() => randomString())
      const i = random(1, 4)
      const expectedNewFilters = [...filters];
      [expectedNewFilters[i], expectedNewFilters[i-1]] = [expectedNewFilters[i-1], expectedNewFilters[i]]

      tester.$('select#selected').set('innerHTML', '')
      tester.$('select#selected').eval((select, filters, i) => filters.forEach((filter, ii) => select.add(new Option(filter, filter, i===ii, i===ii))), filters, i)
      tester.$('button#moveup').click()
      tester.$('select#selected').eval(select => Array.from(select.options).map(o => o.text)).should('eql', expectedNewFilters)
      tester.point(6);
    }));

    it(__('A kiválasztott elemek megjelennek a textareaban (10 pt)'), runner(() => {
      const filters = range(10).map(() => randomString())

      tester.$('select#all').set('innerHTML', '')
      tester.$('select#all').eval((select, filters) => filters.forEach(filter => select.add(new Option(filter, filter, false, false))), filters)
      for (let i=0; i<6; i++) {
        tester.$('select#all').set('selectedIndex', random(0, 9-i))
        tester.$('button#select').click()
      }
      for (let i=0; i<2; i++) {
        tester.$('select#selected').set('selectedIndex', random(0, 5-i))
        tester.$('button#deselect').click()
      }
      tester.$('select#selected').set('selectedIndex', 3)
      tester.$('button#moveup').click()
      tester.$('select#selected').set('selectedIndex', 1)
      tester.$('button#movedown').click()
      tester.$('button#movedown').click()

      tester.$('select#selected').eval(select => select.options.length).should('above', 0)
      tester.$('select#selected').eval(select => Array.from(select.options).map(o => o.text)).should(options => {
        options.forEach(o => expect(o.trim()).oneOf(filters))
      })
      tester.$('select#selected')
        .eval(select => Array.from(select.options).map(o => o.text).join('\n') === document.querySelector('textarea').value)
        .should('equal', true)
      tester.point(10);
    }));

  });

  (tests.includes(6) ? describe : describe.skip)(__('6. feladat: Trackek hangerő slider értékeinek és színének megjelenítése'), () => {

    before(async function () {
      tester.visit(url + '__index.php')
      await tester.run()
    });

    it(__('A trackek range értékei kiíródnak a range fölötti elembe az oldal betöltése után (5 pt)'), runner(() => {
      tester.$$('#tracks .track')
        .eval(tracks => tracks.every(track => 
          track.querySelector('input[type=range]').value === track.querySelector('span').innerText
        ))
        .should('equal', true)
      tester.point(5)
    }));

    it(__('A trackek range értékeinek megfelelő színű lesz a range fölötti elem háttérszíne az oldal betöltése után (5 pt)'), runner(() => {
      tester.$$('#tracks .track')
        .eval(tracks => {
          return Array.from(tracks).every(track => {
            const vol = parseInt(track.querySelector('input[type=range]').value)
            track.querySelector('[type=range]').style.backgroundColor = `hsl(${100-vol},${vol}%,50%)`
            return track.querySelector('span').style.backgroundColor === track.querySelector('[type=range]').style.backgroundColor
          })
        })
        .should('equal', true)
      tester.point(5)
    }));

    it(__('Egy track range értékét változtatva az megjelenik a range fölötti elemben és háttérszínében (5 pt)'), runner(() => {
      const tr = random(1, 5)
      const volume = (random(0, 20) * 5).toString()

      tester.$(`#tracks .track[data-id="${tr}"] input[type=range]`)
        .set('value', volume)
        .dispatch('input', {bubbles: true})
      
      tester.$(`#tracks .track[data-id="${tr}"]`)
        .eval(track => track.querySelector('input[type=range]').value === track.querySelector('span').innerText)
        .should('equal', true)
      tester.$(`#tracks .track[data-id="${tr}"]`)
        .eval(track => {
          const vol = parseInt(track.querySelector('input[type=range]').value)
          track.querySelector('[type=range]').style.backgroundColor = `hsl(${100-vol},${vol}%,50%)`
          return track.querySelector('span').style.backgroundColor === track.querySelector('[type=range]').style.backgroundColor
        })
        .should('equal', true)
      
      tester.point(5)
    }));

  });

  (tests.includes(7) ? describe : describe.skip)(__('7. feladat: Hangerőkezelés billentyűkkel'), () => {

    beforeEach(async function () {
      tester.visit(url + '__index.php')
    });

    context(__('Bal-jobb billentyűk'), () => {

      it(__('Oldal betöltésekor egyik track sincs kiválasztva (1 pt)'), runner(() => {
        tester.element(`#tracks .track.active`).should('equal', null)
        tester.point(1);
      }));

      it(__('Oldal betöltése után jobb billentyű megnyomására az első track kerül kiválasztásra (3 pt)'), runner(() => {
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.$(`#tracks .track:first-child.active`)
        tester.$$('#tracks .track.active').eval(lis => lis.length).should('equal', 1)
        tester.point(3);
      }));
  
      it(__('Oldal betöltése után a bal billentyű megnyomására az utolsó track kerül kiválasztásra (3 pt)'), runner(() => {
        tester.runFunction(() => page.keyboard.press('ArrowLeft'));
        tester.$(`#tracks .track:last-child.active`)
        tester.$$('#tracks .track.active').eval(lis => lis.length).should('equal', 1)
        tester.point(3);
      }));
  
      it(__('Jobb-bal billentyűket nyomogatva a megfelelő trackek kerülnek kiválasztásra (3 pt)'), runner(() => {
        let i = 0;
        ['ArrowRight', 'ArrowRight', 'ArrowRight', random(0, 1) ? 'ArrowRight' : 'ArrowLeft', random(0, 1) ? 'ArrowRight' : 'ArrowLeft'].forEach(key => {
          tester.info(__(`%s megnyomása`, key))
          tester.runFunction(() => page.keyboard.press(key));
          i += (key === 'ArrowRight' ? 1 : -1)
          tester.$(`#tracks .track:nth-child(${i}).active`)
          tester.$$('#tracks .track.active').eval(lis => lis.length).should('equal', 1)
        })
        tester.point(3);
      }));
  
      it(__('Elsőről föllépve az utolsóra kerülünk (3 pt)'), runner(() => {
        tester.info(__(`Elsőre lépés a jobb gombbal`))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.info(__(`Bal gomb megnyomása`))
        tester.runFunction(() => page.keyboard.press('ArrowLeft'));
        tester.$(`#tracks .track:last-child.active`)
        tester.$$('#tracks .track.active').eval(lis => lis.length).should('equal', 1)
        tester.point(3);
      }));
  
      it(__('Utolsóról lelépve az elsőre kerülünk (3 pt)'), runner(() => {
        tester.info(__(`Utolsóra lépés a bal gombbal`))
        tester.runFunction(() => page.keyboard.press('ArrowLeft'));
        tester.info(__(`Jobb gomb megnyomása`))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.$(`#tracks .track:first-child.active`)
        tester.$$('#tracks .track.active').eval(lis => lis.length).should('equal', 1)
        tester.point(3);
      }));
      
    })

    context(__('Szóköz billentyű'), () => {

      it(__('Oldal betöltésekor egyik track sincs megjelölve (1 pt)'), runner(() => {
        tester.element(`#tracks .track.selected`).should('equal', null)
        tester.point(1);
      }));

      it(__('Egy aktivált tracknél szóközt nyomva a checkbox bejelölt lesz (3 pt)'), runner(() => {
        tester.info(__('4. track kijölése 4 jobbra művelettel'))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));

        tester.info(__('Szóköz megnyomása'))
        tester.runFunction(() => page.keyboard.press(' '));
        
        tester.$(`#tracks .track.active [type=checkbox]:checked`)
        tester.$$('#tracks .track.active [type=checkbox]:checked').eval(lis => lis.length).should('equal', 1)
        tester.point(3);
      }));

      it(__('Egy aktivált tracknél szóközt nyomva a track megjelölt lesz (2 pt)'), runner(() => {
        tester.info(__('4. track kijölése 4 jobbra művelettel'))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));

        tester.info(__('Szóköz megnyomása'))
        tester.runFunction(() => page.keyboard.press(' '));
        
        tester.$(`#tracks .track.active.selected`)
        tester.$$('#tracks .track.active.selected').eval(lis => lis.length).should('equal', 1)
        tester.point(2);
      }));

      it(__('Több is kijelölhető (3 pt)'), runner(() => {
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));

        tester.$(`#tracks .track[data-id="2"].selected`)
        tester.$(`#tracks .track[data-id="2"] [type=checkbox]:checked`)
        tester.$(`#tracks .track[data-id="4"].active.selected`)
        tester.$(`#tracks .track[data-id="4"] [type=checkbox]:checked`)
        tester.$$('#tracks .track.selected').eval(lis => lis.length).should('equal', 2)
        tester.$$('#tracks .track [type=checkbox]:checked').eval(lis => lis.length).should('equal', 2)
        tester.point(3);
      }));
  
    })

    context(__('s és d billentyű'), () => {

      it(__('Oldal betöltésekor egyik checkbox sincs bejelölve (1 pt)'), runner(() => {
        tester.element(`#tracks .track [type=checkbox]:checked`).should('equal', null)
        tester.point(1);
      }));

      it(__('s gomb bejelöli az összes tracket (2 pt)'), runner(() => {
        tester.runFunction(() => page.keyboard.press('s'));
        tester.$$('#tracks .track').eval(tracks => Array.from(tracks).every(track => track.classList.contains('selected') && track.querySelector('[type=checkbox]').checked)).should('equal', true)
        tester.point(2);
      }));

      it(__('d gombra egyik track sem lesz kijelölve (2 pt)'), runner(() => {
        tester.$$('#tracks .track [type=checkbox]').eval(chks => Array.from(chks).forEach(chk => chk.checked = true))
        tester.runFunction(() => page.keyboard.press('d'));
        tester.$$('#tracks .track').eval(tracks => Array.from(tracks).every(track => !track.classList.contains('selected') && !track.querySelector('[type=checkbox]').checked)).should('equal', true)
        tester.point(2);
      }));
  
    })

    context(__('Föl-le billentyűk'), () => {

      it(__('Egy megjelölt tracknél a föl billentyűt megnyomva a hangerő 5 értékkel magasabb lesz (2 pt)'), runner(() => {
        const volume = random(0, 19) * 5
        tester.$(`#tracks .track[data-id="4"] [type=range]`).set('value', volume)

        tester.info(__('4. track kijölése 4 jobbra művelettel'))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));

        tester.info(__('Szóköz megnyomása'))
        tester.runFunction(() => page.keyboard.press(' '));
        
        tester.info(__('Felfele megnyomása'))
        tester.runFunction(() => page.keyboard.press('ArrowUp'));
        
        tester.$(`#tracks .track[data-id="4"] [type=range]`).prop('value').should('equal', (volume + 5).toString())        
        tester.point(2);
      }));

      it(__('Egy megjelölt tracknél a le billentyűt megnyomva a hangerő 5 értékkel csökken (2 pt)'), runner(() => {
        const volume = random(1, 20) * 5
        tester.$(`#tracks .track[data-id="4"] [type=range]`).set('value', volume)

        tester.info(__('4. track kijölése 4 jobbra művelettel'))
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));

        tester.info(__('Szóköz megnyomása'))
        tester.runFunction(() => page.keyboard.press(' '));
        
        tester.info(__('Lefele megnyomása'))
        tester.runFunction(() => page.keyboard.press('ArrowDown'));
        
        tester.$(`#tracks .track[data-id="4"] [type=range]`).prop('value').should('equal', (volume - 5).toString())        
        tester.point(2);
      }));

      it(__('Több megjelölt tracknél a föl billentyűt megnyomva a hangerők 5 értékkel magasabbak lesznek (3 pt)'), runner(() => {
        const volume1 = random(0, 19) * 5
        const volume2 = random(0, 19) * 5
        const volume3 = random(0, 19) * 5
        tester.$(`#tracks .track[data-id="1"] [type=range]`).set('value', volume1)
        tester.$(`#tracks .track[data-id="2"] [type=range]`).set('value', volume2)
        tester.$(`#tracks .track[data-id="4"] [type=range]`).set('value', volume3)

        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));

        tester.info(__('Felfele megnyomása'))
        tester.runFunction(() => page.keyboard.press('ArrowUp'));
        
        tester.$(`#tracks .track[data-id="1"] [type=range]`).prop('value').should('equal', (volume1 + 5).toString())
        tester.$(`#tracks .track[data-id="2"] [type=range]`).prop('value').should('equal', (volume2 + 5).toString())
        tester.$(`#tracks .track[data-id="4"] [type=range]`).prop('value').should('equal', (volume3 + 5).toString())
        tester.point(3);
      }));

      it(__('Több megjelölt tracknél a le billentyűt megnyomva a hangerők 5 értékkel kisebbek lesznek (3 pt)'), runner(() => {
        const volume1 = random(1, 20) * 5
        const volume2 = random(1, 20) * 5
        const volume3 = random(1, 20) * 5
        tester.$(`#tracks .track[data-id="1"] [type=range]`).set('value', volume1)
        tester.$(`#tracks .track[data-id="2"] [type=range]`).set('value', volume2)
        tester.$(`#tracks .track[data-id="4"] [type=range]`).set('value', volume3)

        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press('ArrowRight'));
        tester.runFunction(() => page.keyboard.press(' '));

        tester.info(__('Lefele megnyomása'))
        tester.runFunction(() => page.keyboard.press('ArrowDown'));
        
        tester.$(`#tracks .track[data-id="1"] [type=range]`).prop('value').should('equal', (volume1 - 5).toString())
        tester.$(`#tracks .track[data-id="2"] [type=range]`).prop('value').should('equal', (volume2 - 5).toString())
        tester.$(`#tracks .track[data-id="4"] [type=range]`).prop('value').should('equal', (volume3 - 5).toString())
        tester.point(3);
      }));
  
    })
    
  });

  (tests.includes(8) ? describe : describe.skip)(__('8. feladat: Hangerők AJAX mentése'), () => {

    beforeEach(async function () {
      tester.visit(url + '__index.php')
    });

    it(__('Hangerőket átállítva (bármilyen módon) és a Save gombra kattintva, a hangerőket elmentjük (40 pt)'), runner(() => {
      const volume1 = (random(0, 20) * 5).toString()
      const volume2 = (random(0, 20) * 5).toString()

      tester.info(__(`Trackek értékeinek beállítása`))
      tester.$(`#tracks .track[data-id="4"] input[type=range]`)
        .set('value', volume1)
        .dispatch('input', {bubbles: true})
      tester.$(`#tracks .track[data-id="5"] input[type=range]`)
        .set('value', volume2)
        .dispatch('input', {bubbles: true})
      
      tester.info(__(`Gomb megnyomása`))
      tester.$('nav button').click()

      tester.waitForResponse()
      tester.isAjax()
      tester.point(10);
      
      console.log('\t\tPOST kérés volt?');
      tester.runFunction(() => expect(tester.globalResponse.request().method()).to.equal('POST'));
      tester.point(10);
      
      tester.info(__("Gomb megváltozik"))
      tester.$(`nav button`).prop('innerText').should('contain', "✔")
      tester.point(2);
      
      tester.info(__("Oldalt újratöltve a mentett adat van a trackeknél"))
      tester.visit(url + '__index.php')
      tester.$(`#tracks .track[data-id="4"] input[type=range]`).prop('value').should('equal', volume1)
      tester.$(`#tracks .track[data-id="5"] input[type=range]`).prop('value').should('equal', volume2)

      tester.point(18);
    }));

  });

})