import type grapesjs from 'grapesjs';
import loadComponents from './components';

export type PluginOptions = {
  /**
   * The ID used to create the block and component
   * @default 'countdown'
   */
  id?: string;

  /**
   * The label used for the block and the component.
   * @default 'Countdown'
   */
  label?: string,

  /**
   * Object to extend the default block. Pass a falsy value to avoid adding the block.
   * @example
   * { label: 'Countdown', category: 'Extra', ... }
   */
  block?: Partial<grapesjs.BlockOptions>;

  /**
   * Object to extend the default tooltip block. Pass a falsy value to avoid adding the block.
   * @example
   * { label: 'Tooltip', category: 'Extra', ... }
   */
  blockTooltip?: Partial<grapesjs.BlockOptions>;

  /**
   * Object to extend the default tooltip properties.
   * @example
   * { name: 'Tooltip', droppable: false, ... }
   */
  propsTooltip?: grapesjs.ComponentDefinition;

  /**
   * A function which allows to extend default traits by receiving the original array and returning a new one.
   */
  extendTraits?: (traits: TraitsOptions) => TraitsOptions,

  /**
   * Tooltip attribute prefix.
   * @default 'data-tooltip'
   */
  attrTooltip?: string,

  /**
   * Tooltip class prefix.
   * @default 'tooltip-component'
   */
  classTooltip?: string,

  /**
   * Custom CSS styles for the tooltip component, this will replace the default one.
   * @default 'tooltip-component'
   */
  style?: string,

  /**
   * Additional CSS styles for the tooltip component.
   * @default 'tooltip-component'
   */
  styleAdditional?: string,

  /**
   * Make all tooltip relative classes private.
   * @default true
   */
  privateClasses?: boolean,

  /**
   * Indicate if the tooltip can be styled.
   * You can pass an array of which proprties can be styled.
   * @example ['color', 'background-color']
   */
  stylableTooltip?: string[] | boolean,

  /**
   * If true, force the tooltip to be shown when the default "Style tooltip" trait button is clicked.
   * @default true
   */
  showTooltipOnStyle?: boolean,
};

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts = {}) => {
  const options: PluginOptions = {
    id: 'countdown',
    label: 'Countdown',
    block: {},

    // Default style
    defaultStyle: true,

    // Default start time, eg. '2018-01-25 00:00'
    startTime: '',

    // Text to show when the countdown is ended
    endText: 'EXPIRED',

    // Date input type, eg, 'date', 'datetime-local'
    dateInputType: 'date',

    // Countdown class prefix
    countdownClsPfx: 'countdown',

    // Countdown label
    labelCountdown: 'Countdown',

    // Days label text used in component
    labelDays: 'days',

    // Hours label text used in component
    labelHours: 'hours',

    // Minutes label text used in component
    labelMinutes: 'minutes',

    // Seconds label text used in component
    labelSeconds: 'seconds',
    ...opts,
  };

  const { block } = options;
  const id = options.id!;
  const label = options.label!;

  // Create block
  if (block) {
    editor.BlockManager.add(id, {
      media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z" />
      </svg>`,
      label,
      category: 'Extra',
      select: true,
      content: { type: id },
      ...block
    });
  }

  /**
const pfx = c.countdownClsPfx;
`<style>
    .${pfx} {
      text-align: center;
      font-family: Helvetica, serif;
    }

    .${pfx}-block {
      display: inline-block;
      margin: 0 10px;
      padding: 10px;
    }

    .${pfx}-digit {
      font-size: 5rem;
    }

    .${pfx}-endtext {
      font-size: 5rem;
    }

    .${pfx}-cont,
    .${pfx}-block {
      display: inline-block;
    }
  </style>`
   */

  // Add components
  loadComponents(editor, options);
};

export default plugin;