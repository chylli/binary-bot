import { observer } from 'binary-common-utils/lib/observer';
import Translator from '../../../common/translator';

export default class Trade {
  constructor(api) {
    this.api = api;
    this.contractIsSold = false;
    this.translator = new Translator();
    this.runningObservations = [];
  }
  recoverFromDisconnect() {
    for (let rObs of this.runningObservations) {
      observer.unregisterAll(...rObs);
    }
    this.runningObservations = [];
    return this.subscribeToOpenContract();
  }
  async purchase(contract) {
    this.api.buy(contract.id, contract.ask_price);
    let apiBuy = (purchasedContract) => {
      observer.emit('ui.log.info', this.translator.translateText('Purchased') + ': ' + contract.longcode);
      observer.emit('trade.purchase', purchasedContract);
      this.contractId = purchasedContract.contract_id;
      this.api.unsubscribeFromAllProposals();
      this.subscribeToOpenContract();
    };
		apiBuy((await observer.register('api.buy')).data);
    apiBuy((await observer.register('api.buy', {
      type: 'buy',
      unregister: [['api.buy', apiBuy], 'trade.purchase'],
    })).data);
    this.runningObservations.push(['api.buy', apiBuy]);
  }
  subscribeToOpenContract() {
    if (!this.contractId) {
      return false;
    }
    this.api.proposal_open_contract(this.contractId);

    let apiProposalOpenContract = function apiProposalOpenContract(contract) {
      // detect changes and decide what to do when proposal is updated
      if (contract.is_expired && contract.is_valid_to_sell && !this.contractIsSold) {
        this.contractIsSold = true;
        this.api.sellExpiredContracts().then(() => {
          this.getTheContractInfoAfterSell();
        }, (error) => {
          observer.emit('api.error', error);
        });
      }
      if (contract.sell_price) {
        observer.emit('trade.finish', contract);
      }
      observer.emit('trade.update', contract);
    };
    return true;
  }
  getTheContractInfoAfterSell() {
    if (this.contractId) {
      this.api.getContractInfo(this.contractId);
    }
  }
}
