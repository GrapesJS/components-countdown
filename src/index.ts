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
   * Object to extend the default component properties.
   * @example
   * { name: 'Countdown', droppable: false, ... }
   */
  props?: grapesjs.ComponentDefinition;

  /**
   * Custom CSS styles for the component. This will replace the default one.
   * @default ''
   */
   style?: string,

  /**
   * Additional CSS styles for the component. These will be appended to the default one.
   * @default 'tooltip-component'
   */
  styleAdditional?: string,

  /**
   * Default start time.
   * @default ''
   * @example '2018-01-25 00:00'
   */
  startTime?: string,

  /**
   * Text to show when the countdown is ended.
   * @default 'EXPIRED'
   */
  endText?: string,

  /**
   * Date input type, eg. `date`, `datetime-local`
   * @default 'date'
   */
  dateInputType?: string,

  /**
   * Days label text used in component.
   * @default 'days'
   */
  labelDays?: string,

  /**
   * Hours label text used in component.
   * @default 'hours'
   */
  labelHours?: string,

  /**
   * Minutes label text used in component.
   * @default 'minutes'
   */
  labelMinutes?: string,

  /**
   * Seconds label text used in component.
   * @default 'seconds'
   */
  labelSeconds?: string,

  /**
   * Countdown component class prefix.
   * @default 'countdown'
   */
  classPrefix?: string,
};

const plugin: grapesjs.Plugin<PluginOptions> = (editor, opts = {}) => {
  const options: PluginOptions = {
    id: 'countdown',
    label: 'Countdown',
    block: {},
    props: {},
    style: '',
    styleAdditional: '',
    startTime: '',
    endText: 'EXPIRED',
    dateInputType: 'date',
    labelDays: 'days',
    labelHours: 'hours',
    labelMinutes: 'minutes',
    labelSeconds: 'seconds',
    classPrefix: 'countdown',
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