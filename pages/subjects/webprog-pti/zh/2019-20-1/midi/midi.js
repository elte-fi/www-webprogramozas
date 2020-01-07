const puppeteer = require('puppeteer');
const { expect } = require('chai');
const Tester = require('../lib/tester.2.js');
const i18n = require("i18n")

const range = n => Array.from({ length: n }, (e, i) => i + 1);
const random = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
const randomString = (a = 5, b = 10) => Array.from({ length: random(a, b) }, e => String.fromCharCode(random(97, 122))).join('');
// const dashName = name => name.toLowerCase().replace(/ /g, "-")
function hexToRGB(h) {
  let r = 0, g = 0, b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

  // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  
  return "rgb("+ +r + ", " + +g + ", " + +b + ")";
}

const ENV = 'production'

const server = (ENV === 'development' 
        ? 'http://webprogramozas.inf.elte.hu/user/gyozke/citrom/'
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
      "name": "Hi hat 1",
      "category": "Drum",
      "instrument": "114",
      "color": "#800080",
      "notes": [
          {
              "note": "C",
              "start": 100,
              "end": 600
          }
      ]
  },
  "2": {
      "id": "2",
      "name": "Base bass",
      "category": "Bass",
      "instrument": "45",
      "color": "#808000",
      "notes": [
          {
              "note": "D",
              "start": 0,
              "end": 500
          },
          {
              "note": "A",
              "start": 1000,
              "end": 2000
          },
          {
              "note": "B",
              "start": 2000,
              "end": 2500
          },
          {
              "note": "C+",
              "start": 2500,
              "end": 3000
          }
      ]
  },
  "3": {
      "id": "3",
      "name": "Main melody",
      "category": "Melody",
      "instrument": "4",
      "color": "#008000",
      "notes": [
          {
              "note": "C",
              "start": 0,
              "end": 100
          },
          {
              "note": "D",
              "start": 100,
              "end": 200
          },
          {
              "note": "E",
              "start": 300,
              "end": 400
          }
      ]
  },
  "4": {
      "id": "4",
      "name": "Beat",
      "category": "Drum",
      "instrument": "114",
      "color": "#008080",
      "notes": [
          {
              "note": "C",
              "start": 1000,
              "end": 1500
          },
          {
              "note": "E",
              "start": 2000,
              "end": 2500
          },
          {
              "note": "G",
              "start": 3000,
              "end": 3500
          }
      ]
  },
  "5": {
      "id": "5",
      "name": "Cello",
      "category": "String",
      "instrument": "27",
      "color": "#800000",
      "notes": [
          {
              "note": "D",
              "start": 0,
              "end": 2000
          },
          {
              "note": "F",
              "start": 2000,
              "end": 4000
          },
          {
              "note": "B",
              "start": 4000,
              "end": 6000
          },
          {
              "note": "A",
              "start": 6000,
              "end": 8000
          }
      ]
  },
}

