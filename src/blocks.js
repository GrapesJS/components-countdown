import {
  countdownRef
} from './consts';

export default function(editor, opt = {}) {
  const c = opt;
  const bm = editor.BlockManager;
  const pfx = c.countdownClsPfx;
  const style = c.defaultStyle ? `<style>
    .countdown {
      text-align: center;
      font-family: Helvetica, serif;
    }

    .countdown-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }

    .countdown-digit {
      font-size: 5rem;
    }

    .countdown-endtext {
      font-size: 5rem;
    }

    .countdown-cont,
    .countdown-block {
      display: inline-block;
    }
  </style>` : '';

  if (c.blocks.indexOf(countdownRef) >= 0) {
    bm.add(countdownRef, {
      label: c.labelCountdown,
      category: c.labelCountdownCategory,
      attributes: {class:'fa fa-clock-o'},
      content: `
        <div class="${pfx}" data-gjs-type="countdown"></div>
        ${style}
      `
    });
  }
}
