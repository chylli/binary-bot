import './trade/trade';
import './trade/barrierOffset';
import markets from './trade/markets';
import tradeTypes from './trade/tradeTypes';
import './tools/balance';
import './tools/notify';
import './tools/total_profit';
import './tools/total_runs';
import './strategy/check_direction';
import './strategy/direction';
import './strategy/purchase';
import './strategy/ask_price';
import './strategy/payout';
import './strategy/strategy';
import './strategy/tick';
import './strategy/ticks';
import './strategy/ohlc';
import './strategy/readOhlcObj.js';
import './during_purchase';
import './finish/result';
import './finish/check_result';
import './finish/details';
import './finish/finish';
import './finish/read_details';
import './finish/trade_again';

export default () => {
	markets();
	tradeTypes();
};
