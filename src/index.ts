import type grapesjs from 'grapesjs';

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
  const pfx = options.classPrefix!;

  // Create block
  if (block) {
    editor.Blocks.add(id, {
      media: `<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 20C16.4 20 20 16.4 20 12S16.4 4 12 4 4 7.6 4 12 7.6 20 12 20M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2M17 11.5V13H11V7H12.5V11.5H17Z" />
      </svg>`,
      label,
      category: 'Extra',
      select: true,
      content: { type: id },
      ...block
    });
  };

  const coundownScript = function(props: any) {
    const startfrom: string = props.startfrom;
    const endTxt: string = props.endText;
    // @ts-ignore
    const el: HTMLElement & { gjs_countdown_interval: NodeJS.Timer } = this;
    const countDownDate = new Date(startfrom).getTime();
    const countdownEl = el.querySelector('[data-js=countdown]') as HTMLElement;
    const endTextEl = el.querySelector('[data-js=countdown-endtext]') as HTMLElement;
    const dayEl = el.querySelector('[data-js=countdown-day]')!;
    const hourEl = el.querySelector('[data-js=countdown-hour]')!;
    const minuteEl = el.querySelector('[data-js=countdown-minute]')!;
    const secondEl = el.querySelector('[data-js=countdown-second]')!;
    const oldInterval = el.gjs_countdown_interval;
    oldInterval && clearInterval(oldInterval);

    const setTimer = function (days: number, hours: number, minutes: number, seconds: number) {
      dayEl.innerHTML = `${days < 10 ? '0' + days : days}`;
      hourEl.innerHTML = `${hours < 10 ? '0' + hours : hours}`;
      minuteEl.innerHTML = `${minutes < 10 ? '0' + minutes : minutes}`;
      secondEl.innerHTML = `${seconds < 10 ? '0' + seconds : seconds}`;
    }

    const moveTimer = function() {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / 86400000);
      const hours = Math.floor((distance % 86400000) / 3600000);
      const minutes = Math.floor((distance % 3600000) / 60000);
      const seconds = Math.floor((distance % 60000) / 1000);

      setTimer(days, hours, minutes, seconds);

      if (distance < 0) {
        clearInterval(el.gjs_countdown_interval);
        endTextEl.innerHTML = endTxt;
        countdownEl.style.display = 'none';
        endTextEl.style.display = '';
      }
    };

    if (countDownDate) {
      el.gjs_countdown_interval = setInterval(moveTimer, 1000);
      endTextEl.style.display = 'none';
      countdownEl.style.display = '';
      moveTimer();
    } else {
      setTimer(0, 0, 0, 0);
    }
  };

  // Create component
  editor.Components.addType(id, {
    model: {
      defaults: {
        startfrom: options.startTime,
        classes: [pfx],
        endText: options.endText,
        droppable: false,
        script: coundownScript,
        'script-props': ['startfrom', 'endText'],
        traits: [{
          label: 'Start',
          name: 'startfrom',
          changeProp: true,
          type: options.dateInputType,
        },{
          label: 'End text',
          name: 'endText',
          changeProp: true,
        }],
        components: `
          <span data-js="countdown" class="${pfx}-cont">
            <div class="${pfx}-block">
              <div data-js="countdown-day" class="${pfx}-digit"></div>
              <div class="${pfx}-label">${options.labelDays}</div>
            </div>
            <div class="${pfx}-block">
              <div data-js="countdown-hour" class="${pfx}-digit"></div>
              <div class="${pfx}-label">${options.labelHours}</div>
            </div>
            <div class="${pfx}-block">
              <div data-js="countdown-minute" class="${pfx}-digit"></div>
              <div class="${pfx}-label">${options.labelMinutes}</div>
            </div>
            <div class="${pfx}-block">
              <div data-js="countdown-second" class="${pfx}-digit"></div>
              <div class="${pfx}-label">${options.labelSeconds}</div>
            </div>
          </span>
          <span data-js="countdown-endtext" class="${pfx}-endtext"></span>
        `,
        styles: `
          .${pfx} {
            text-align: center;
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

          .${pfx}-cont {
            display: inline-block;
          }
        `,
      },
    },
  });
};

export default plugin;