const instrumentFixtures = {
  "1": {"id": "1", "name": "Grand Piano"},
  "2": {"id": "2", "name": "Bright Piano"},
  "3": {"id": "3", "name": "Honky-tonk Piano"},
  "4": {"id": "4", "name": "MIDI Grand Piano"},
  "5": {"id": "5", "name": "Harpsichord"},
  "6": {"id": "6", "name": "Electric Piano 1"},
  "7": {"id": "7", "name": "Electric Piano 2"},
  "8": {"id": "8", "name": "Electric Grand Piano"},
  "9": {"id": "9", "name": "Clavi"},
  "10": {"id": "10", "name": "Drawbar Organ"},
  "11": {"id": "11", "name": "Percussive Organ"},
  "12": {"id": "12", "name": "Rock Organ"},
  "13": {"id": "13", "name": "Church Organ"},
  "14": {"id": "14", "name": "Reed Organ"},
  "15": {"id": "15", "name": "Accordion"},
  "16": {"id": "16", "name": "Tango Accordion"},
  "17": {"id": "17", "name": "Harmonica"},
  "18": {"id": "18", "name": "Strings"},
  "19": {"id": "19", "name": "Strings 2"},
  "20": {"id": "20", "name": "Synth Strings 1"},
  "21": {"id": "21", "name": "Synth Strings 2"},
  "22": {"id": "22", "name": "Marcato Strings"},
  "23": {"id": "23", "name": "Tremolo Strings"},
  "24": {"id": "24", "name": "Pizzicato Strings"},
  "25": {"id": "25", "name": "Violin"},
  "26": {"id": "26", "name": "Viola"},
  "27": {"id": "27", "name": "Cello"},
  "28": {"id": "28", "name": "Contrabass"},
  "29": {"id": "29", "name": "Orchestral Harp"},
  "30": {"id": "30", "name": "Orchestra Hit"},
  "31": {"id": "31", "name": "Nylon Guitar"},
  "32": {"id": "32", "name": "Steel Guitar"},
  "33": {"id": "33", "name": "Jazz Guitar"},
  "34": {"id": "34", "name": "Clean Guitar"},
  "35": {"id": "35", "name": "Muted Guitar"},
  "36": {"id": "36", "name": "Overdriven Guitar"},
  "37": {"id": "37", "name": "Distortion Guitar"},
  "38": {"id": "38", "name": "Guitar Harmonics"},
  "39": {"id": "39", "name": "Acoustic Bass"},
  "40": {"id": "40", "name": "Finger Bass"},
  "41": {"id": "41", "name": "Pick Bass"},
  "42": {"id": "42", "name": "Fretless Bass"},
  "43": {"id": "43", "name": "Slap Bass 1"},
  "44": {"id": "44", "name": "Slap Bass 2"},
  "45": {"id": "45", "name": "Synth Bass 1"},
  "46": {"id": "46", "name": "Synth Bass 2"},
  "47": {"id": "47", "name": "Choir Aahs"},
  "48": {"id": "48", "name": "Voice Oohs"},
  "49": {"id": "49", "name": "Synth Voice"},
  "50": {"id": "50", "name": "Trumpet"},
  "51": {"id": "51", "name": "Muted Trumpet"},
  "52": {"id": "52", "name": "Trombone"},
  "53": {"id": "53", "name": "French Horn"},
  "54": {"id": "54", "name": "Tuba"},
  "55": {"id": "55", "name": "Brass Section"},
  "56": {"id": "56", "name": "Synth Brass"},
  "57": {"id": "57", "name": "Funky Analog"},
  "58": {"id": "58", "name": "Techno Brass"},
  "59": {"id": "59", "name": "Synth Brass 1"},
  "60": {"id": "60", "name": "Synth Brass 2"},
  "61": {"id": "61", "name": "Tenor Sax"},
  "62": {"id": "62", "name": "Alto Sax"},
  "63": {"id": "63", "name": "Soprano Sax"},
  "64": {"id": "64", "name": "Baritone Sax"},
  "65": {"id": "65", "name": "Oboe"},
  "66": {"id": "66", "name": "Clarinet"},
  "67": {"id": "67", "name": "English Horn"},
  "68": {"id": "68", "name": "Bassoon"},
  "69": {"id": "69", "name": "Flute"},
  "70": {"id": "70", "name": "Piccolo"},
  "71": {"id": "71", "name": "Pan Flute"},
  "72": {"id": "72", "name": "Recorder"},
  "73": {"id": "73", "name": "Blown Bottle"},
  "74": {"id": "74", "name": "Shakuhachi"},
  "75": {"id": "75", "name": "Whistle"},
  "76": {"id": "76", "name": "Ocarina"},
  "77": {"id": "77", "name": "Funky Lead"},
  "78": {"id": "78", "name": "Portatone"},
  "79": {"id": "79", "name": "UnderHeim"},
  "80": {"id": "80", "name": "Square Lead"},
  "81": {"id": "81", "name": "Sawtooth Lead"},
  "82": {"id": "82", "name": "Calliope Lead"},
  "83": {"id": "83", "name": "Chiff Lead"},
  "84": {"id": "84", "name": "Charang Lead"},
  "85": {"id": "85", "name": "Voice Lead"},
  "86": {"id": "86", "name": "Fifths Lead"},
  "87": {"id": "87", "name": "Bass & Lead"},
  "88": {"id": "88", "name": "Fantasia"},
  "89": {"id": "89", "name": "Symbiont"},
  "90": {"id": "90", "name": "Sweet Heaven"},
  "91": {"id": "91", "name": "Dream Heaven"},
  "92": {"id": "92", "name": "New Age Pad"},
  "93": {"id": "93", "name": "Warm Pad"},
  "94": {"id": "94", "name": "Poly Synth Pad"},
  "95": {"id": "95", "name": "Choir Pad"},
  "96": {"id": "96", "name": "Bowed Pad"},
  "97": {"id": "97", "name": "Metallic Pad"},
  "98": {"id": "98", "name": "Halo Pad"},
  "99": {"id": "99", "name": "Sweep Pad"},
  "100": {"id": "100", "name": "Vibraphone"},
  "101": {"id": "101", "name": "Marimba"},
  "102": {"id": "102", "name": "Xylophone"},
  "103": {"id": "103", "name": "Steel Drums"},
  "104": {"id": "104", "name": "Celesta"},
  "105": {"id": "105", "name": "Music Box"},
  "106": {"id": "106", "name": "Tubular Bells"},
  "107": {"id": "107", "name": "Timpani"},
  "108": {"id": "108", "name": "Glockenspiel"},
  "109": {"id": "109", "name": "Tinkle Bell"},
  "110": {"id": "110", "name": "Agogo"},
  "111": {"id": "111", "name": "Woodblock"},
  "112": {"id": "112", "name": "Taiko Drum"},
  "113": {"id": "113", "name": "Melodic Tom"},
  "114": {"id": "114", "name": "Synth Drum"},
  "115": {"id": "115", "name": "Reverse Cymbal"},
  "116": {"id": "116", "name": "Sitar"},
  "117": {"id": "117", "name": "Dulcimer"},
  "118": {"id": "118", "name": "Banjo"},
  "119": {"id": "119", "name": "Shamisen"},
  "120": {"id": "120", "name": "Koto"},
  "121": {"id": "121", "name": "Kalimba"},
  "122": {"id": "122", "name": "Bagpipe"},
  "123": {"id": "123", "name": "Fiddle"},
  "124": {"id": "124", "name": "Shanai"},
  "125": {"id": "125", "name": "Rain"},
  "126": {"id": "126", "name": "Sound Track"},
  "127": {"id": "127", "name": "Crystal"},
  "128": {"id": "128", "name": "Atmosphere"},
  "129": {"id": "129", "name": "Brightness"},
  "130": {"id": "130", "name": "Goblins"},
  "131": {"id": "131", "name": "Echoes"},
  "132": {"id": "132", "name": "Sci-Fi"},
  "133": {"id": "133", "name": "Fret Noise"},
  "134": {"id": "134", "name": "Breath Noise"},
  "135": {"id": "135", "name": "Seashore"},
  "136": {"id": "136", "name": "Bird Tweet"},
  "137": {"id": "137", "name": "Telephone Ring"},
  "138": {"id": "138", "name": "Helicopter"},
  "139": {"id": "139", "name": "Applause"},
  "140": {"id": "140", "name": "Gunshot"}
}

