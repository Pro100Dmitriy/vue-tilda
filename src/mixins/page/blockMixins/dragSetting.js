export default {
    props: {
        show: { type: Boolean, required: true },
        scheme: { type: Object, required: true },
        currentPosition: { type: Number, required: true }
    },

    data() {
        return {
            x: null,
            y: null,
            shiftX: null,
            shiftY: null
        }
    },

    methods: {
        onMouseMove( {clientX, clientY} ) {
            this.x = clientX - this.shiftX
            this.y = clientY - this.shiftY

            this.$refs.dragSetting.style.transform = `translate(${this.x}px,${this.y}px) scale(1)`
        },
        moveDrag( {clientX, clientY} ) {
            this.shiftX = clientX - this.$refs.dragSetting.getBoundingClientRect().left
            this.shiftY = clientY - this.$refs.dragSetting.getBoundingClientRect().top

            this.$refs.dragSetting.style.transition = 'none'
            document.addEventListener('mousemove', this.onMouseMove )
        },
        stopDrag() {
            this.$refs.dragSetting.style.transition = 'all .3s ease'
            document.removeEventListener( 'mousemove', this.onMouseMove )
        },


        openTransition() {
            setTimeout( () => {
                this.$refs.dragSetting.classList.add('drag-setting_open')
            }, 300 )
        },
        closeTransition() {
            this.$refs.dragSetting.style.transform = `translate(${this.x}px,${this.y}px) scale(0)`
            this.$refs.dragSetting.classList.remove('drag-setting_open')
        }
    },

    watch: {
        show( newValue ) {
            if( newValue )
                this.openTransition()
        }
    }
}