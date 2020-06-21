# @sidsbrmnn/scrollspy

A simple lightweight JavaScript library without jQuery or any other dependencies to handle scroll spying on static webpages.

## Install

1. via NPM

    Install it using npm

    ```bash
    npm install --save @sidsbrmnn/scrollspy
    ```

2. Use the minified script from unpkg.com

    ```html
    <script src="https://unpkg.com/@sidsbrmnn/scrollspy@1.0.4/dist/scrollspy.min.js"></script>
    ```

## Usages

Easy for using, syntax just like this:

```html
scrollSpy(menu, options)
```

This little plugin will add `active` class into your existing menu item when you scroll your page to a matched section by ID.
If you are giving it a try, make sure that you:

1. Added CSS for `active` class in your menu item. Because, this plugin do NOT include CSS.

2. Create your sections.

    Example: `<section id="first-section">...</section>`

3. Added an attribute which is an section ID into your menu items. Default is `href`.

    Example: `"href"="#first-section"`.
    You also replace `href` with the other name by `hrefAttribute` in `options`.

### Arguments

1. The `menu` is query selector to your menu. It is `string` or `HTMLElement` instance.

2. The `options` is optional. It is type of `object` which contains properties below:

| Name               | Type     | Default       | Description                                              |
|--------------------|:---------|:--------------|:---------------------------------------------------------|
| `sectionSelector`  | string   | `section`     | Query selector to your sections                          |
| `targetSelector`   | string   | `a`           | Element will be added active class                       |
| `offset`           | Number   | 0             | Offset number                                            |
| `hrefAttribute`    | string   | `href`        | The menu item's attribute name which contains section ID |
| `activeClass`      | string   | `active`      | Active class name will be added into `targetSelector`    |

### ES6

```js
import scrollSpy from '@sidsbrmnn/scrollspy'

const options = {
    sectionSelector: 'section',  // Query selector to your sections
    targetSelector: '.nav-link', // Query selector to your elements that will be added `active` class
    offset: 100                  // Menu item will active before scroll to a matched section 100px
}

// Initialize
scrollSpy(document.getElementById('navMain'), options)

// Shorter way
scrollSpy('#navMain', options)
```

### Script tag

```html
<script src="/path/to/dist/scrollspy.min.js"></script>
<script>
    window.onload = function () {
        scrollSpy('#navMain', {
            sectionSelector: 'section',
            targetSelector: '.nav-link',
            offset: 100
        });
    }

</script>
```

## Licence

[MIT](LICENSE)
