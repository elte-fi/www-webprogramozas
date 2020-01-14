const puppeteer = require('puppeteer');
const { expect } = require('chai');
const Tester = require('../lib/tester.2.js');
const i18n = require("i18n")

const range = n => Array.from({ length: n }, (e, i) => i + 1);
const random = (from, to) => Math.floor(Math.random() * (to - from + 1)) + from;
const randomString = (a = 5, b = 10) => Array.from({ length: random(a, b) }, e => String.fromCharCode(random(97, 122))).join('');
const format_number = val => val.toString().split('').reverse().join('').replace(/.{3}/g, '$& ').split('').reverse().join('').trim()
// const dashName = name => name.toLowerCase().replace(/ /g, "-")

const ENV = 'production'

const server = (ENV === 'development' 
        ? 'http://webprogramozas.inf.elte.hu/user/gyozke/eper/'
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
  defaultLocale: lang,
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
const transactionFixtures = [
  {
      "id": 1,
      "timestamp": "1/1/2020 11:30:00 AM",
      "sourceAccount": "10000000-00000000-00000000",
      "target": {
          "name": "McDonalds",
          "accountNumber": "12345678-12345678-12345677"
      },
      "text": null,
      "value": 650,
      "category": "Other"
  },
  {
      "id": 2,
      "timestamp": "1/7/2020 7:30:00 AM",
      "sourceAccount": "10000000-00000000-00000000",
      "target": {
          "name": "Coffee shop",
          "accountNumber": "12345678-12345678-12345678"
      },
      "text": null,
      "value": 690,
      "category": "Restaurants"
  },
  {
      "id": 3,
      "timestamp": "1/7/2020 4:30:00 PM",
      "sourceAccount": "10000000-00000000-00000000",
      "target": {
          "name": "Flat Mate",
          "accountNumber": "30000000-00000000-00000000"
      },
      "text": "Rent",
      "value": 80000,
      "category": "Transfers"
  },
  {
      "id": 4,
      "timestamp": "1/10/2020 8:00:00 AM",
      "sourceAccount": "20000000-00000000-00000000",
      "target": {
          "name": "John Doe",
          "accountNumber": "10000000-00000000-00000000"
      },
      "text": "Monthly Salary",
      "value": 200000,
      "category": "Transfers"
  },
  {
      "id": 5,
      "timestamp": "1/10/2020 8:00:00 AM",
      "sourceAccount": "20000000-00000000-00000000",
      "target": {
          "name": "Flat Mate",
          "accountNumber": "30000000-00000000-00000000"
      },
      "text": "Alexander Victor LLC - Monthly Salary",
      "value": 300000,
      "category": "Transfers"
  },
  {
      "id": 6,
      "timestamp": "1/10/2020 5:00:00 PM",
      "sourceAccount": "10000000-00000000-00000000",
      "target": {
          "name": "Lidl",
          "accountNumber": "12345678-12345678-12345679"
      },
      "text": null,
      "value": 50000,
      "category": "Groceries"
  },
  {
      "id": 7,
      "timestamp": "1/10/2020 11:34:26 AM",
      "sourceAccount": "10000000-00000000-00000000",
      "target": {
          "name": "Alexander Victor LLC",
          "accountNumber": "20000000-00000000-00000000"
      },
      "text": "Test",
      "value": 10000,
      "category": "Other"
  }
]

const accountFixtures = [
  {
      "id": 1,
      "account_number": "10000000-00000000-00000000",
      "name": "John Doe"
  },
  {
      "id": 2,
      "account_number": "20000000-00000000-00000000",
      "name": "Alexander Victor LLC"
  },
  {
      "id": 3,
      "account_number": "30000000-00000000-00000000",
      "name": "Flat Mate"
  }
]

const categoryFixtures = [
  'Other',
  'Restaurants',
  'Transfers',
  'Groceries'
];


/////////////////////////////////////////////////////////////////////////////////////////

describe(__('Webprogramozás zh: Mini bank'), function () {
  let browser, page, tester;

  const url = (ENV === 'development' 
                ? server 
                : server + user + '/' + test + '/');

  this.timeout(2500);

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

  (tests.includes(1) ? describe : describe.skip)(__('1. feladat: Tranzakciók listázása'), () => {

    it(__('Tranzakció felépítése a megfelelő (1 pt)'), runner(() => {
      tester.visit(url + 'index.php');
      tester.$(`#transactions tr.transaction`);
      tester.$(`#transactions tr.transaction > td`);
      tester.$(`#transactions tr.transaction > td + td`);
      tester.$(`#transactions tr.transaction > td + td > div`);
      tester.$(`#transactions tr.transaction > td + td > div + div`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div > form`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div + div.hidden`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div + div.hidden > div`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div + div.hidden > div + div`);
      tester.$(`#transactions tr.transaction > td + td > div + div + div + div.hidden + button.more-button`);
      tester.$(`#transactions tr.transaction > td + td + td`);
      tester.point(1);
    }));

    it(__('Az index.php oldalt betöltve az 1. számlához tartozó sorok jelennek meg (2 pt)'), runner(() => {
      tester.visit(url + 'index.php')  
      transactionFixtures.filter(e => e.sourceAccount === '10000000-00000000-00000000' || e.target.accountNumber === '10000000-00000000-00000000').forEach(e => {
        tester.$(`#transactions tr.transaction[data-id="${e.id}"]`);
      });
      transactionFixtures.filter(e => !(e.sourceAccount === '10000000-00000000-00000000' || e.target.accountNumber === '10000000-00000000-00000000')).forEach(e => {
        tester.element(`#transactions tr.transaction[data-id="${e.id}"]`).should('equal', null);
      });
      tester.point(2);
    }));

    [1].forEach(i => {
      context(__('Az %s számla adatainak ellenőrzése', `${i}0000000-00000000-00000000`), () => {

        before(async function () {
          tester.visit(url + `index.php`)
          await tester.run()
        });
      
        it(__('Tranzakció időpontja helyesen megjelenik (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td`).prop('innerHTML').should('equal', e.timestamp)
          });
          tester.point(1);
        }));

        it(__('Célnév helyesen megjelenik (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(1)`).prop('innerHTML').should('equal', e.target.name)
          });
          tester.point(1);
        }));

        it(__('Közlemény helyesen megjelenik (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2)`).prop('innerHTML').should('equal', e.text || 'No text was provided.')
          });
          tester.point(1);
        }));
        
        it(__('A legördülő elemben a tranzakció kategóriája van kiválasztva (2 pt)'), runner(() => {
          transactionFixtures.filter(e => e.id <= 4 && (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(3) > form select option[selected]`).prop('innerHTML').should('equal', e.category)
          });
          tester.point(2);
        }));
        
        it(__('A tranzakció azonosítója helyesen jelenik meg (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(1)`).prop('innerHTML').should('contain', e.id.toString())
          });
          tester.point(1);
        }));
        
        it(__('A forrásszámla helyesen jelenik meg (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(2)`).prop('innerHTML').should('contain', e.sourceAccount)
          });
          tester.point(1);
        }));

        it(__('A célszámla helyesen jelenik meg (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(3)`).prop('innerHTML').should('contain', e.target.accountNumber)
          });
          tester.point(1);
        }));

        it(__('A tranzakció értéke helyesen jelenik meg (1 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3)`).prop('innerHTML').should(value => 
              expect(value.replace(/ |-/g, '')).to.equal(e.value.toString()))
          });
          tester.point(1);
        }));

        it(__('A tranzakció értéke helyes előjellel jelenik meg (2 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3)`).prop('innerHTML').should(value => 
              expect(value.replace(/ /g, '')).to.equal(((e.sourceAccount === `${i}0000000-00000000-00000000` ? -1 : 1) * e.value).toString()))
          });
          tester.point(2);
        }));

      });
    });

    [1].forEach(i => {
      context(__('Az %s számla formázásainak ellenőrzése', `${i}0000000-00000000-00000000`), () => {

        before(async function () {
          tester.visit(url + `index.php`)
          await tester.run()
        });
      
        it(__('Üres közlemény dőlten jelenik meg (2 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.text !== null).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2):not(.empty)`)
          });
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.text === null).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2).empty`)
          });
          tester.point(2);
        }));

        it(__('A tranzakció értéke hármas tagolású formátumú (2 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3)`).prop('innerHTML').should(value => {
              expect(value.replace(/-/g, '')).to.equal(format_number(e.value))
            })
          });
          tester.point(2);
        }));

        it(__('Jóváírás zölden, terhelés pirosan jelenik meg a tranzakció értékénél (2 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.target.accountNumber === `${i}0000000-00000000-00000000`).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3).credit`)
          });
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.sourceAccount === `${i}0000000-00000000-00000000`).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3).debit`)
          });
          tester.point(2);
        }));

      });
    });
    
  });

  (tests.includes(2) ? describe : describe.skip)(__('2. feladat: Számlák közötti váltás lehetősége és a választás megőrzése URL-ben'), () => {

    context(__('Nem létező számlaszámmal meghívva az 1. számla adatai jelennek meg'), () => {

      ['', '10000000', 'qwerty', '12345678-12345678-12345678'].forEach(account => {
        it(__('index.php?account=%s (0.25 pt)', account), runner(() => {
          tester.visit(url + `index.php?account=${account}`)  
          transactionFixtures.filter(e => e.sourceAccount === '10000000-00000000-00000000' || e.target.accountNumber === '10000000-00000000-00000000').forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"]`);
          });
          transactionFixtures.filter(e => !(e.sourceAccount === '10000000-00000000-00000000' || e.target.accountNumber === '10000000-00000000-00000000')).forEach(e => {
            tester.element(`#transactions tr.transaction[data-id="${e.id}"]`).should('equal', null);
          });
          tester.point(0.25);
        }));
      })

    });

    [1, 2, 3].forEach(i => {
      context(__('Az %s számla adatainak ellenőrzése', `${i}0000000-00000000-00000000`), () => {

        before(async function () {
          tester.visit(url + `index.php?account=${i}0000000-00000000-00000000`)
          await tester.run()
        });
      
        it(__('Csak a(z) %s. számlához tartozó sorok jelennek meg (0.25 pt)', i), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"]`);
          });
          transactionFixtures.filter(e => !(e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.element(`#transactions tr.transaction[data-id="${e.id}"]`).should('equal', null);
          });
          tester.point(0.25);
        }));

        it(__('Tranzakció időpontja helyesen megjelenik (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td`).prop('innerHTML').should('equal', e.timestamp)
          });
          tester.point(0.25);
        }));

        it(__('Célnév helyesen megjelenik (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(1)`).prop('innerHTML').should('equal', e.target.name)
          });
          tester.point(0.25);
        }));

        it(__('Közlemény helyesen megjelenik (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2)`).prop('innerHTML').should('equal', e.text || 'No text was provided.')
          });
          tester.point(0.25);
        }));
        
        it(__('Üres közlemény dőlten jelenik meg (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.text !== null).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2):not(.empty)`)
          });
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.text === null).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(2).empty`)
          });
          tester.point(0.25);
        }));

        it(__('A legördülő elemben a tranzakció kategóriája van kiválasztva (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => e.id <= 4 && (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(3) > form select option[selected]`).prop('innerHTML').should('equal', e.category)
          });
          tester.point(0.25);
        }));
        
        it(__('A tranzakció azonosítója helyesen jelenik meg (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(1)`).prop('innerHTML').should('contain', e.id.toString())
          });
          tester.point(0.25);
        }));
        
        it(__('A forrásszámla helyesen jelenik meg (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(2)`).prop('innerHTML').should('contain', e.sourceAccount)
          });
          tester.point(0.25);
        }));

        it(__('A célszámla helyesen jelenik meg (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(2) > div:nth-child(4) > div:nth-child(3)`).prop('innerHTML').should('contain', e.target.accountNumber)
          });
          tester.point(0.25);
        }));

        it(__('A tranzakció értéke helyesen jelenik meg (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3)`).prop('innerHTML').should(value => 
              expect(value.replace(/ /g, '')).to.equal(((e.sourceAccount === `${i}0000000-00000000-00000000` ? -1 : 1) * e.value).toString()))
          });
          tester.point(0.25);
        }));

        it(__('A tranzakció értéke hármas tagolású formátumú (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`)).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3)`).prop('innerHTML').should(value => {
              expect(value).to.equal((e.sourceAccount === `${i}0000000-00000000-00000000` ? '-' : '') + format_number(e.value))
            })
          });
          tester.point(0.25);
        }));

        it(__('Jóváírás zölden, terhelés pirosan jelenik meg a tranzakció értékénél (0.25 pt)'), runner(() => {
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.target.accountNumber === `${i}0000000-00000000-00000000`).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3).credit`)
          });
          transactionFixtures.filter(e => (e.sourceAccount === `${i}0000000-00000000-00000000` || e.target.accountNumber === `${i}0000000-00000000-00000000`) && e.sourceAccount === `${i}0000000-00000000-00000000`).forEach(e => {
            tester.$(`#transactions tr.transaction[data-id="${e.id}"] > td:nth-child(3).debit`)
          });
          tester.point(0.25);
        }));

      });
    });

    it(__(`Az oldal tartalmazza a számlaválasztó mezőt és benne a számlaszámokat (1.5 pt)`), runner(() => {
      tester.visit(url + `index.php`);

      tester.$('form#account-filter')
      tester.$('form#account-filter select[name=account]')
      tester.info(__('Az option-ök a megfelelő számlaszámokat tartalmazzák'))
      tester.$$('form#account-filter select[name=account] option').eval(opts => Array.from(opts).map(o => o.text)).should(opts => {
        expect(opts.sort().join(',')).to.equal(accountFixtures.map(a => a.account_number).sort().join(','))
      })

      tester.point(1.5);
    }));

    it(__(`Paraméter nélkül az alapértelmezetten kiválasztott számlaszám az első (10000000-00000000-00000000) (0.5 pt)`), runner(() => {
      tester.visit(url + `index.php`);
      tester.$('form#account-filter select[name=account]').prop('value').should('equal', '10000000-00000000-00000000')
      tester.point(0.5);
    }));

    [1, 2, 3].forEach(i => {
      it(__(`account=%s paraméterrel meghívva az az elem van kiválasztva a legördülő mezőben (1 pt)`, `${i}0000000-00000000-00000000`), runner(() => {
        tester.visit(url + `index.php?account=${i}0000000-00000000-00000000`);
        tester.$('form#account-filter select[name=account]').prop('value').should('equal', `${i}0000000-00000000-00000000`)
        tester.point(1);
      }));
    });

    // [1, 2, 3].forEach(i => {
    //   it(__(`${i}0000000-00000000-00000000 választása és az űrlap elküldése (1 pt)`), runner(() => {
    //     tester.visit(url + `index.php`);
    //     tester.$('form#account-filter select[name=account]').set('value', `${i}0000000-00000000-00000000`)
    //     tester.$('form#account-filter button').clickWithNavigation().should(() => {
    //         expect(page.url()).to.contain('index.php');
    //         expect(page.url()).to.contain(`account=${i}0000000-00000000-00000000`);
    //       },
    //       __('Az index.php oldal jön be a megfelelő paraméterrel')
    //     )
    //     tester.point(1);
    //   }));
    // });
    
  });

  (tests.includes(3) ? describe : describe.skip)(__('3. feladat: A számla egyenlegének kiszámolása a tranzakciókból'), () => {

    [1, 2, 3].forEach(i => {
      it(__(`A %s számla egyenlegének vizsgálata (4 pt)`, `${i}0000000-00000000-00000000`), runner(() => {
        let balance, sum;
        
        tester.visit(url + `index.php?account=${i}0000000-00000000-00000000`);
        tester.waitFor(50);

        tester.$('#balance-in-huf').prop('innerText').should(val => balance = val)
        tester.$$('#transactions tr.transaction > td:nth-child(3)').eval(tds => tds.reduce((s, td) => s + parseInt(td.innerText.replace(/ /g, '')), 0)).should(val => sum = val)
        
        tester.info(__('Az érték vizsgálata'));
        tester.runFunction(() => {
          expect(balance.replace(/ /g, '')).to.equal(sum.toString())
        })
        tester.point(3)
        
        tester.info(__('Az érték hármas tagozású formázásának vizsgálata'));
        tester.runFunction(() => {
          expect(balance).to.equal((sum < 0 ? '-' : '') + format_number(Math.abs(sum)))
        })
        tester.point(1);
      }));
    })
    
  });

  (tests.includes(4) ? describe : describe.skip)(__('4. feladat: Új tranzakció felvétele'), () => {

    const errors = [
      "Name is required",                         // 0                            
      "Account number is required",               // 1       
      "Account number is invalid",                // 2           
      "Text is to long! (max. 64 characters)",    // 3                  
      "Value is required",                        // 4   
      "Value is not an integer",                  // 5
      "Value is less than or equal than 0",       // 6
      "Value is greater than available balance",  // 7
      "Category is required"                      // 8
    ];

    beforeEach(async function () {
      tester.visit(url + 'index.php')
    });

    it(__('Az űrlap elemei megvannak (1 pt)'), runner(() => {
      tester.$('form#new-transaction input[name=name]');
      tester.$('form#new-transaction input[name=accountNumber]');
      tester.$('form#new-transaction input[name=text]');
      tester.$('form#new-transaction input[name=value]');
      tester.$('form#new-transaction select[name=category]');
      tester.$$('form#new-transaction select[name=category] option').eval(opts => Array.from(opts).map(o => o.text.trim())).should(opts => {
        expect(opts.sort().join(',')).to.equal(categoryFixtures.sort().join(','))
      })
      tester.$('form#new-transaction [type=submit]');
      tester.point(1);
    }));

    it(__('Betöltéskor nincs hibaüzenet (1 pt)'), runner(() => {
      tester.element("#errors").should('equal', null);
      tester.point(1);
    }));

    context(__('name mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction').eval(form => form.querySelector('[name=name]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML').should('contain', errors[0])

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=name]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML').should('contain', errors[0])

        tester.point(2);
      }));
    });

    context(__('accountNumber mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction').eval(form => form.querySelector('[name=accountNumber]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[1])
          .should(html => {
            expect(html).to.not.contain(errors[2])
          })

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (1 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=accountNumber]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[1])
          .should(html => {
            expect(html).to.not.contain(errors[2])
          })

        tester.point(1);
      }));

      ['q', '1', '1-1-1', 'abcdefgh-abcdefgh-abcdefgh', '12345678-12345678-123456789'].forEach(val => 
        it(__(`Rossz formátummal feltöltve: %s (2 pt)`, val), runner(() => {
          tester.$('form#new-transaction').set('noValidate', true)
          tester.$('form#new-transaction [name=accountNumber]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('index.php'),
            __('Ugyanaz az oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('#errors').prop('innerHTML')
            .should('contain', errors[2])
            .should(html => {
              expect(html).to.not.contain(errors[1])
            })

          tester.point(2);
        }))
      )
    });

    context(__('text mező validálása'), () => {
      it(__('Túl hosszú szöveggel feltöltve (2 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=text]').set('value', '12345678901234567890123456789012345678901234567890123456789012345')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML').should('contain', errors[3])

        tester.point(2);
      }));
    });

    context(__('value mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction').eval(form => form.querySelector('[name=value]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[4])
          .should(html => {
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
          })

        tester.point(1);
      }));

      it(__('Üres szöveggel felküldve (2 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=value]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[4])
          .should(html => {
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
          })

        tester.point(2);
      }));

      ['q', '1.1'].forEach(val => 
        it(__(`Rossz értékkel feltöltve: %s (2 pt)`, val), runner(() => {
          tester.$('form#new-transaction').set('noValidate', true)
          tester.$('form#new-transaction [name=value]').set('value', val)

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('index.php'),
            __('Ugyanaz az oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('#errors').prop('innerHTML')
            .should('contain', errors[5])
            .should(html => {
              expect(html).to.not.contain(errors[4])
              expect(html).to.not.contain(errors[6])
              expect(html).to.not.contain(errors[7])
            })

          tester.point(2);
        }))
      );

      it(__(`Negatív számot beírva (2 pt)`), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=value]').set('value', '-1')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[6])
          .should(html => {
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[7])
          })

        tester.point(2);
      }));

      [1, 2, 3].forEach(i => 
        it(__(`Egyenlegnél nagyobb számot beírva (2 pt)`), runner(() => {
          let sum;
          tester.visit(url + `index.php?account=${i}0000000-00000000-00000000`)
          tester.info(__('Egyenleg lekérdezése'))
          tester.$$('#transactions tr.transaction > td:nth-child(3)').eval(tds => tds.reduce((s, td) => s + parseInt(td.innerText.replace(/ /g, '')), 0)).should(val => sum = val)
          
          tester.$('form#new-transaction').set('noValidate', true)
          tester.$('form#new-transaction [name=value]').eval((input, val) => input.value = val, () => Math.max(1, sum + 1))

          tester.info(__('Kattintás a submit gombra'));
          tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
            expect(page.url()).to.contain('index.php'),
            __('Ugyanaz az oldal jön be')
          )

          tester.info(__('Hibaüzenetek ellenőrzése'));
          tester.$('#errors').prop('innerHTML')
            .should('contain', errors[7])
            .should(html => {
              expect(html).to.not.contain(errors[4])
              expect(html).to.not.contain(errors[5])
              expect(html).to.not.contain(errors[6])
            })

          tester.point(2);
        }))
      );
    });

    context(__('category mező validálása'), () => {
      it(__('Hiányzik a POST üzenetből (1 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction').eval(form => form.querySelector('[name=category]').parentElement.innerHTML = '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML').should('contain', errors[8])

        tester.point(1);
      }));
    });

    context(__('Minden mező együttes vizsgálata'), () => {
      it(__('Mindegyik üres (3 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=name]').set('value', '')
        tester.$('form#new-transaction [name=accountNumber]').set('value', '')
        tester.$('form#new-transaction [name=text]').set('value', '')
        tester.$('form#new-transaction [name=value]').set('value', '')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[0])
          .should('contain', errors[1])
          .should('contain', errors[4])
          .should(html => {
            expect(html).to.not.contain(errors[2])
            expect(html).to.not.contain(errors[3])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
            expect(html).to.not.contain(errors[8])
          })

        tester.point(3);
      }));

      it(__('Számla és közlemény hibás (3 pt)'), runner(() => {
        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=name]').set('value', 'q')
        tester.$('form#new-transaction [name=accountNumber]').set('value', 'q')
        tester.$('form#new-transaction [name=text]').set('value', '12345678901234567890123456789012345678901234567890123456789012345')
        tester.$('form#new-transaction [name=value]').set('value', '12')

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Hibaüzenetek ellenőrzése'));
        tester.$('#errors').prop('innerHTML')
          .should('contain', errors[2])
          .should('contain', errors[3])
          .should(html => {
            expect(html).to.not.contain(errors[0])
            expect(html).to.not.contain(errors[1])
            expect(html).to.not.contain(errors[4])
            expect(html).to.not.contain(errors[5])
            expect(html).to.not.contain(errors[6])
            expect(html).to.not.contain(errors[7])
            expect(html).to.not.contain(errors[8])
          })

        tester.point(3);
      }));

      it(__('Az űrlap állapottartó (3 pt)'), runner(() => {
        const name = randomString()
        const accountNumber = ''
        const text = randomString()
        const value = random(1, 10).toString()
        const category = 'Groceries'

        tester.$('form#new-transaction').set('noValidate', true)
        tester.$('form#new-transaction [name=name]').set('value', name)
        tester.$('form#new-transaction [name=accountNumber]').set('value', accountNumber)
        tester.$('form#new-transaction [name=text]').set('value', text)
        tester.$('form#new-transaction [name=value]').set('value', value)
        tester.$('form#new-transaction [name=category]').set('value', category)

        tester.info(__('Kattintás a submit gombra'));
        tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
          expect(page.url()).to.contain('index.php'),
          __('Ugyanaz az oldal jön be')
        )

        tester.info(__('Input mezők értékeinek ellenőrzése'));
        tester.$('form#new-transaction [name=name]').prop('value').should('equal', name)
        tester.$('form#new-transaction [name=accountNumber]').prop('value').should('equal', accountNumber)
        tester.$('form#new-transaction [name=text]').prop('value').should('equal', text)
        tester.$('form#new-transaction [name=value]').prop('value').should('equal', value)
        tester.$('form#new-transaction [name=category]').prop('value').should('equal', category)

        tester.point(3);
      }));
    });

    it(__('Helyes kitöltés (14 pt)'), runner(() => {
      const name = randomString()
      const accountNumber = `${random(10000000, 99999999)}-${random(10000000, 99999999)}-${random(10000000, 99999999)}`
      const text = randomString()
      const value = random(1, 10).toString()
      const category = categoryFixtures[random(0, categoryFixtures.length -1)];

      tester.$('form#new-transaction').set('noValidate', true)
      tester.$('form#new-transaction [name=name]').set('value', name)
      tester.$('form#new-transaction [name=accountNumber]').set('value', accountNumber)
      tester.$('form#new-transaction [name=text]').set('value', text)
      tester.$('form#new-transaction [name=value]').set('value', value)
      tester.$('form#new-transaction [name=category]').set('value', category)

      tester.info(__('Kattintás a submit gombra'));
      tester.$('form#new-transaction [type=submit]').clickWithNavigation().should(() => 
        expect(page.url()).to.contain('index.php'),
        __('Ugyanaz az oldal jön be')
      )
      tester.element('#errors').should('equal', null);
      
      // tester.info(__('Adatok ellenőrzése a tranzakciós listában'));
      // tester.$$('#transactions tr.transaction')
      //   .eval((trs, name, accountNumber, text, value, category) => 
      //     trs.map(tr => ({
      //       id: tr.dataset.id,
      //       html: tr.innerText.replace(/ +/g, ' '),
      //       value: tr.querySelector('td:nth-child(3)').innerText.replace(/ /g, '')
      //     })
      //     ),
      //     name, accountNumber, text, value, category
      //   )
      //   .should(result => console.log(result))
      // tester.point(5);

      tester.info(__('Adatok ellenőrzése a tranzakciós listában'));
      tester.$$('#transactions tr.transaction')
        .eval((trs, name, accountNumber, text, value, category) => 
          trs.some(tr => tr.innerHTML.includes(name) && 
                         tr.innerHTML.includes(accountNumber) && 
                         tr.innerHTML.includes(text) && 
                         tr.querySelector('td:nth-child(3)').innerText.replace(/ /g, '').includes(value)
          ),
          name, accountNumber, text, value, category
        )
        .should('equal', true)
      tester.point(4);

      tester.info(__('Az oldal újratöltése'));
      tester.visit(url + 'index.php')

      tester.info(__('A módosítások így is megjelennek a tranzakciós listában'));
      tester.$$('#transactions tr.transaction')
        .eval((trs, name, accountNumber, text, value, category) => 
          trs.some(tr => tr.innerHTML.includes(name) && 
                         tr.innerHTML.includes(accountNumber) && 
                         tr.innerHTML.includes(text) && 
                         tr.querySelector('td:nth-child(3)').innerText.replace(/ /g, '').includes(value)
          ),
          name, accountNumber, text, value, category
        )
        .should('equal', true)

      tester.point(10);
    }));
    
  });

  (tests.includes(5) ? describe : describe.skip)(__('5. feladat: A minimális és maximális érték szűréséhez használt range sliderek értékének kiírása'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('Mindkét range slider attribútumai jól vannak beállítva (10 pt)'), runner(() => {
      tester.$$('#transactions tr.transaction > td:nth-child(3)').eval(tds => tds.reduce((min, td) => {
        const val = Math.abs(parseInt(td.innerText.replace(/ /g, '')))
        return val < min ? val : min
      }, Number.POSITIVE_INFINITY)).store('min')
      tester.$$('#transactions tr.transaction > td:nth-child(3)').eval(tds => tds.reduce((max, td) => {
        const val = Math.abs(parseInt(td.innerText.replace(/ /g, '')))
        return val > max ? val : max
      }, Number.NEGATIVE_INFINITY)).store('max')

      tester.$('#min-value').prop('min').should('equal', () => tester.vars('min')().toString())
      tester.$('#min-value').prop('max').should('equal', () => tester.vars('max')().toString())
      tester.$('#min-value').prop('value').should('equal', () => tester.vars('min')().toString())
      
      tester.$('#max-value').prop('min').should('equal', () => tester.vars('min')().toString())
      tester.$('#max-value').prop('max').should('equal', () => tester.vars('max')().toString())
      tester.$('#max-value').prop('value').should('equal', () => tester.vars('max')().toString())

      tester.point(10)
    }));

    it(__('Mindkét range slider értéke kiíródik a fölöttük lévő elembe az oldal betöltése után (5 pt)'), runner(() => {
      tester.$("#min-value").prop("value").store('min-value')
      tester.$("#min-value-span").prop("innerText").should('equal', tester.vars('min-value'))

      tester.$("#max-value").prop("value").store('max-value')
      tester.$("#max-value-span").prop("innerText").should('equal', tester.vars('max-value'))

      tester.point(5)
    }));

    it(__('A range slider-eket változtatva az értékük kiíródik a span-ba (5 pt)'), runner(() => {
      let min, max, val1, val2

      tester.$('#min-value').prop('min').should(val => min = parseInt(val))
      tester.$('#min-value').prop('max').should(val => max = parseInt(val))

      tester.runFunction(() => {
        val1 = random(min, max)
        val2 = random(min, max)
      })

      tester.runFunction(() => page.evaluate((val1, val2) => {
        document.querySelector('#min-value').value = val1
        document.querySelector('#min-value').dispatchEvent(new Event('input', {bubbles: true}))
        document.querySelector('#max-value').value = val2
        document.querySelector('#max-value').dispatchEvent(new Event('input', {bubbles: true}))
      }, val1, val2))

      tester.$("#min-value-span").prop("innerText").should('equal', () => val1.toString())
      tester.$("#max-value-span").prop("innerText").should('equal', () => val2.toString())

      tester.point(5)
    }));

  });

  (tests.includes(6) ? describe : describe.skip)(__('6. feladat: A sliderek változtatásával eltüntethetők a sliderek értékein kívül eső tranzakciósorok'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('A range slider értékeit beállítva a megfelelő sorok tűnnek el (15 pt)'), runner(() => {
      const val1 = 1126
      const val2 = 98756

      tester.$(`#min-value`)
        .set('value', val1)
        .dispatch('change', {bubbles: true})
      tester.$(`#max-value`)
        .set('value', val2)
        .dispatch('change', {bubbles: true});

      [3, 6, 7].forEach(i => {
        tester.$(`#transactions tr.transaction[data-id="${i}"]:not(.hidden)`)
      });
      [1, 2, 4].forEach(i => {
        tester.$(`#transactions tr.transaction[data-id="${i}"].hidden`)
      })

      tester.point(15)
    }));

  });

  (tests.includes(7) ? describe : describe.skip)(__('7. feladat: A szűrőknél a kategória választásával az adott kategóriájú tranzakciók megjelölődnek'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('A kategóriaszűrő megfelelő elemeket tartalmaz (1 pt)'), runner(() => {
      tester.$('select#category')
      tester.$$('#category option').eval(opts => Array.from(opts).map(o => o.text.trim())).should(opts => {
        expect(opts.sort().join(',')).to.equal(['', ...categoryFixtures].sort().join(','))
      })
      tester.$('#category').prop('value').should('equal', '')
      tester.point(1)
    }));

    [
      {category: '', ids: []},
      {category: 'Other', ids: [1]},
      {category: 'Restaurants', ids: [2]},
      {category: 'Transfers', ids: [3, 4]},
      {category: 'Groceries', ids: []},
    ].forEach(e => 
      it(__('Kategóriát választva (%s) a megfelelő elemek jelölődnek ki (3 pt)', e.category), runner(() => {
        tester.$(`#category`)
          .set('value', e.category)
          .dispatch('change', {bubbles: true});

        [1, 2, 3, 4].filter(i => !e.ids.includes(i)).forEach(i => {
          tester.$(`#transactions tr.transaction[data-id="${i}"]:not(.marked)`)
        });
        e.ids.forEach(i => {
          tester.$(`#transactions tr.transaction[data-id="${i}"].marked`)
        })

        tester.point(3)
      })));

  });

  (tests.includes(8) ? describe : describe.skip)(__('8. feladat: Tranzakció részleteinek megtekintése'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('A More gombra kattintva további mezők jelennek meg, illetve tűnnek el (9 pt)'), runner(() => {
      let hidden
      for (let i = 0; i<10; i++) {
        let id = [1, 2, 3, 4, 6, 7][random(0, 5)];
        tester.$(`#transactions tr.transaction[data-id="${id}"] button.more-button`).eval(btn => btn.previousElementSibling.classList.contains('hidden')).should(val => hidden = val)
        tester.$(`#transactions tr.transaction[data-id="${id}"] button.more-button`).click()
        tester.$(`#transactions tr.transaction[data-id="${id}"] button.more-button`).eval(btn => btn.previousElementSibling.classList.contains('hidden')).should(val => expect(val).to.equal(!hidden))
      }
      tester.point(9)
    }));

  });

  (tests.includes(9) ? describe : describe.skip)(__('9. feladat: Tranzakcióhoz kategória rendelése AJAX-szal'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('Kategóriát módosítva egy tranzakciónál AJAX-szal mentésre kerül az új érték (25 pt)'), runner(() => {
      for (let i = 0; i < 3; i++) {
        [6, 7].forEach(id => {
          const category = categoryFixtures[random(0, categoryFixtures.length - 1)]
          tester.$(`#transactions tr.transaction[data-id="${id}"] form select`).set('value', category).dispatch('change', {bubbles: true})
          
          tester.waitForResponse()
          tester.isAjax()
          tester.point(10);
          
          tester.info(__('POST kérés volt?'));
          tester.runFunction(() => expect(tester.globalResponse.request().method()).to.equal('POST'));
          tester.point(10);
          
          tester.info(__("Oldalt újratöltve a mentett adat jelenik meg a tranzakciónál"))
          tester.visit(url + 'index.php')
          tester.$(`#transactions tr.transaction[data-id="${id}"] form select`).prop('value').should('equal', category)
    
          tester.point(4);
        })
      }
      tester.point(1);
    }));
    
  });

  (tests.includes(10) ? describe : describe.skip)(__('10. feladat: HUF egyenleg konvertálása EUR-ba AJAX-szal'), () => {

    before(async function () {
      tester.visit(url + 'index.php')
      await tester.run()
    });

    it(__('Kategóriát módosítva egy tranzakciónál AJAX-szal mentésre kerül az új érték (10 pt)'), runner(() => {
      let huf, json, eur

      tester.$('#balance-in-huf').prop('innerText').should(text => huf = parseInt(text.trim().replace(/ /g, '')))

      for (let i = 0; i < 3; i++) {
        tester.$('#convert').click()
        
        tester.waitForResponse()
        tester.isAjax()
        tester.point(10);
        
        tester.info(__('GET kérés volt?'));
        tester.runFunction(() => expect(tester.globalResponse.request().method()).to.equal('GET'));
        tester.point(10);
        
        tester.info(__('Válaszban: rate'));
        tester.runFunction(async () => {
          json = await tester.globalResponse.json()
          expect(json).to.have.property('rate');
          eur = huf / json.rate
        });
        tester.$('#balance-in-eur').prop('innerText').should(text => expect(parseFloat(text)).to.be.closeTo(eur, 1.0))
        tester.point(3);
      }
      tester.point(1);

    }));
    
  });
})