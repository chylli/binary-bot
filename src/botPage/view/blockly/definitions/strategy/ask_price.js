// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#pbvgpo
import { utils } from '../../../blockly/utils';
import { insideStrategy } from '../../relationChecker';
import { translator } from '../../../../../common/translator';

Blockly.Blocks.ask_price = {
  init: function() {
    this.appendDummyInput()
      .appendField(translator.translateText('Ask Price'))
      .appendField(new Blockly.FieldDropdown(() => utils.getPurchaseChoices()), 'PURCHASE_LIST');
    this.setOutput(true, 'Number');
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Ask Price for selected proposal'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function(ev) {
    insideStrategy(this, ev, 'Ask Price');
  },
};
