class ScrollSpy {
    /**
     * Initialises a new {@code ScrollSpy} instance.
     *
     * @param {string|HTMLElement} menu - Selector to nav menu.
     * @param {{
     *  sectionSelector?: string;
     *  targetSelector?: string;
     *  offset?: number;
     *  hrefAttribute?: string;
     *  activeClass?: string;
     *  onActivate?: (menuItem: HTMLAnchorElement) => void;
     * }} options - Options
     */
    constructor(menu = '#navMain', options = {}) {
        if (!menu) {
            throw new Error('First argument cannot be empty');
        }
        if (!(typeof menu === 'string' || menu instanceof HTMLElement)) {
            throw new TypeError(
                'menu can be either string or an instance of HTMLElement'
            );
        }

        if (typeof options !== 'object') {
            throw new TypeError('options can only be of type object');
        }

        this.menuList =
            menu instanceof HTMLElement ? menu : document.querySelector(menu);
        this.options = {
            sectionSelector: options.sectionSelector || 'section',
            targetSelector: options.targetSelector || 'a',
            offset: options.offset || 0,
            hrefAttribute: options.hrefAttribute || 'href',
            activeClass: options.activeClass.trim().split(' ') || ['active'],
            onActivate: options.onActivate || null,
        };
        this.sections = document.querySelectorAll(this.options.sectionSelector);
    }

    /**
     * Handles scroll by finding the section
     * and setting the active class name.
     *
     * @returns {void}
     */
    onScroll() {
        const section = this.getCurrentSection();
        const menuItem = this.getCurrentMenuItem(section);

        if (menuItem) {
            this.removeCurrentActive({ ignore: menuItem });
            this.setActive(menuItem, section);
        }
    }

    /**
     * Returns the section where the current
     * scroll position is.
     *
     * @returns {HTMLElement}
     */
    getCurrentSection() {
        for (let i = 0; i < this.sections.length; i++) {
            /**
             * @type {HTMLElement}
             */
            const section = this.sections[i];
            const startAt = section.offsetTop;
            const endAt = startAt + section.offsetHeight;
            const currentPosition =
                (document.documentElement.scrollTop ||
                    document.body.scrollTop) + this.options.offset;
            const isInView =
                currentPosition >= startAt && currentPosition < endAt;
            if (isInView) {
                return section;
            }
        }
    }

    /**
     * Returns the menu item to which the
     * current scroll position is pointing to.
     *
     * @param {HTMLElement} section - The current section
     * @returns {HTMLAnchorElement}
     */
    getCurrentMenuItem(section) {
        if (!section) {
            return;
        }

        const sectionId = section.getAttribute('id');
        return this.menuList.querySelector(
            `[${this.options.hrefAttribute}="#${sectionId}"]`
        );
    }

    /**
     * Adds active class to the passed element.
     *
     * @param {HTMLAnchorElement} menuItem - Menu item of current section.
     * @param {HTMLElement} section - The current section
     * @returns {void}
     */
    setActive(menuItem, section) {
        const isActive = this.options.activeClass.every((value) =>
            menuItem.classList.contains(value)
        );
        if (!isActive) {
            menuItem.classList.add(...this.options.activeClass);
            if (this.options.onActivate) {
                this.options.onActivate(section, menuItem);
            }
        }
    }

    /**
     * Removes active class from all nav links
     * except the specified ignore element.
     *
     * @param {{
     *  ignore: HTMLAnchorElement
     * }} options
     * @returns {void}
     */
    removeCurrentActive(options = { ignore: null }) {
        const { hrefAttribute, targetSelector } = this.options;
        const menuItems = this.menuList.querySelectorAll(
            `${targetSelector}:not([${hrefAttribute}="${options.ignore.getAttribute(
                hrefAttribute
            )}"])`
        );

        menuItems.forEach((item) =>
            item.classList.remove(...this.options.activeClass)
        );
    }
}

module.exports = ScrollSpy;
