import config from '../../../../../common/const';
import { translator } from '../../../../../common/translator';
import { bot } from '../../../../bot';


export function title(block, opposites, optionNames) {
  block.appendDummyInput()
    .setAlign(Blockly.ALIGN_CENTRE)
    .appendField(bot.symbol.getCategoryNameForCondition(opposites));
  block.appendDummyInput()
    .appendField('> ' + optionNames[0] + '/' + optionNames[1]);
}

export function duration(block, opposites) {
  block.appendValueInput('DURATION')
    .setCheck('Number')
    .appendField('Duration:')
    .appendField(new Blockly.FieldDropdown(config.durationTypes[opposites]), 'DURATIONTYPE_LIST');
}

export function payout(block) {
  block.appendValueInput('AMOUNT')
    .setCheck('Number')
    .appendField(translator.translateText('Payout:'))
    .appendField(new Blockly.FieldDropdown(config.lists.PAYOUTTYPE), 'PAYOUTTYPE_LIST');
  block.appendDummyInput()
    .appendField(translator.translateText('Currency:'))
    .appendField(new Blockly.FieldDropdown(config.lists.CURRENCY), 'CURRENCY_LIST');
}

export function barrierOffset(block, opposites, name) {
  if (!name) {
    name = translator.translateText('Barrier Offset:');
  }
  block.appendValueInput('BARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(name);
}

export function secondBarrierOffset(block) {
  block.appendValueInput('SECONDBARRIEROFFSET')
    .setCheck('BarrierOffset')
    .appendField(translator.translateText('Low Barrier Offset:'));
}

export function prediction(block) {
  block.appendValueInput('PREDICTION')
    .setCheck('Number')
    .appendField(translator.translateText('Prediction:'));
}
