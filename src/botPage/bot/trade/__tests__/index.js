require('babel-register')({
	  sourceMaps: true

});
/* eslint-disable import/no-extraneous-dependencies */
import CustomApi from 'binary-common-utils/lib/customApi';
import { expect } from 'chai';
import { observer } from 'binary-common-utils/lib/observer';
import Trade from '../index';
import WebSocket from '../../../../common/mock/websocket';

describe('TickTrade', () => {
  let api;
  let ticktrade;
  let proposal;
  let finishedContract;
  before(() => {
    api = new CustomApi(WebSocket);
    ticktrade = new Trade(api);
  });
  describe('Purchasing...', () => {
    let purchasedContract;
    before(async function () {
      api.authorize('nmjKBPWxM00E8Fh');
      await observer.register('api.authorize');
      api.proposal({
        amount: '1.00',
        basis: 'stake',
        contract_type: 'DIGITODD',
        currency: 'USD',
        duration: 5,
        duration_unit: 't',
        symbol: 'R_100',
      });
      proposal = (await observer.register('api.proposal')).data;
			ticktrade.purchase(proposal);
			purchasedContract = (await observer.register('api.buy')).data;
    });
    it('Purchased the proposal successfuly', () => {
      expect(purchasedContract).to.have.property('longcode')
        .that.is.equal('Win payout if the last digit of Volatility 100 Index is odd after 5 ticks.');
    });
  });
  describe('Getting updates', () => {
    let contractUpdates = [];
    before(async function() {
			/*
			finishedContract = (await observer.register('trade.finish')).data;
      observer.register('trade.update', (contractUpdate) => {
        contractUpdates.push(contractUpdate);
        if (contractUpdates.slice(-1)[0].is_sold) {
          done();
        }
      });
			*/
    });
    it('Emits the update signal', () => {
      observer.unregisterAll('trade.update');
    });
  });
  describe('Calling finish', () => {
    it('Emits the finish signal', () => {
      expect(finishedContract).to.have.property('sell_price')
        .that.satisfy((el) => !isNaN(el)
      );
    });
  });
});
