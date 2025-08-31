<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  layout: {
    type: String,
    default: 'horizontal',
    validator: (value) => {
      return ['horizontal', 'vertical'].includes(value as string)
    },
  },
  initFirstRatio: {
    type: Number,
    default: 40,
    validator: (value) => {
      return (value as number) <= 100 && (value as number) >= 0
    },
  },
  allowMaxRatio: {
    type: Number,
    default: 90,
    validator: (value) => {
      return (value as number) <= 100 && (value as number) >= 0
    },
  },
  splitterWidth: {
    type: Number,
    default: 4,
  },
})

const emits = defineEmits(['resize', 'ratioChange'])

const maternal = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!maternal.value) {
    console.log("Fail to moute maternal!")
  }
})



const sonSize = ref(props.initFirstRatio)
const daughterSize = ref(100 - props.initFirstRatio)
const isAmnioticMoving = ref(false)

const getMousePosistion = (e: MouseEvent) => {
  return props.layout === 'horizontal' ? e.clientX : e.clientY
}

const onMouseMovingInMaternal = (e: MouseEvent) => {
  if (!isAmnioticMoving.value || !maternal.value) {
    return
  }
  const currentMousePos = getMousePosistion(e)
  const rect = maternal.value.getBoundingClientRect()
  let newSonRatio = Math.ceil(((currentMousePos - (props.layout === 'horizontal' ? rect.left : rect.top)) / (props.layout === 'horizontal' ? rect.width : rect.height)) * 100)
  if (newSonRatio > props.allowMaxRatio) {
    newSonRatio = props.allowMaxRatio
  }
  else if (newSonRatio < 100 - props.allowMaxRatio) {
    newSonRatio = 100 - props.allowMaxRatio
  }
  const newDaugtherSize = 100 - newSonRatio
  sonSize.value = newSonRatio
  daughterSize.value = newDaugtherSize
}


const onDocumentMouseUp = (e: MouseEvent) => {
  isAmnioticMoving.value = false
}

const onClickAmniotic = (e: MouseEvent) => {
  e.preventDefault()
  isAmnioticMoving.value = true
  document.addEventListener('mouseup', onDocumentMouseUp)
}

onUnmounted(() => {
  document.removeEventListener('mouseup', onDocumentMouseUp)
})

</script>

<template>
  <div ref="maternal" :class="['maternal', layout]" @mousemove="onMouseMovingInMaternal">
    <!-- 左侧或者是上方的面板 -->
    <div ref="son" :class="['baby', 'son']" :style="{ [layout === 'horizontal' ? 'width' : 'height']: `${sonSize}%` }">
      <slot name="son"></slot>
    </div>

    <!-- 调节比例线-->
    <div ref="splitter" :class="['amniotic', layout]" @mousedown="onClickAmniotic"></div>

    <!-- 右侧或者是下方面板-->
    <div ref="daughter" :class="['baby', 'daughter']"
      :style="{ [layout === 'horizontal' ? 'width' : 'height']: `${daughterSize}%` }">
      <slot name="daughter"></slot>
    </div>
  </div>
</template>

<style scoped>
.maternal {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.maternal.horizontal {
  flex-direction: row;
}

.maternal.vertical {
  flex-direction: column;
}

.amniotic {
  background-color: #9c4e4e;
  top: 0;
  left: 0;
}

.amniotic.horizontal {
  width: v-bind(splitterWidth+'px');
  height: 100%;
  cursor: col-resize;
}

.amniotic.vertical {
  height: v-bind(splitterWidth+'px');
  width: 100%;
  cursor: row-resize;
}

.baby {
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}


.baby.daughter {
  top: 0;
  left: 0;
}
</style>
