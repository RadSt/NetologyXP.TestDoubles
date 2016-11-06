import assert from 'assert'
import sinon from 'sinon'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'
import {Cupboard} from '../src/cupboard'

suite('Stub: when client ask 200 grams of whisky', function () {
    const askedVolume = 200;
    const drinkName = 'whisky';
    var client = new Client();
    setup(function () {
        client.sober();
    });
    suite('barman has enough', function () {
        let curpBoardStub = {
            hasDrink: function () {
                return true;
            },
            getDrink: function (drinkName, volume) {
                return askedVolume;
            }
        }

        let barman = new Barman(curpBoardStub);
        test('barman pour 200 gram whisky', function () {

            let volumeInGlass = barman.pour(drinkName, askedVolume, client);

            assert.equal(volumeInGlass, askedVolume);
        })


        test('barmen took whisky from cupboard', function () {
            let clientStub = {
                isDrunken: function () {
                    return false;
                }
            };
            let cupboard = new Cupboard();
            let cupboardMock = sinon.mock(cupboard);
            cupboardMock.expects('getDrink')
                .withArgs(drinkName, askedVolume)
                .once()
                .returns(askedVolume);

            let barman = new Barman(cupboard);

            let askedWhisky = barman.pour(drinkName, askedVolume, clientStub);

            cupboardMock.verify();
        });
    });

    suite('drunken client want whisky', function () {
        test('barmen say "Sorry, its enough for you"', function () {
            let curpBoardStub = {
                hasDrink: function () {
                    return true;
                },
                getDrink: function (drinkName, volume) {
                    return askedVolume;
                }
            }
            let clientFake = {
                totalyDrunked: 0,
                drink: function (volume) {
                    this.totalyDrunked += volume;
                },
                isDrunken: function () {
                    return this.totalyDrunked > 150;
                }
            };
            let barman = new Barman(curpBoardStub);
            let fiftyGramWhisky = 50;

            let oneHundredFiftyGramWhisky = 150;
            clientFake.drink(fiftyGramWhisky);
            clientFake.drink(oneHundredFiftyGramWhisky);


            assert.throws(function () {
                barman.pour(drinkName, oneHundredFiftyGramWhisky, clientFake)
            }, /Sorry, its enough for you/);

        })
    });


    suite('no whisky in bar', function () {
        let curpBoardStub = {
            hasDrink: function () {
                return false;
            },
        }

        let barman = new Barman(curpBoardStub);
        test('barmen say no whisky', function () {

            assert.throws(function () {
                barman.pour(drinkName, askedVolume, client)
            }, /Not enough whisky/);

        })
    });
});

