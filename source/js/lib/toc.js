const TOC_CLASSNAME_PREFIX = 'toc-level-'
const MAX_TOC_LEN = 15
const TO_TOP_HEIGHT = '$toTopHeight'
const SCAN_FROM_ELEMENT_ID = 'main-content'
let $$Version = 0

class Topic {
  /**
   * 标题名称
   * @type {string}
   */
  name
  /**
   * 要添加的类名
   * @type {string}
   */
  _className
  /**
   * 跳转链接
   * @type {string}
   */
  link
  /**
   * 标题等级
   */
  _level
  /**
   * 元素
   */
  element

  /**
   *
   * @param element {ChildNode}
   * @param level {number}
   */
  constructor(element, level) {
    this.element = element
    this.name = element.textContent.length >= MAX_TOC_LEN ? element.textContent.substring(0, MAX_TOC_LEN) + '...' : element.textContent
    this._className = TOC_CLASSNAME_PREFIX + level
    this.link = '#' + element.id
    this._level = level
  }

  /**
   * 检查当前元素是否在以当前窗口上方为界限的下面
   */
  isAboveWindow() {
    return getDisToTop(this.element) > document.documentElement.scrollTop
  }

  get className() {
    return this._className
  }

  get level() {
    return this._level
  }

  set level(value) {
    this.className = TOC_CLASSNAME_PREFIX + value
    this._level = value
  }
}

function getDisToTop(element) {
  const t = element[TO_TOP_HEIGHT]
  if (t && t.version === $$Version) {
    return element[TO_TOP_HEIGHT].value
  }
  let temp = element
  let sum = 0
  do {
    sum += temp.offsetTop
    temp = temp.offsetParent
  } while(!!temp)
  element[TO_TOP_HEIGHT] = {
    value: sum,
    version: $$Version
  }
  return sum
}

window.addEventListener('resize', () => {
  $$Version++
})

const TopicItem = Vue.defineComponent({
  name: 'toc-item',
  props: {
    item: Topic,
    visible: Boolean,
    index: Number,
    topLevel: Number
  },
  emits: {
    linkClick: Number
  },
  /**
   * @param props {{item: Topic, visible: boolean, index: number}}
   * @param emit
   */
  setup(props, {emit}) {
    const onLinkClick = () => {
      emit('linkClick', props.index)
    }
    return {
      onLinkClick
    }
  },
  template:
  `
    <div 
      class="toc-item" 
      :class="visible ? 'toc-item-active' : 'toc-item-inactive'" :class="item.className"
      :class="item.level === 1 ? 'toc-primary-title' : undefined"
      >
      <a @click="onLinkClick" :href="item.link">{{item.name}}</a>
    </div>
  `
})

const TocComponent = Vue.defineComponent({
  name: 'toc-component',
  components: {
    'toc-item': TopicItem
  },
  setup() {
    const topics = Vue.ref([])
    const currentActive = Vue.ref(1)
    const toc = Vue.ref()
    const tocTopValue = Vue.ref('0')
    let lock

    function scrollListener() {
      if (lock) {
        return
      }
      let i;
      for (i = topics.value.length - 1; i >= 0; i--) {
        const topic = topics.value[i]
        if (!topic.isAboveWindow()) {
          let target = i + 1
          if (topics.value[target]) {
            // 不高亮主标题
            if (topics.value[target].level === 1) {
              const t = topics.value[target + 1]
              // 确保不是两个主标题连一起了
              if (t && t.length !== 1) {
                target++
              }
            }
            currentActive.value = Math.min(target, topics.value.length - 1)
          } else {
            // out of range
            currentActive.value = i
          }
          break
        }
      }
      if (i === -1) {
        currentActive.value = 0
      }
    }

    function resizeListener() {
      adjustTocLabelPos()
    }

    Vue.onMounted(() => {
      const element = document.getElementById(SCAN_FROM_ELEMENT_ID)
      if (!element) {
        return
      }
      const toc = []
      const childNodes = element.childNodes
      let minLevel = 1000
      childNodes.forEach(value => {
        // 检查是否为标题标签
        let level
        if (!(value.nodeName.length === 2
          && value.nodeName[0] === 'H'
          && !Number.isNaN(level = Number.parseInt(value.nodeName[1])))) {
          return
        }
        toc.push(new Topic(value, level))
        minLevel = Math.min(minLevel, level)
        topics.value = toc
      })
      // 将topic的level换成相对level，<b>保证最低level为1</b
      if (minLevel > 1) {
        const gap = minLevel - 1
        toc.forEach(value => {
          value.level -= gap
        })
      }
      window.addEventListener('scroll', scrollListener)
      window.addEventListener('resize', resizeListener)
      adjustTocLabelPos()
    })

    Vue.onUnmounted(() => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', resizeListener)
    })

    const adjustTocLabelPos = () => {
      if (toc.value.clientHeight === 0 && topics.value.length > 0) {
        setTimeout(() => {
          adjustTocLabelPos()
        }, 100)
        return
      }
      let rate = (1 - toc.value.clientHeight / document.documentElement.clientHeight) * 100 / 2
      // TODO 解决溢出的问题
      rate = Math.max(rate, 0)
      tocTopValue.value = rate + '%'
    }

    const onLinkClick = (index) => {
      lock = true
      currentActive.value = index
      setTimeout(() => {
        lock = false
      }, 50)
    }
    return {
      topics,
      currentActive,
      onLinkClick,
      toc,
      tocTopValue
    }
  },
  template:
  `
  <div id="toc" ref="toc" :style="{top: tocTopValue}">
    <div style="font-size: 20px;margin: 5px 0">目录</div>
    <toc-item
     v-for="(item, index) in topics" 
     :key="item.name" 
     :item="item" 
     :visible="currentActive === index" 
     @linkClick="onLinkClick"
     :index="index">
    </toc-item>
  </div>
  `
})

mixins.toc = {
  components: {
    'toc-component': TocComponent
  }
}
