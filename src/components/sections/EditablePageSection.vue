<template>
  <div class="builder"
       :class="{'builder_open': showBuilder}">
    <div class="builder__wrapper">
      <div class="builder__bg"
           @click="closeBuilder"></div>
      <div class="builder__content">
        <div class="library">
          <div class="library__body">
            <div class="library__hid-scroll">
              <div class="library__header">
                <div class="tittle-block">
                  <h6>Blocks library</h6>
                </div>
                <button class="search-btn">
                  <img :src="searchIcon" alt="Search icon" aria-hidden="true">
                </button>
                <button class="cross-button cross-btn"
                        aria-label="Close library"
                        @click="closeBuilder">
                  Close library
                </button>
              </div>
              <ul class="library__list">
                <li v-for="item of libraryList"
                    :key="item.id"
                    class="library__item"
                    :class="{'library__item_active': activeCategory === item.id}"
                    @click="openBlocksResult(item.id)">
                  <span>{{ item.title }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="library__result"
               :class="{'library__result_open': showBuilderResult}">
            <div class="library__hid-scroll">
              <div class="library__blocks">

                <div v-for="block of blockContent"
                     :key="block.id"
                     class="library__blocks-item"
                     @click="() => addLayout(block.layout)">
                  <img :src="block.prevSrc" alt="Block preview">
                  <span>{{ block.title }}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="construct-page">

    <div v-if="!layoutLoading && !pageInfoLoading && !pageInfoError">
      <PageConstructor :layout="layoutScheme"/>
    </div>

    <div class="error"
         v-else-if="pageInfoError">
      <LottieConstructor :options="lottieErrorOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

    <div class="loader"
         v-else>
      <LottieConstructor :options="lottieLoadingOptions" :width="400" :height="400" @animCreated="handleAnimation"/>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations, mapState} from 'vuex'

import PageConstructor from "@/components/page/PageConstructor"

import searchIcon from '@/assets/img/svg/search.svg'
import * as animationBuildingLottie from "@/assets/img/json/building.json"
import * as animationErrorLottie from "@/assets/img/json/error.json"
import * as animationEmptyLottie from "@/assets/img/json/empty.json"

