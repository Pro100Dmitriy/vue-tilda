export default {
    data() {
        return {
            showPageSettings: false,
            imageSelectModalsOpen: false,
            callbackImageSelector: null,
            activeInfo: false
        }
    },

    provide() {
        return {
            openPageSettings: this.openPageSettings,
            closePageSettings: this.closePageSettings,
            beforeSavingPageSettings: this.beforeSavingPageSettings,
            closeAndSavePageSettings: this.closeAndSavePageSettings,

            openImageSelector: this.openImageSelector,
            closeImageSelector: this.closeImageSelector
        }
    },

    methods: {
        openPageSettings( pageId ) {
            this.initialization( pageId )
            this.showPageSettings = true
        },
        closePageSettings() {
            this.showPageSettings = false
            this.activeInfo = false
        },
        beforeSavingPageSettings( dataForSave ) {
            this.processSavingData( dataForSave )
        },
        closeAndSavePageSettings() {
            this.showPageSettings = false
            this.reacquisition()
            this.activeInfo = false
        },

        openImageSelector( callback ) {
            this.callbackImageSelector = callback
            this.imageSelectModalsOpen = true
        },
        closeImageSelector() {
            document.body.style.overflow = 'auto'
            this.callbackImageSelector = null
            this.imageSelectModalsOpen = false
        }
    }
}