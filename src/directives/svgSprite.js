import sprite from '@/assets/img/svg/sprite.svg'

/**
 * @param
 *      hash: symbol id from sprite
 *      width: width icon
 *      height: height icon
 * @usage: <svg v-sprite="{hash: 'gearIcon', width: '14px', height: '14px'}"></svg>
 */
export default {
    created(el, binding) {
        const { value } = binding
        const { hash, width, height } = value

        el.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        el.setAttribute('width', width)
        el.setAttribute('height', height)
        el.setAttribute('aria-hidden', 'true')

        el.innerHTML = `<use xlink:href="${ sprite }#${ hash }"/>`
    }
}