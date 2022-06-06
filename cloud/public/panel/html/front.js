
const Translations = {
  'pt-br': {
    'request entity too large': 'Essa solicitação está além do esperado.',
    'Can not duplicate this item.': 'Não podemos duplicar esse cadastro.',
  }
}

const Translator = ({ in: (language) => ({ speak: (phrase) => Translations[language][phrase] }) })

const Styles = {
  'default': {
    'background-color': '#cccccc',
    'padding-bottom': '0.5rem',
    'margin-bottom': '0.5rem',
    'text-align': 'center',
    'padding': '0.5rem',
    'margin': '0.5rem',
    'color': '#000',
  }
}

const Str = {
  normalizeSpecialChar: (letter) => {
    switch (letter) {
      case ' ':
      case '!':
      case '@':
      case '#':
      case '%':
      case '&':
      case '*':
      case '<':
      case '>':
      case '(':
      case ')':
      case '{':
      case '}':
      case '[':
      case ']':
      case '+':
      case '-':
      case '_':
      case '=':
      case ',':
      case '.':
      case ':':
      case ';':
      case '?':
      case '|':
      case '|':
      case '/':
      case '"':
      case '\'':
      case '\\':
        letter = '-';
        break;

      case '$':
        letter = 's'
        break;

      case 'á':
      case 'à':
      case 'â':
      case 'ã':
        letter = 'a';
        break;

      case 'é':
      case 'ê':
        letter = 'e';
        break;

      case 'í':
        letter = 'i';
        break;

      case 'ó':
      case 'ô':
      case 'ò':
      case 'õ':
        letter = 'o';
        break;

      case 'ú':
      case 'ü':
        letter = 'u';
        break;

      case 'ç':
        letter = 'c';
        break;
    }

    return letter
  },

  toURL: (str) => {
    return str.toString()
      .split('').map(letter => Str.normalizeSpecialChar(letter))
      .join('').replace(/[-]+/ig, '-').replace(/^-|-$/ig, '')
      .trim().toLowerCase()
  }
}

const Flow = {}

Flow.goTo = (url) => (window.location = url)

class nElement {

  id = null

  container = document.createElement('div')
  element = document.createElement('div')

  options = {}
  logs = {
    element: [],
    container: [],
  }

  constructor(options = {}) {
    this.options = options
  }

  build() {
    if (this.options?.element?.tagName) {
      this.element = document.createElement(this.options.element.tagName)
    }

    if (this.options?.container?.tagName) {
      this.container = document.createElement(this.options?.container?.tagName)
    }

    const name = this.options?.component?.name || undefined
    this.container.classList.add(`ct-${name}`)
    this.element.classList.add(`el-${name}`)

    this.style('outline', 'none')
    this.style('box-sizing', 'border-box')
  }

  static fromElement(el, options = {}) {
    const component = new nElement(options)
    component.loadElement(el)
    return component
  }

  static fromId(id, options) {
    return nElement.fromElement(document.getElementById(id), options)
  }

  loadElement(element) {
    this.logs.element.push(['loadElement', element])
    this.element = element
    return this
  }

  focus() {
    this.logs.element.push(['focus'])
    this.element.focus()
    return this
  }

  attr(name, value) {
    this.logs.element.push(['attr', name, value])
    if (value !== null) {
      this.element.setAttribute(name, value)
      return this
    } else {
      return this.element.getAttribute(name)
    }
  }

  data(name, value) {
    this.logs.element.push(['data', name, value])
    if (value !== undefined) {
      this.element.dataset[name] = value
      return this
    } else {
      return this.element.dataset[name]
    }
  }

  style(name, value = 'default') {
    this.logs.element.push(['style', name, value])

    if (value === 'default') {
      const style = Styles[this.options?.element?.tagName] || Styles['default']
      value = style[name]
    }

    this.element.style[name] = value
    return this
  }

  styleContainer(name, value) {
    this.logs.container.push(['style', name, value])

    if (value === 'default') {
      const style = Styles[this.options?.container?.tagName] || Styles['default']
      value = style[name]
    }

    this.container.style[name] = value
    return this
  }

  id(id) {
    this.logs.element.push(['id', id])
    return this.data(id)
  }

  setText(text) {
    this.logs.element.push(['setText', text])
    if (text) this.element.innerText = text
    return this
  }

  getText() {
    this.logs.element.push(['getText'])
    return this.element.innerText
  }

  clear() {
    this.logs.element.push(['clear'])
    this.element.childNodes.forEach(node => node.remove())
    return this
  }

  append(nelement = new nElement) {
    this.logs.element.push(['append', nelement])
    this.element.append(nelement.render())
    return this
  }

  set(nelement = new nElement) {
    this.logs.element.push(['set', nelement])
    this.element.childNodes.forEach(c => c.remove())
    this.element.append(nelement.render())
    return this
  }

  on(name, func) {
    this.logs.element.push(['on', name])
    this.element.addEventListener(name, func)
    return this
  }

  render() {
    this.logs.element.push(['render'])
    this.container.append(this.element)
    return this.container
  }
}

class nValuable extends nElement {

  disable() {
    this.attr('disabled', true)
    return this
  }

  enable() {
    this.attr('disabled', '')
    return this
  }

  setValue(value) {
    this.element.value = value
    return this
  }

