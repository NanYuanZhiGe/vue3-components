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
    fixedBaby: {
        type: String,
        default: 'son',
        validator: (value) => {
            return ['son', 'daughter'].includes(value as string)
        }
    },
    fixedSize: {
        type: Number,
        default: 90,
        validator: (value) => {
            return (value as number) <= 100 && (value as number) >= 0
        },
    },
    initChangeSize: {
        type: Number,
        default: 10,
        validator: (value) => {
            return (value as number) <= 100 && (value as number) >= 0
        }
    },
    allowMinChangeSize: {
        type: Number,
        default: 10,
        validator: (value) => {
            return (value as number) <= 100 && (value as number) >= 0
        }
    },
    allowMaxChangeSize: {
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

const sonWidth = ref(
    props.layout === 'vertical' ?
        100 :
        props.fixedBaby === 'son' ?
            props.fixedSize :
            props.initChangeSize
)
const sonHeight = ref(
    props.layout === 'horizontal' ?
        100 :
        props.fixedBaby === 'son' ?
            props.fixedSize :
            props.initChangeSize
)
const daughterWidth = ref(
    props.layout == 'vertical' ?
        100 :
        props.fixedBaby === 'daughter' ?
            props.fixedSize :
            props.initChangeSize
)
const daughterHeight = ref(
    props.layout === 'horizontal' ?
        100 :
        props.fixedBaby === 'daughter' ?
            props.fixedSize :
            props.initChangeSize
)
const amnioticTop = ref(
    props.layout === 'horizontal' ?
        0 :
        props.fixedBaby === 'son' ?
            100 - props.initChangeSize :
            props.initChangeSize
)
const amnioticLeft = ref(
    props.layout === 'vertical' ?
        0 :
        props.fixedBaby === 'son' ?
            100 - props.initChangeSize :
            props.initChangeSize
)

const emits = defineEmits(['resize', 'ratioChange'])
const maternal = ref<HTMLElement | null>(null)


onMounted(() => {
    if (!maternal.value) {
        console.log("Fail to moute maternal!")
    }
})

const isAmnioticMoving = ref(false)

const getMousePosistion = (e: MouseEvent) => {
    return props.layout === 'horizontal' ? e.clientX : e.clientY
}

const limitChangeSize = (size: number) => {
    if (size <= props.allowMinChangeSize) {
        return props.allowMinChangeSize
    }
    else if (size >= props.allowMaxChangeSize) {
        return props.allowMaxChangeSize
    }
    return size
}


const onMouseMovingInMaternal = (e: MouseEvent) => {
    if (!isAmnioticMoving.value || !maternal.value) {
        return
    }
    const currentMousePos = getMousePosistion(e)
    const rect = maternal.value.getBoundingClientRect()
    if (props.layout === 'horizontal') {
        if (props.fixedBaby === 'son') {
            const newChangeSize = limitChangeSize(Math.ceil((rect.right - currentMousePos) / rect.width * 100))
            daughterWidth.value = newChangeSize
            amnioticLeft.value = 100 - newChangeSize - props.splitterWidth / rect.width
        } else {
            const newChangeSize = limitChangeSize(Math.ceil((currentMousePos - rect.left) / rect.width * 100))
            sonWidth.value = newChangeSize
            amnioticLeft.value = newChangeSize
        }
    } else {
        if (props.fixedBaby === 'son') {
            const newChangeSize = limitChangeSize(Math.ceil(rect.bottom - currentMousePos) / rect.height * 100)
            daughterHeight.value = newChangeSize
            amnioticTop.value = 100 - newChangeSize - props.splitterWidth / rect.height
        } else {
            const newChangeSize = limitChangeSize(Math.ceil(currentMousePos - rect.top) / rect.height * 100)
            sonHeight.value = newChangeSize
            amnioticTop.value = newChangeSize
        }
    }
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
        <div ref="son" :class="['baby', 'son']">
            <slot name="son"></slot>
        </div>

        <!-- 右侧或者是下方面板-->
        <div ref="daughter" :class="['baby', 'daughter']">
            <slot name="daughter"></slot>
        </div>

        <!-- 调节比例线-->
        <div ref="splitter" :class="['amniotic', layout]" @mousedown="onClickAmniotic"></div>
    </div>
</template>

<style scoped>
.maternal {
    position: relative;
    width: 100%;
    height: 100%;
}

.amniotic {
    position: absolute;
    background-color: #9c4e4e;
    top: v-bind(amnioticTop+'%');
    left: v-bind(amnioticLeft+'%');
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
    position: absolute;
}

.baby.son {
    top: 0;
    left: 0;
    width: v-bind(sonWidth+'%');
    height: v-bind(sonHeight+'%');
}

.baby.daughter {
    bottom: 0;
    right: 0;
    width: v-bind(daughterWidth+'%');
    height: v-bind(daughterHeight+'%');
}
</style>
