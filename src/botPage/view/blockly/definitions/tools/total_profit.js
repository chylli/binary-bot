// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3bwqd4
import { translator } from '../../../../../common/translator';

Blockly.Blocks.total_profit = {
  init: function() {
    this.appendDummyInput()
        .appendField(translator.translateText('Total Profit'));
    this.setOutput(true, 'Number');
    this.setColour('#dedede');
    this.setTooltip(translator.translateText('Returns the total profit'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
