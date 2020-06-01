/**
 *
 * @param {string|HTMLElement} el - Selector to nav menu.
 * @param {{
 *  sectionSelector: string;
 *  targetSelector: string;
 *  offset: number;
 *  hrefAttribute: string;
 *  activeClass: string;
 * }} options - Options
 */
module.exports = function (el, options = {}) {
    const ScrollSpy = require('./ScrollSpy');
    const scrollSpy = new ScrollSpy(el, options);

    window.onload = function () {
        scrollSpy.onScroll();
    };
    window.addEventListener('scroll', () => {
        scrollSpy.onScroll();
    });

    return scrollSpy;
};
