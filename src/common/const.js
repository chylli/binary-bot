import { translator } from './translator';

export default {
  lists: {
    PAYOUTTYPE: [
      [translator.translateText('Payout'), 'payout'],
      [translator.translateText('Stake'), 'stake'],
    ],
    CURRENCY: [
      ['USD', 'USD'],
      ['EUR', 'EUR'],
      ['GBP', 'GBP'],
      ['AUD', 'AUD'],
    ],
    DETAILS: [
      [translator.translateText('statement'), '1'],
      [translator.translateText('ask price'), '2'],
      [translator.translateText('payout'), '3'],
      [translator.translateText('profit'), '4'],
      [translator.translateText('contract type'), '5'],
      [translator.translateText('entry spot'), '6'],
      [translator.translateText('entry value'), '7'],
      [translator.translateText('exit spot'), '8'],
      [translator.translateText('exit value'), '9'],
      [translator.translateText('barrier'), '10'],
      [translator.translateText('result'), '11'],
    ],
    CHECK_RESULT: [
      [translator.translateText('Win'), 'win'],
      [translator.translateText('Loss'), 'loss'],
    ],
    CHECK_DIRECTION: [
      [translator.translateText('Rise'), 'rise'],
      [translator.translateText('Fall'), 'fall'],
      [translator.translateText('No Change'), ''],
    ],
  },

  opposites: {
    RISEFALL: [{
      CALL: translator.translateText('Rise'),
    }, {
      PUT: translator.translateText('Fall'),
    }],
    HIGHERLOWER: [{
      CALL: translator.translateText('Higher'),
    }, {
      PUT: translator.translateText('Lower'),
    }],
    TOUCHNOTOUCH: [{
      ONETOUCH: translator.translateText('Touch'),
    }, {
      NOTOUCH: translator.translateText('No Touch'),
    }],
    ENDSINOUT: [{
      EXPIRYMISS: translator.translateText('Ends In'),
    }, {
      EXPIRYRANGE: translator.translateText('Ends Out'),
    }],
    STAYSINOUT: [{
      RANGE: translator.translateText('Stays In'),
    }, {
      UPORDOWN: translator.translateText('Goes Out'),
    }],
    ASIANS: [{
      ASIANU: translator.translateText('Asian Up'),
    }, {
      ASIAND: translator.translateText('Asian Down'),
    }],
    MATCHESDIFFERS: [{
      DIGITMATCH: translator.translateText('Matches'),
    }, {
      DIGITDIFF: translator.translateText('Differs'),
    }],
    EVENODD: [{
      DIGITEVEN: translator.translateText('Even'),
    }, {
      DIGITODD: translator.translateText('Odd'),
    }],
    OVERUNDER: [{
      DIGITOVER: translator.translateText('Over'),
    }, {
      DIGITUNDER: translator.translateText('Under'),
    }],
  },
  barrierTypes: [
    ['+', '+'],
    ['-', '-'],
  ],
  durationTypes: {
    RISEFALL: [
      [translator.translateText('Ticks'), 't'],
      [translator.translateText('Seconds'), 's'],
      [translator.translateText('Minutes'), 'm'],
      [translator.translateText('Hours'), 'h'],
    ],
    HIGHERLOWER: [
      [translator.translateText('Ticks'), 't'],
      [translator.translateText('Seconds'), 's'],
      [translator.translateText('Minutes'), 'm'],
      [translator.translateText('Hours'), 'h'],
    ],
    TOUCHNOTOUCH: [
      [translator.translateText('Minutes'), 'm'],
      [translator.translateText('Hours'), 'h'],
    ],
    ENDSINOUT: [
      [translator.translateText('Minutes'), 'm'],
      [translator.translateText('Hours'), 'h'],
    ],
    STAYSINOUT: [
      [translator.translateText('Minutes'), 'm'],
      [translator.translateText('Hours'), 'h'],
    ],
    ASIANS: [
      [translator.translateText('Ticks'), 't'],
    ],
    MATCHESDIFFERS: [
      [translator.translateText('Ticks'), 't'],
    ],
    EVENODD: [
      [translator.translateText('Ticks'), 't'],
    ],
    OVERUNDER: [
      [translator.translateText('Ticks'), 't'],
    ],
  },
  hasPrediction: [
    'MATCHESDIFFERS',
    'OVERUNDER',
  ],
  hasBarrierOffset: [
    'HIGHERLOWER',
    'TOUCHNOTOUCH',
  ],
  hasSecondBarrierOffset: [
    'ENDSINOUT',
    'STAYSINOUT',
  ],
  conditionsCategory: {
    callput: ['risefall', 'higherlower'],
    touchnotouch: ['touchnotouch'],
    endsinout: ['endsinout'],
    staysinout: ['staysinout'],
    asian: ['asians'],
    digits: ['matchesdiffers', 'evenodd', 'overunder'],
  },
  conditionsCategoryName: {
    callput: translator.translateText('Up/Down'),
    asian: translator.translateText('Asians'),
    digits: translator.translateText('Digits'),
    touchnotouch: translator.translateText('Touch/No Touch'),
    endsinout: translator.translateText('Ends In/Out'),
    staysinout: translator.translateText('Stays In/Goes Out'),
  },
	conditions: ['risefall', 'higherlower', 'touchnotouch',
		'endsinout', 'staysinout', 'asians', 'matchesdiffers', 'evenodd', 'overunder'],
};
