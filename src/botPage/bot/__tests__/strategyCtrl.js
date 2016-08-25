/* eslint-disable import/no-extraneous-dependencies */
import { asyncChain } from 'binary-common-utils/lib/tools';
import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai';
import Observer from 'binary-common-utils/lib/observer';
import StrategyCtrl from '../strategyCtrl';
import WebSocket from '../../../common/mock/websocket';

describe('StrategyCtrl', () => {
  let observer;
  let api;
  let proposals = [];
  let firstAttempt = true;
  let strategyCtrl;
  before(() => {
    observer = new Observer();
    api = new CustomApi(WebSocket);
    let strategy = (ticks, rProposal, _strategyCtrl) => {
      if (rProposal) {
        if (firstAttempt) {
          firstAttempt = false;
          observer.emit('test.strategy', {
            ticks,
            proposals: rProposal,
          });
        } else {
          observer.emit('test.purchase');
          _strategyCtrl.purchase('DIGITEVEN');
        }
      } else {
        observer.emit('test.strategy', {
          ticks,
          proposals: rProposal,
        });
      }
    };
    strategyCtrl = new StrategyCtrl(api, strategy);
  });
  describe('Make the strategy ready...', () => {
    before((done) => {
      observer.register('strategy.ready', () => {
        done();
      }, true);
      observer.register('api.proposal', (_proposal) => {
        proposals.push(_proposal);
        strategyCtrl.updateProposal(_proposal);
      });
      asyncChain()
        .pipe((chainDone) => {
          observer.register('api.authorize', () => {
            chainDone();
          }, true);
          api.authorize('nmjKBPWxM00E8Fh');
        })
        .pipe((chainDone) => {
          observer.register('api.proposal', () => {
            chainDone();
          }, true);
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITODD',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          });
        })
        .pipe((chainDone) => {
          observer.register('api.proposal', () => {
            chainDone();
          }, true);
          api.proposal({
            amount: '1.00',
            basis: 'stake',
            contract_type: 'DIGITEVEN',
            currency: 'USD',
            duration: 5,
            duration_unit: 't',
            symbol: 'R_100',
          });
        })
        .exec();
    });
    it('Strategy gets ready when two proposals are available', () => {
    });
  });
  describe('Adding the ticks to the strategy...', () => {
    let strategyArgs;
    before((done) => {
      observer.register('test.strategy', (_strategyArgs) => {
        strategyArgs = _strategyArgs;
        done();
      }, true);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('strategyCtrl passes ticks and send the proposals if ready', () => {
      expect(strategyArgs.ticks.ticks.slice(-1)[0]).to.have.property('epoch');
      expect(strategyArgs).to.have.deep.property('.proposals.DIGITODD.longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
    });
  });
  describe('Waiting for strategy to purchase the contract', () => {
    before((done) => {
      observer.register('test.purchase', () => {
        done();
      }, true);
      strategyCtrl.updateProposal(proposals[1]);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('strategy will buy the proposal whenever decided', () => {
    });
  });
  describe('Waiting for purchase to be finished', () => {
    let finishedContract;
    before((done) => {
      observer.register('strategy.finish', (_finishedContract) => {
        finishedContract = _finishedContract;
        done();
      }, true);
      strategyCtrl.updateTicks({
        ticks: [{
          epoch: 'some time',
          quote: 1,
        }, {
          epoch: 'some time',
          quote: 2,
        }],
      });
    });
    it('finish is called whenever the purchase is finished', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((price) => !isNaN(price));
    });
  });
});
