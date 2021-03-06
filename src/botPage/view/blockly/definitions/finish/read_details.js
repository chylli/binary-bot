// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u8i287
import { translator } from '../../../../../common/translator';
import { insideFinish } from '../../relationChecker';
import config from '../../../../../common/const';

Blockly.Blocks.read_details = {
  init: function() {
    this.appendDummyInput()
      .appendField(translator.translateText('Contract Detail:'))
      .appendField(new Blockly.FieldDropdown(config.lists.DETAILS), 'DETAIL_INDEX');
    this.setOutput(true, null);
    this.setColour('#f2f2f2');
    this.setTooltip(translator.translateText('Reads a selected option from contract details list'));
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
  onchange: function(ev) {
    insideFinish(this, ev, 'Read Contract Details');
  },
};
