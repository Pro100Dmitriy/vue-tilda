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
  <div v-if="!pageInfoLoading">
    <PageConstructor :layout="layoutScheme"/>
  </div>
  <div class="fly-setting"
       @dragstart="moveFlySetting"
       @dragend="stopFlySetting">
    <input type="text" value="Test">
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import PageConstructor from "@/components/page/PageConstructor"

import searchIcon from '@/assets/img/svg/search.svg'

export default {
  name: "EditablePageSection",

  data() {
    return {
      searchIcon,
      showBuilder: false,
      showBuilderResult: false,
      libraryList: [{id:1, title: 'Wrapper'}, {id:2, title: 'Paragraphs'}, {id:3, title: 'About'}, {id:4, title: 'Headers'}, {id:5, title: 'Images'}, 'Gallery', 'Crucial phrase', 'Advantages', 'Columns', 'Dividers', 'Menus', 'Links', 'Footers', 'Video', 'Forms', 'Buttons', 'Shop', 'Team', 'Comments', 'Stages', 'Contacts', 'Social', 'Services', 'News', 'Others'],
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
      visibilityLayout: this.visibilityLayout
    }
  },

  components: {
    PageConstructor
  },

  methods: {
    ...mapActions( {
      saveLayout: 'editPage/saveLayout'
    } ),
    openBuilder( positionIndex ) {
      console.log( this.getLayout )
      console.log( positionIndex )
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
    moveFlySetting( event ) {
      const target = event.target
      console.log(target)
      document.addEventListener('mousemove', eventMouse => {
        let x = eventMouse.pageX
        let y = eventMouse.pageY

        console.log(x, y)

        target.style.transform = `translate(${x}px,${y}px)`
      })
    },
    stopFlySetting( event ) {
      event.target.style = ''
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

      this.layoutScheme = newLayout
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
    }
  },

  computed: {
    ...mapGetters( {
      getLayout: 'editPage/getLayout'
    } ),
    ...mapState( {
      pageInfo: state => state.editPage.pageInfo,
      pageInfoLoading: state => state.editPage.pageInfoLoading
    } )
  },

  mounted() {
    if ( !this.pageInfoLoading ) {
      console.log(this.getLayout)
      this.layoutScheme = [
        ...this.getLayout
      ]
    }
  },

  watch: {
    layoutChanged(changed) {
      if( changed ){
        // this.saveLayout([this.pageInfo.id, this.layoutScheme])
      }
      this.layoutChanged = false
    }
  }
}
</script>