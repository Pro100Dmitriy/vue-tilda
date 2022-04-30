<template>
  <ul class="info-buttons-list">
    <ButtonListItem v-for="item of buttonList"
                    :svgSetting="item.svgIcon"
                    :title="item.title"
                    :key="item.id"/>
  </ul>
</template>

<script>
import ButtonListItem from "@/components/ButtonListItem"

export default {
  name: "ButtonsList",

  data() {
    return {
      buttonList: [
        {id: 1, title: 'Domen connect', svgIcon: {hash: 'earthIcon', width: '14px', height: '14px' }},
        {id: 2, title: 'Publishing all pages', svgIcon: {hash: 'publishPageIcon', width: '17px', height: '14px' }},
        {id: 3, title: 'Requests', svgIcon: {hash: 'requestsList', width: '20px', height: '14px' }},
      ]
    }
  },

  components: {
    ButtonListItem
  }
}
</script>