export default {
  name: "EditablePageSection",

  data() {
    return {
      lottieLoadingOptions: {animationData: animationBuildingLottie},
      lottieErrorOptions: {animationData: animationErrorLottie},
      lottieEmptyOptions: {animationData: animationEmptyLottie},

      searchIcon,
      showBuilder: false,
      showBuilderResult: false,
      showContentSettings: false,
      libraryList: [{id:1, title: 'Wrapper'}, {id:2, title: 'Paragraphs'}, {id:3, title: 'About'}, {id:4, title: 'Headers'}, {id:5, title: 'Images'}, {id:6, title: 'Gallery'}, {id:7, title: 'Crucial phrase'}, {id:8, title: 'Advantages'}, {id:9, title: 'Columns'}, {id:10, title: 'Dividers'}, {id:11, title: 'Menus'}, {id:12, title: 'Links'}, {id:13, title: 'Footers'}, {id:14, title: 'Video'}, {id:15, title: 'Forms'}, {id:16, title: 'Buttons'}, {id:17, title: 'Shop'}, {id:18, title: 'Team'}, {id:19, title: 'Comments'}, {id:20, title: 'Stages'}, {id:21, title: 'Contacts'}, {id:22, title: 'Social'}, {id:23, title: 'Services'}, {id:24, title: 'News'}, {id:25, title: 'Others'}],
      activeCategory: null,

      allBlocks: [
        {
          id: 11,
          catId: 1,
          prevSrc: 'https://assets.tildacdn.com/files/tplicons/tpl_18.png',
          title: 'Wrapper block with image',
          layout: {
            id: 1,
            show: true,
            type: 'Wrapper',
            title: 'Test description',
            description: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"',
            imgSrc: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
          },
        },
        {
          id: 22,
          catId: 2,
          prevSrc: "https://assets.tildacdn.com/files/tplicons/tpl_106.png",
          title: "Paragraph block",
          layout: {
            id: 1,
            show: true,
            type: "Paragraph",
            title: "Test description",
            description: "\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\""
          }
        }
      ],
      blockContent: [],

      layoutLoading: false,
      layoutChanged: false,
      activePosition: null,
      layoutScheme: []
    }
  },

  provide() {
    return {
      openBuilder: this.openBuilder,
      deleteLayout: this.deleteLayout,
      changePositionLayout: this.changePositionLayout,
      copyLayout: this.copyLayout,
      visibilityLayout: this.visibilityLayout,
      saveNewContent: this.saveNewContent
    }
  },

  components: {
    PageConstructor
  },

  methods: {
    ...mapActions( {
      saveLayout: 'editPage/saveLayout'
    } ),
    ...mapMutations( {
      layoutEdited: 'editPage/layoutEdited'
    } ),
    handleAnimation( anim ) {
      this.anim = anim
    },
    openBuilder( positionIndex ) {
      this.activePosition = positionIndex
      this.showBuilder = true
    },
    closeBuilder() {
      this.showBuilder = false
      this.showBuilderResult = false
      setTimeout( () => {
        this.activeCategory = null
        this.blockContent = []
      }, 300 )
    },
    openBlocksResult(catId) {
      this.activeCategory = catId
      this.blockContent = this.allBlocks.filter( block => block.catId === this.activeCategory )
      this.showBuilderResult = true
    },
    addLayout( layout ) {
      let before = this.layoutScheme.slice(0, this.activePosition + 1)
      let after = this.layoutScheme.slice(this.activePosition + 1)

      this.layoutScheme = [
        ...before,
        layout,
        ...after
      ]

      this.layoutChanged = true
      this.closeBuilder()
    },
    deleteLayout( currentPosition ) {
      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        ...after
      ]

      this.layoutChanged = true
    },
    changePositionLayout( direction, currentPosition ) {
      if( this.layoutScheme.length <= 1 )
        return

      const beforeElement = this.layoutScheme[currentPosition - 1]
      const moveElement = this.layoutScheme[currentPosition]
      const afterElement = this.layoutScheme[currentPosition + 1]
      let before, after, newLayout

      switch (direction) {
        case 'up':
          if( !beforeElement )
            break

          before = this.layoutScheme.slice(0, currentPosition - 1)
          after = this.layoutScheme.slice(currentPosition + 1)
          newLayout = [
              ...before,
              moveElement,
              beforeElement,
              ...after
          ]
          break
        case 'down':
          if( !afterElement )
            break

          before = this.layoutScheme.slice(0, currentPosition)
          after = this.layoutScheme.slice(currentPosition + 2)
          newLayout = [
            ...before,
            afterElement,
            moveElement,
            ...after
          ]
          break
      }

      this.layoutScheme = newLayout ? newLayout : this.layoutScheme
      this.layoutChanged = true
    },
    copyLayout( currentPosition ) {
      const copyElement = this.layoutScheme[currentPosition]
      let before = this.layoutScheme.slice(0, currentPosition + 1)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        copyElement,
        ...after
      ]

      this.layoutChanged = true
    },
    visibilityLayout( currentPosition ) {
      const visibilityElement = { ...this.layoutScheme[currentPosition] }
      visibilityElement.show = !visibilityElement.show

      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        visibilityElement,
        ...after
      ]

      this.layoutChanged = true
    },
    saveNewContent( newContent, currentPosition ) {
      const editableElement = { ...this.layoutScheme[currentPosition] }
      const newElement = {
        ...editableElement,
        ...newContent
      }

      let before = this.layoutScheme.slice(0, currentPosition)
      let after = this.layoutScheme.slice(currentPosition + 1)

      this.layoutScheme = [
        ...before,
        newElement,
        ...after
      ]

      this.layoutChanged = true
    }
  },

  computed: {
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      pageInfoLoading: state => state.editPage.pageInfoLoading,
      pageInfoError: state => state.editPage.pageInfoError,
      layoutIsSaved: state => state.editPage.layoutIsSaved
    } ),
    ...mapGetters( {
      getLayout: 'editPage/getLayout'
    } ),
  },

  mounted() {
    if ( !this.pageInfoLoading ) {
      if( Number(this.pageInfo.id) === Number(this.$route.params.pageId) ) {
        this.layoutScheme = [
          ...this.getLayout
        ]
      } else {
        this.layoutLoading = true
      }
    } else {
      this.layoutLoading = true
    }
  },

  watch: {
    layoutLoading() {
      if ( !this.pageInfoLoading ) {
        if( Number(this.pageInfo.id) === Number(this.$route.params.pageId) ) {
          this.layoutScheme = [
            ...this.getLayout
          ]
          this.layoutLoading = false
        } else {
          setTimeout( () => {
            this.layoutLoading = !this.layoutLoading
          }, 500 )
        }
      } else {
        setTimeout( () => {
          this.layoutLoading = !this.layoutLoading
        }, 500 )
      }
    },
    async layoutChanged(changed) {
      if( changed ){
        this.layoutEdited()
        await this.saveLayout([this.pageInfo.id, this.layoutScheme])
      }
      this.layoutChanged = false
    }
  }
}
</script>