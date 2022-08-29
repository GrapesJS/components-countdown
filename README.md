# GrapesJS Countdown

Simple countdown component for GrapesJS Editor

<p align="center"><img src="https://artf.github.io/grapesjs/img/countdown.gif" alt="GrapesJS" align="center"/></p>
<br/>

# [Demo](http://grapesjs.com/demo.html)





## Summary

* Plugin name: `grapesjs-component-countdown`
* Components: `countdown`
* Blocks: `countdown`


* Switched the plugin name from `gjs-component-countdown` to `grapesjs-component-countdown`
* Added `id`
* Removed `blocks` and `labelCountdownCategory` options in favor of `block`.
* Removed `defaultStyle` options in favor of `style`.
* Removed `labelCountdown` options in favor of `label`.
* Removed `countdownClsPfx` options in favor of `classPrefix`.


## Options

| Option | Description | Default |
|-|-|-
| `id` | The ID used to create the block and component. | `countdown` |
| `label` | The label used for the block and the component. | `Countdown` |
| `block` | Object to extend the default block, eg. `{ label: 'Countdown', category: 'Extra', ... }`. Pass a falsy value to avoid adding the block. | `{}` |
| `props` | Object to extend the default component properties., eg. `{ name: 'Countdown', droppable: false, ... }`. | `{}` |
| `style` | Custom CSS styles for the component. This will replace the default one. | `''` |
| `styleAdditional` | Additional CSS styles for the component. These will be appended to the default one. | `''` |
| `startTime` | Default start time, eg. `2030-01-25 00:00`. | `''` |
| `endText` | Text to show when the countdown is ended. | `'EXPIRED'` |
| `dateInputType` | Date input type, eg. `date`, `datetime-local` | `'date'` |
| `labelDays` | Days label text used in component. | `'days'` |
| `labelHours` | Hours label text used in component. | `'hours'` |
| `labelMinutes` | Minutes label text used in component. | `'minutes'` |
| `labelSeconds` | Seconds label text used in component. | `'seconds'` |
| `classPrefix` | Countdown component class prefix. | `'countdown'` |





## Download

* `npm i grapesjs-component-countdown` or `yarn add grapesjs-component-countdown`





## Usage

```html
<link href="path/to/grapes.min.css" rel="stylesheet"/>
<script src="path/to/grapes.min.js"></script>
<script src="path/to/grapesjs-component-countdown.min.js"></script>

<div id="gjs"></div>

<script type="text/javascript">
  var editor = grapesjs.init({
      container : '#gjs',
      plugins: ['gjs-component-countdown'],
      pluginsOpts: {
        'gjs-component-countdown': {/* ...options */}
      }
  });
</script>
```





## Development

Clone the repository

```sh
$ git clone https://github.com/artf/grapesjs-component-countdown.git
$ cd grapesjs-component-countdown
```

Install it

```sh
$ npm i
```

Start the dev server

```sh
$ npm start
```

Build before the commit. This will also increase the patch level version of the package

```sh
$ npm run build
```





## License

BSD 3-Clause