/////////////////////////////////////////////////////////////////////////////////////////

describe(__('Webprogramozás zh: MIDI editor'), function () {
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

  (tests.includes(1) ? describe : describe.skip)(__('1. feladat: Oldal egyes részeinek elrejtése'), () => {

    it(__('Paraméter nélkül meghívva minden megjelenik (2.5 pt)'), runner(() => {
      tester.visit(url + 'index.php')
      tester.info(__('Minden megjelenik'));
      [
        'div.tracks',
        'div.pianoroll',
        'div.keyboard',
      ].forEach(sel => tester.$(sel))
      tester.point(2.5);
    }));

    ['tracks', 'pianoroll', 'keyboard', 'tracks,pianoroll', 'tracks,keyboard', 'pianoroll,keyboard', 'tracks,pianoroll,keyboard'].forEach(par =>
      it(__(`Paraméter: ?hide=%s (2.5 pt)`, par), runner(() => {
        tester.visit(url + 'index.php?hide=' + par)
        'tracks,pianoroll,keyboard'.split(',').filter(p => !par.split(',').includes(p)).forEach(part => {
          tester.info(__(`%s megjelenik`, part))
          tester.$(`div.${part}`)
        })
        'tracks,pianoroll,keyboard'.split(',').filter(p => par.split(',').includes(p)).forEach(part => {
          tester.info(__(`%s nem jelenik meg`, part))
          tester.element(`div.${part}`).should('equal', null)
        })
        tester.point(2.5);
      }))
    );
    
  });

  (tests.includes(2) ? describe : describe.skip)(__('2. feladat: Track-ek listázása'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('Track id-ja data attribútumban megjelenik (2.5 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"]`);
      });
      tester.point(2.5);
    }));

    it(__('Track neve helyesen megjelenik (2.5 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"]`).prop('innerText').should('contain', e.name)
      });
      tester.point(2.5);
    }));

    it(__('Track színe helyesen megjelenik (2.5 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"]`).eval(li => li.style.backgroundColor).should('equal', hexToRGB(e.color))
      });
      tester.point(2.5);
    }));

    it(__('Track kategóriája helyesen megjelenik (2.5 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"] span`).prop('innerText').should('equal', e.category)
      });
      tester.point(2.5);
    }));

    it(__('Track hangszere helyesen megjelenik (5 pt)'), runner(() => {
      Object.values(trackFixtures).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"]`).prop('innerText').should('contain', `(${instrumentFixtures[e.instrument].name})`)
      });
      tester.point(5);
    }));
    
    it(__('Track hangjegyei data attribútumban tárolódnak (5 pt)'), runner(() => {
      Object.values(trackFixtures).slice(0,3).forEach(e => {
        tester.info(__(`%s adatainak ellenőrzése`, e.name))
        tester.$(`.tracks ul li[data-id="${e.id}"]`).eval(li => li.dataset.notes).should('equal', JSON.stringify(e.notes))
      });
      tester.point(5);
    }));

  });

  (tests.includes(3) ? describe : describe.skip)(__('3. feladat: Új track hozzáadása'), () => {

    const errors = [
      "The track name is required",
      "The track color is required",
      "The track color has a wrong format",
      "The category is required",
      "The instrument is required",
      "The instrument has to be an integer"
    ]

    beforeEach(async function () {
      tester.visit(url + 'new.php')
    });

    it(__('Az űrlap elemei megvannak'), runner(() => {
      tester.$('form input[name=name]');
      tester.$('form input[name=color]');
      tester.$('form input[name=category]');
      tester.$('form select[name=instrument]');
      tester.$('form [type=submit]');
      tester.point(1);
    }));

    it(__('Betöltéskor nincs hibaüzenet'), runner(() => {
      tester.element("div.errors").should('equal', null);
      tester.point(1);
    }));

    it(__('Mindegyik hangszer megjelenik az instrument elemben'), runner(() => {
      tester.$('form [name=instrument]').eval(select => Array.from(select.options).map(o => o.text.trim()).sort().join(',')).should(str => 
        expect(str).to.equal(Object.values(instrumentFixtures).map(i => i.name.trim()).sort().join(','))
      )
      tester.point(8);
    }));

    context(__('Track name mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=name]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[0])

        tester.point(2);
      }));

      it(__('Üres szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[0])

        tester.point(2);
      }));
    })

    context(__('Track color mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=color]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[1])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=color]').set('type', 'text')
        tester.$('form [name=color]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[1])

        tester.point(1);
      }));

      ['aaaaaa', 'aaaaaaaa', 'X123456', '#0379ga'].forEach(val => 
        it(__(`Rossz formátummal feltöltve: %s (1 pt)`, val), runner(() => {
          tester.$('form').set('noValidate', true)
          tester.$('form [name=color]').set('type', 'text')
          tester.$('form [name=color]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('new.php'),
            __('Új track hozzáadása oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('div.errors').prop('innerHTML').should('contain', errors[2])

          tester.point(1);
        }))
      )
    })

    context(__('Track category mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=category]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[3])

        tester.point(2);
      }));

      it(__('Üres szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=category]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[3])

        tester.point(2);
      }));
    })

    context(__('Track instrument mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form').eval(form => form.querySelector('[name=instrument]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[4])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=instrument]').eval(select => select.add(new Option('', '', true, true), 0))

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[4])

        tester.point(2);
      }));

      it(__('Szöveggel feltöltve (2 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=instrument]').eval(select => select.add(new Option('', 'a', true, true), 0))

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML').should('contain', errors[5])

        tester.point(2);
      }));
    })

    context(__('Minden mező együttes vizsgálata'), () => {
      it(__('Mindegyik üres (3 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '')
        tester.$('form [name=color]').set('type', 'text')
        tester.$('form [name=color]').set('value', '')
        tester.$('form [name=category]').set('value', '')
        tester.$('form [name=instrument]').eval(select => select.add(new Option('', '', true, true), 0))

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[0])
          .should('contain', errors[1])
          .should('contain', errors[3])
          .should('contain', errors[4])
          .should(html => {
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[5])
          })

        tester.point(3);
      }));

      it(__('Rossz formátumú szín (4 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', 'q')
        tester.$('form [name=color]').set('type', 'text')
        tester.$('form [name=color]').set('value', 'q')
        tester.$('form [name=category]').set('value', 'q')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[2])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[5])
          })

        tester.point(4);
      }));

      it(__('Szöveges hangszerkód (4 pt)'), runner(() => {
        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', 'q')
        tester.$('form [name=color]').set('value', '#123456')
        tester.$('form [name=category]').set('value', 'q')
        tester.$('form [name=instrument]').eval(select => select.add(new Option('', 'q', true, true), 0))

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('div.errors').prop('innerHTML')
          .should('contain', errors[5])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[4])
          })

        tester.point(4);
      }));

      it(__('Az űrlap állapottartó: input mezők (5 pt)'), runner(() => {
        const name = randomString()
        const color = `#${random(100000, 999999)}`
        const category = randomString()

        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', name)
        tester.$('form [name=color]').set('value', color)
        tester.$('form [name=category]').set('value', category)
        tester.$('form [name=instrument]').eval(select => select.add(new Option('', 'q', true, true), 0))

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Input mezők értékeinek ellenőrzése'));
        tester.$('form [name=name]').prop('value').should('equal', name)
        tester.$('form [name=color]').prop('value').should('equal', color)
        tester.$('form [name=category]').prop('value').should('equal', category)

        tester.point(5);
      }));

      it(__('Az űrlap állapottartó: select mező (5 pt)'), runner(() => {
        const instrument = random(1, 100)

        tester.$('form').set('noValidate', true)
        tester.$('form [name=name]').set('value', '')
        tester.$('form [name=category]').set('value', '')
        tester.$('form [name=instrument]').set('selectedIndex', instrument)

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('new.php'),
          __('Új track hozzáadása oldal jön be')
        )

        tester.info(__('Select mező értékeinek ellenőrzése'));
        tester.$('form [name=instrument]').prop('selectedIndex').should('equal', instrument)

        tester.point(5);
      }));
    })

    it(__('Helyes kitöltés (20 pt)'), runner(() => {
      const name = randomString()
      const color = `#${random(100000, 999999)}`
      const category = randomString()
      const instrument = random(1, 100).toString()

      tester.$('form').set('noValidate', true)
      tester.$('form [name=name]').set('value', name)
      tester.$('form [name=color]').set('value', color)
      tester.$('form [name=category]').set('value', category)
      tester.$('form [name=instrument]').set('value', instrument)

      tester.info(__('Kattintás a submit gombra'));
      tester.$('form [type=submit]').clickWithNavigation().should(() => 
      expect(page.url()).to.contain('index.php'),
      __('Főoldal jelenik meg')
      )
      
      tester.info(__('Adatok ellenőrzése a track listában'));
      tester.$$('.tracks ul li')
        .eval((lis, name, color, category, instrument, instrumentFixtures) => 
          lis.some(li => li.innerText.includes(name) && 
                         li.innerText.includes(category) &&
                         li.innerText.includes(instrumentFixtures[instrument].name) &&
                         li.style.backgroundColor === color
          ),
          name, hexToRGB(color), category, instrument, instrumentFixtures
        )
        .should('equal', true)
      tester.point(5);

      tester.info(__('A főoldal újbóli betöltése'));
      tester.visit(url + 'index.php')

      tester.info(__('A módosítások így is megjelennek a küldetések táblázatban'));
      tester.$$('.tracks ul li')
        .eval((lis, name, color, category, instrument, instrumentFixtures) => 
          lis.some(li => li.innerText.includes(name) && 
                         li.innerText.includes(category) &&
                         li.innerText.includes(instrumentFixtures[instrument].name) &&
                         li.style.backgroundColor === color
          ),
          name, hexToRGB(color), category, instrument, instrumentFixtures
        )
        .should('equal', true)

      tester.point(15);
    }));

  });

  (tests.includes(4) ? describe : describe.skip)(__('4. feladat: Track kiválasztása és hangjainak megjelenítése'), () => {

    const map = {
      'C': 70,
      'D': 60,
      'E': 50,
      'F': 40,
      'G': 30,
      'A': 20,
      'B': 10,
      'C+': 0,
    }

    beforeEach(async function () {
      tester.visit(url + 'index.php')
    });

    it(__('Egy trackre kattintva kiválasztásra kerül (2 pt)'), runner(() => {
      const tr = random(1, 5) // 5-tel miért nem működik???
      
      tester.info(__(`A track eleinte nincs kiválasztva`))
      tester.element(`.tracks ul li[data-id="${tr}"].selected`).should("equal", null)

      tester.info(__(`A trackre kattintás`))
      tester.$(`.tracks ul li[data-id="${tr}"]`).click()
      
      tester.info(__(`Track ki van választva`))
      tester.$(`.tracks ul li[data-id="${tr}"].selected`)
      tester.$$(`.tracks ul li.selected`).eval(lis => lis.length).should('equal', 1)      

      tester.point(2);
    }));

    it(__('Egymás után több trackre kattintva mindig a legutolsó van kiválasztva (3 pt)'), runner(() => {
      const trs = [random(1, 5), random(1, 5), random(1, 5)]
      
      tester.info(__(`A trackekre kattintás`))
      trs.forEach(tr => {
        tester.$(`.tracks ul li[data-id="${tr}"]`).click()
      })
      
      tester.info(__(`A legutolsó track van kiválasztva`))
      tester.$(`.tracks ul li[data-id="${trs[2]}"].selected`)
      tester.$$(`.tracks ul li.selected`).eval(lis => lis.length).should('equal', 1)      

      tester.point(3);
    }));

    it(__('Trackre kattintva a hangjegy JSON a textareaban megjelenik (5 pt)'), runner(() => {
      range(5).forEach(i => {
        tester.info(__(`A(z) %s. trackre kattintás`, i))
        tester.$(`.tracks ul li[data-id="${i}"]`).click()
        
        tester.info(__(`Textarea tartalmának ellenőrzése`))
        tester.$(`textarea`).eval((ta, i) => ta.value === document.querySelector(`.tracks ul li[data-id="${i}"]`).dataset.notes, i).should('equal', true)  
      })
      
      tester.point(5);
    }));

    it(__('Textareaban lévő hangjegy JSON a gombra kattintva megjelenik a pianorollban (svg) (20 pt)'), runner(() => {
      const notes = [{"note":"C","start":random(900,1100),"end":random(1400,1600)},{"note":"E","start":random(1900,2100),"end":random(2400,2600)},{"note":"G","start":random(2900,3100),"end":random(3400,3600)}]
      
      tester.info(__(`Textarea töltése`))
      tester.$(`textarea`).set('value', JSON.stringify(notes))
      
      tester.info(__(`Gomb megnyomása`))
      tester.$('#showbutton').click()

      tester.info(__(`Pianoroll tartalmának ellenőrzése`))
      tester.$$('svg rect').eval(rects => rects.length).should('equal', notes.length)
      notes.forEach(note => {
        tester.$(`svg rect[x="${note.start}"][y="${map[note.note]}"][width="${note.end - note.start}"][height="10"]`)
      })
      
      tester.point(20);
    }));

    it(__('Kattintásra megjelennek a pianorollban a hangjegyek (5 pt)'), runner(() => {
      range(3).forEach(i => {
        tester.info(__(`A(z) %s. trackre kattintás`, i))
        tester.$(`.tracks ul li[data-id="${i}"]`).click()
        
        tester.info(__(`Pianoroll tartalmának ellenőrzése`))
        const notes = trackFixtures[i].notes
        tester.$$('svg rect').eval(rects => rects.length).should('equal', notes.length)
        notes.forEach(note => {
          tester.$(`svg rect[x="${note.start}"][y="${map[note.note]}"][width="${note.end - note.start}"][height="10"]`)
        })
      })
      
      tester.point(5);
    }));

  });

  (tests.includes(5) ? describe : describe.skip)(__('5. feladat: Track kiválasztása billentyűzettel'), () => {

    beforeEach(async function () {
      tester.visit(url + 'index.php')
    });

    it(__('Oldal betöltésekor egyik track sincs kiválasztva (1 pt)'), runner(() => {
      tester.element(`.tracks ul li.selected`).should('equal', null)
      tester.point(1);
    }));

    it(__('Oldal betöltése után lefele billentyű megnyomására az első track kerül kiválasztásra (4 pt)'), runner(() => {
      tester.runFunction(() => page.keyboard.press('ArrowDown'));
      tester.$(`.tracks ul li:first-child.selected`)
      tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      tester.point(4);
    }));

    it(__('Oldal betöltése után a felfele billentyű megnyomására az utolsó track kerül kiválasztásra (4 pt)'), runner(() => {
      tester.runFunction(() => page.keyboard.press('ArrowUp'));
      tester.$(`.tracks ul li:last-child.selected`)
      tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      tester.point(4);
    }));

    it(__('Le-föl billentyűket nyomogatva a megfelelő trackek kerülnek kiválasztásra (4 pt)'), runner(() => {
      let i = 0;
      ['ArrowDown', 'ArrowDown', 'ArrowDown', random(0, 1) ? 'ArrowDown' : 'ArrowUp', random(0, 1) ? 'ArrowDown' : 'ArrowUp'].forEach(key => {
        tester.info(__(`%s megnyomása`, key))
        tester.runFunction(() => page.keyboard.press(key));
        i += (key === 'ArrowDown' ? 1 : -1)
        tester.$(`.tracks ul li:nth-child(${i}).selected`)
        tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      })
      tester.point(4);
    }));

    it(__('Elsőről föllépve az utolsóra kerülünk (4 pt)'), runner(() => {
      tester.info(__(`Elsőre lépés a lefele gombbal`))
      tester.runFunction(() => page.keyboard.press('ArrowDown'));
      tester.info(__(`Felfele gomb megnyomása`))
      tester.runFunction(() => page.keyboard.press('ArrowUp'));
      tester.$(`.tracks ul li:last-child.selected`)
      tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      tester.point(4);
    }));

    it(__('Utolsóról lelépve az elsőre kerülünk (4 pt)'), runner(() => {
      tester.info(__(`Utolsóra lépés a felfele gombbal`))
      tester.runFunction(() => page.keyboard.press('ArrowUp'));
      tester.info(__(`Lefele gomb megnyomása`))
      tester.runFunction(() => page.keyboard.press('ArrowDown'));
      tester.$(`.tracks ul li:first-child.selected`)
      tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      tester.point(4);
    }));

    it(__('Egérrel való kattintás után is tudunk közlekedni (4 pt)'), runner(() => {
      tester.info(__(`Kattintás egy track-re`))
      tester.$(`.tracks ul li:nth-child(3)`).click()
      tester.info(__(`Lefele gomb megnyomása`))
      tester.runFunction(() => page.keyboard.press('ArrowDown'));
      tester.$(`.tracks ul li:nth-child(4).selected`)
      tester.$$('.tracks ul li.selected').eval(lis => lis.length).should('equal', 1)
      tester.point(4);
    }));

  });

  (tests.includes(6) ? describe : describe.skip)(__('6. feladat: Felvétel rögzítése'), () => {

    beforeEach(async function () {
      tester.visit(url + 'index.php')
    });

    it(__('Oldal betöltésekor egyik zongorabillentyű sincs kiválasztva (1 pt)'), runner(() => {
      tester.element(`.keyboard div.active`).should('equal', null)
      tester.point(1);
    }));

    it(__('1-8 billentyűket lenyomva a megfelelő zongorabillentyű aktiválódik (9 pt)'), runner(() => {
      range(8).forEach(n => {
        tester.info(__(`%s gomb lenyomása`, n))
        tester.runFunction(() => page.keyboard.down(`${n}`));
        tester.$(`.keyboard div:nth-child(${n}).active`)
        tester.$$('.keyboard div.active').eval(divs => divs.length).should('equal', 1)
        
        tester.info(__(`%s gomb felengedése`, n))
        tester.runFunction(() => page.keyboard.up(`${n}`));
        tester.element(`.keyboard div.active`).should('equal', null)
      })
      tester.point(9);
    }));

    it(__('Szóközt lenyomva aktiválódik a felvétel (5 pt)'), runner(() => {
      tester.info(__(`Eleinte az svg háttere nem aktív`))
      tester.element('svg.active').should('equal', null)
      
      tester.info(__(`Szóközt lenyomva aktiválódik`))
      tester.runFunction(() => page.keyboard.press(` `));
      tester.$('svg.active')
      
      tester.info(__(`Újra megnyomva megint nem aktív`))
      tester.runFunction(() => page.keyboard.press(` `));
      tester.element('svg.active').should('equal', null)
      
      tester.point(5);
    }));

    it(__('Szóköz + 1-8 billentyűk + Szóköz: felvétel, textarea, pianoroll (35 pt)'), runner(() => {
      const map = {
        '1': 'C',
        '2': 'D',
        '3': 'E',
        '4': 'F',
        '5': 'G',
        '6': 'A',
        '7': 'B',
        '8': 'C+',
      }
      const notes = []
      
      // tester.info(__(`Szóköz lenyomása`))
      // tester.runFunction(() => page.keyboard.press(` `));
      
      const length = random(3, 8)
      let time = 0;
      for (let i=1; i<=length; i++) {
        time += random(5, 10) * 10
        const start = time
        time += random(5, 10) * 10
        const end = time
        const key = random(1, 8).toString()
        const note = map[key]
        notes.push({note, start, end, key})
      }

      // let last = 0
      // notes.forEach(note => {
      //   tester.waitFor(note.start-last)
        
      //   // tester.info(__(`%s gomb lenyomása`, note.key))
      //   tester.runFunction(() => page.keyboard.down(`${note.key}`));
        
      //   tester.waitFor(note.end-note.start)
      //   last = note.end
        
      //   // tester.info(__(`%s gomb felengedése`, note.key))
      //   tester.runFunction(() => page.keyboard.up(`${note.key}`));
      // })
      tester.info(__(`Szóköz + 1-8 billentyűk + szóköz megnyomása`))
      tester.runFunction(() => page.evaluate(async notes => {
        function waitFor(ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}))
        let last = 0
        for (const note of notes) {
          await waitFor(note.start - last)
          document.dispatchEvent(new KeyboardEvent('keydown', {key: note.key}))
          await waitFor(note.end-note.start)
          document.dispatchEvent(new KeyboardEvent('keyup', {key: note.key}))
          last = note.end
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {key: ' '}))
      }, notes))

      // tester.info(__(`Szóköz lenyomása`))
      // tester.runFunction(() => page.keyboard.press(` `));

      // let notes2
      tester.info(__(`Textarea tartalmának kiértékelése`))
      tester.$('textarea').prop('value').should(val => {
        const notes2 = JSON.parse(val)
        expect(notes2.length).to.equal(notes.length)
        for (let i = 0; i<notes.length; i++) {
          const note1 = notes[i]
          const note2 = notes2[i]
          expect(note2.note).to.equal(note1.note)
          expect(note2.start).to.be.closeTo(note1.start, 80)
          expect(note2.end).to.be.closeTo(note1.end, 80)
        }
      })

      // tester.info(__(`Pianoroll tartalmának ellenőrzése`))
      // tester.$('svg').should
      // tester.$$('svg rect').eval(rects => rects.length).should('equal', notes2.length)
      // notes2.forEach(note => {
      //   tester.$(`svg rect[x="${note.start}"][y="${map[note.note]}"][width="${note.end - note.start}"][height="10"]`)
      // })

      tester.point(35);
    }));

  });

  (tests.includes(7) ? describe : describe.skip)(__('7. feladat: Felvétel AJAX mentése'), () => {

    beforeEach(async function () {
      tester.visit(url + 'index.php')
    });

    it(__('A gombra kattintva a textarea értéke a kiválasztott track-hez mentődik (40 pt)'), runner(() => {
      const notes = [{"note":"C","start":random(900,1100),"end":random(1400,1600)},{"note":"E","start":random(1900,2100),"end":random(2400,2600)},{"note":"G","start":random(2900,3100),"end":random(3400,3600)}]    
      const tr = random(4,5)
      
      tester.info(__(`Track kijelölése kattintással`))
      tester.$(`.tracks ul li[data-id="${tr}"]`).click()
      
      tester.info(__(`Textarea töltése`))
      tester.$('textarea').set('value', JSON.stringify(notes))
      
      tester.info(__(`Gomb megnyomása`))
      tester.$('#savebutton').click()

      tester.waitForResponse()
      tester.isAjax()
      tester.point(10);

      console.log('\t\tPOST kérés volt?');
      tester.runFunction(() => expect(tester.globalResponse.request().method()).to.equal('POST'));
      tester.point(10);

      tester.info(__("Gomb megváltozik"))
      tester.$(`#savebutton`).prop('innerText').should('contain', "✔")
      tester.point(2);
      
      tester.info(__("Oldalt újratöltve a mentett adat van a kiválasztott tracknél"))
      tester.visit(url + 'index.php')
      tester.$(`.tracks ul li[data-id="${tr}"]`).eval(li => li.dataset.notes).should('equal', JSON.stringify(notes))

      tester.point(18);
    }));

  });

})