/* eslint-disable import/no-extraneous-dependencies */
import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai';
import Observer from 'binary-common-utils/lib/observer';
import { asyncChain } from 'binary-common-utils/lib/tools';
import WebSocket from '../../../common/mock/websocket';
import Bot from '../index';

describe('Bot', () => {
  let observer;
  let option = {
    amount: '1.00',
    basis: 'stake',
    condition: 'EVENODD',
    currency: 'USD',
    duration: 5,
    duration_unit: 't',
    symbol: 'R_100',
  };

  let api;
  let bot;
  let token = 'nmjKBPWxM00E8Fh';
  before((done) => {
    observer = new Observer();
    api = new CustomApi(WebSocket);
    bot = new Bot(api);
    bot.initPromise.then(() => {
      done();
    });
  });
  it('initialize bot with the symbols', () => {
    let markets = bot.symbol.activeSymbols.getMarkets();
    expect(markets).to.be.an('Object')
      .and.to.have.property('forex');
  });
  describe('Bot cannot initialize with a fake token', () => {
    let error;
    before((done) => {
      observer.register('api.error', (_error) => {
        error = _error;
        done();
      }, true);
      bot.start('FakeToken', null, null, null);
    });
    it('fake token should cause an error', () => {
      expect(error).to.have.deep.property('.code')
        .this.is.equal('InvalidToken');
    });
  });
  describe('Start trading', () => {
    before((done) => {
      observer.register('bot.waiting_for_purchase', () => {
        done();
      }, true);
      observer.register('bot.stop', () => {
        bot.start(token, option, null, null);
      }, true);
      bot.stop();
    });
    it('start bot with the token, option', () => {
    });
  });
  describe('Start the trade without real finish and strategy functions', () => {
    before((done) => {
      asyncChain()
        .pipe((chainDone) => {
          observer.register('bot.stop', () => {
            chainDone();
          }, true);
          bot.stop();
        })
        .pipe(() => {
          api.destroy();
          api = new CustomApi(WebSocket);
          bot = new Bot(api);
          bot.initPromise.then(() => {
            done();
          });
        })
        .pipe((chainDone) => {
          observer.register('bot.waiting_for_purchase', () => {
            chainDone();
          }, true);
          bot.start(token, option, null, null);
        })
        .pipe(() => {
          done();
        })
        .exec();
    });
    it('It is possible to restart the trade', () => {
    });
  });
  describe('Start the trade with real finish and strategy functions', () => {
    let finishedContractFromFinishFunction;
    let finishedContractFromFinishSignal;
    let numOfTicks = 0;
    before((done) => {
      asyncChain()
        .pipe((chainDone) => {
          observer.register('bot.stop', () => {
            chainDone();
          }, true);
          bot.stop();
        })
        .pipe(() => {
          api.destroy();
          api = new CustomApi(WebSocket);
          bot = new Bot(api);
          bot.initPromise.then(() => {
            done();
          });
        })
        .pipe((chainDone) => {
          observer.register('bot.finish', (_finishedContractFromFinishSignal) => {
            finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
            chainDone();
          }, true);
          bot.start(token, option, (tick, proposals, _strategyCtrl) => {
            if (++numOfTicks === 3) {
              _strategyCtrl.purchase('DIGITEVEN');
            }
          }, (_finishedContract) => {
            finishedContractFromFinishFunction = _finishedContract;
          });
        })
        .pipe(() => {
          done();
        })
        .exec();
    });
    it('Strategy decides to purchase the trade', () => {
    });
    it('Calls the finish function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
    });
  });
  describe('Trade again', () => {
    let finishedContractFromFinishFunction;
    let finishedContractFromFinishSignal;
    let numOfTicks = 0;
    before((done) => {
      bot.start(token, option, (tick, proposals, _strategyCtrl) => {
        if (++numOfTicks === 3) {
          _strategyCtrl.purchase('DIGITEVEN');
        }
      }, (_finishedContract) => {
        finishedContractFromFinishFunction = _finishedContract;
      });
      asyncChain()
        .pipe((chainDone) => {
          observer.register('bot.stop', (_finishedContractFromFinishSignal) => {
            finishedContractFromFinishSignal = _finishedContractFromFinishSignal;
            chainDone();
          }, true);
          bot.stop();
        })
        .pipe(() => {
          done();
        })
        .exec();
    });
    it('Strategy decides to purchase the trade', () => {
    });
    it('Calls the finish function when trade is finished', () => {
      expect(finishedContractFromFinishSignal).to.be.equal(finishedContractFromFinishFunction);
    });
  });
});
