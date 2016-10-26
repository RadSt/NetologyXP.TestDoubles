import assert from 'assert'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'


suite('Stub: when client ask 200 grams of whisky', function () {
    const askedVolume = 200;
    const drinkName = 'whisky';
    var client = new Client;
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

            var volumeInGlass = barman.pour(drinkName, askedVolume, client);

            assert.equal(askedVolume, volumeInGlass);
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