  getValue() {
    return this.element.value
  }

}

class nTextInput extends nValuable {
  constructor() {
    super({
      component: { name: 'text-input' },
      element: { tagName: 'input' }
    })

    this.build()
  }

  build() {
    super.build()

    this.attr('type', 'text')

    this.style('box-shadow', '0 0 0.1rem 0 black')
    this.style('box-sizing', 'border-box')
    this.style('margin', '0 0 0.5rem 0')
    this.style('outline', 'none')
    this.style('font', 'inherit')
    this.style('border', 'none')
    this.style('width', '100%')
    this.style('padding')
  }

  placeholder(text = '') {
    this.attr('placeholder', text)
    return this
  }
}

class nTextarea extends nValuable {
  constructor() {
    super({
      component: { name: 'textarea' },
      element: { tagName: 'textarea' }
    })

    this.build()
  }

  build() {
    super.build()

    this.style('box-shadow', '0 0 0.1rem 0 black')
    this.style('box-sizing', 'border-box')
    this.style('margin', '0 0 0.5rem 0')
    this.style('padding')
    this.style('outline', 'none')
    this.style('font', 'inherit')
    this.style('resize', 'none')
    this.style('border', 'none')
    this.style('width', '100%')
  }

  setRows(rows) {
    this.element.rows = rows
    return this
  }

  placeholder(text = '') {
    this.attr('placeholder', text)
    return this
  }
}

class nFileInput extends nValuable {
  constructor() {
    super({
      component: { name: 'file-input' },
      element: { tagName: 'input' }
    })

    this.build()
  }

  build() {
    super.build()

    this.attr('type', 'file')

    const self = this

    self.on('change', ({ target: { files } }) => {
      Array.from(files).forEach((file) => {
        const { name, size, type } = file

        Api.upload(file, { name, size, type })
          .then((response) => {
            const event = new Event('fileloaded')
            event.file = { name, size, type, id: response.get('id') }
            self.element.dispatchEvent(event)
          })
          .catch((error) => {
            const event = new Event('fileerror')
            event.error = error
            self.element.dispatchEvent(event)
          })
          .finally(() => self.element.dispatchEvent(new Event('uploadend')))

        self.element.dispatchEvent(new Event('uploadstart'))
      })
    })
  }

  multiple() {
    this.attr('multiple', true)
    return this
  }

  accept(accept = '*/*') {
    this.attr('accept', accept)
    return this
  }
}

class nText extends nValuable {
  constructor() {
    super({
      component: { name: 'text' },
    })
  }
}

class nSmallText extends nValuable {
  constructor() {
    super({
      component: { name: 'small-text' },
    })

    this.style('font-size', '0.75rem')
  }
}

class nTextError extends nElement {
  constructor() {
    super({
      component: { name: 'text-error' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('margin-bottom')
    this.style('color', 'red')
  }
}

class nH1 extends nText {
  constructor() {
    super({
      component: { name: 'h1' },
    })

    this.build()
  }

  build() {
    super.build()

    this.styleContainer('display', 'inline-block')
    this.styleContainer('width', '100%')

    this.style('text-align', 'center')
    this.style('font-size', '3rem')
  }
}

class nH2 extends nH1 {
  constructor() {
    super({
      component: { name: 'h2' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('font-size', '1.5rem')
  }
}

class nH3 extends nH2 {
  constructor() {
    super({
      component: { name: 'h3' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('font-size', '1.25rem')
  }
}

class nButton extends nElement {
  constructor() {
    super({
      component: { name: 'button' },
      element: { tagName: 'button' }
    })

    this.build()
  }

  build() {
    super.build()

    this.style('display', 'inline-block')
    this.style('margin', '0 0 0.5rem 0')
    this.style('padding')
    this.style('cursor', 'pointer')
    this.style('outline', 'none')
    this.style('font', 'inherit')
    this.style('background-color', '#dddddd')
    this.style('border', 'none')
    this.style('width', '100%')
  }
}

class nLink extends nElement {
  constructor() {
    super({
      component: { name: 'link' },
      element: { tagName: 'a' }
    })

    this.build()
  }

  build() {
    super.build()

    this.styleContainer('text-align', 'center')
    this.style('text-decoration', 'none')
    this.style('display', 'inline-block')
  }

  href(url) {
    this.element.href = url
    return this
  }
}

class nButtonLink extends nLink {
  constructor() {
    super({
      component: { name: 'button-link' },
    })

    this.build()
  }

  build() {
    super.build()

    this.styleContainer('width', '100%')

    this.style('background-color', '#cccccc')
    this.style('cursor', 'pointer')
    this.style('padding')
    this.style('color', '#000')
    this.style('width', '100%')
  }
}

class nFlex extends nElement {
  constructor() {
    super({
      component: { name: 'flex' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('display', 'flex')
    this.style('justify-content', 'space-between')
  }
}

class nImage extends nElement {
  constructor() {
    super({
      component: { name: 'image' },
      element: { tagName: 'img' }
    })

    this.build()
  }

  build() {
    super.build()

    this.style('max-width', '100%')
  }

  src(src) {
    return this.attr('src', src)
  }

  imageId(id) {
    this.id = id
    return this.src(`http://0.0.0.0/files/${id}/file`)
  }

  alt(alt) {
    this.attr('alt', alt)
    return this
  }
}
