import assert from 'assert'
import {Barman} from '../src/barmen'
import {Client} from '../src/client'


suite('Stub: when client ask 200 grams of whisky', function () {
    var client = new Client;
    var drinkName = 'whisky';
    setup(function () {
        client.sober();
    });
    suite('barman has enough', function () {
        let curpBoardStub = {
            hasDrink: function () {
                return true;
            },
            getDrink: function (drinkName, volume) {
                return 200;
            }
        }

        let barman = new Barman(curpBoardStub);
        test('barman pour 200 gramm whisky', function () {
            var clientAskVolume = 200;

            var volumeInGlass = barman.pour(drinkName, clientAskVolume, client);

            assert.equal(clientAskVolume, volumeInGlass);
        })

    });

    suite('no whisky in bar', function () {

    });


    teardown(function () {
        console.log('teardown');
    })
});