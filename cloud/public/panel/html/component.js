const elBody = nElement.fromElement(document.body)
elBody.style('margin', '0')
elBody.style('padding', '0')
elBody.style('font-size', '18px')
elBody.style('background-color', '#eeeeee')

class PageTitleComponent extends nH1 {
  link = new nLink()

  constructor() {
    super({
      component: { name: 'page-title-component' },
    })

    this.link.style('color')
    this.append(this.link)
  }

  titleLink(title, link = '') {
    this.link.setText(title)
    this.link.href(link)
    return this
  }
}

class PageSubtitleComponent extends nH2 {
  constructor() {
    super({
      component: { name: 'page-subtitle-component' },
    })
  }

  subtitle(subtitle) {
    this.setText(subtitle)
    return this
  }
}

class nContainerComponent extends nElement {
  top = new nElement()
  left = new nElement()
  right = new nElement()
  bottom = new nElement()

  constructor() {
    super({
      component: { name: 'container-component' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('margin', '0 auto')
    this.style('width', '50rem')

    super.append(this.top)

    const middle = new nFlex()

    this.left.styleContainer('width', '69%')
    this.left.style('width', '100%')
    middle.append(this.left)

    this.right.styleContainer('width', '30%')
    this.right.style('width', '100%')
    middle.append(this.right)

    super.append(middle)

    super.append(this.bottom)
  }

  append() {
    throw new Error('Can not do this.')
  }
}

class nTextInputComponent extends nElement {
  label = new nText()
  input = new nTextInput()
  error = new nTextError()

  constructor() {
    super({
      component: { name: 'text-input-component' },
    })

    this.build()
  }

  build() {
    super.build()

    this.label.style('margin-bottom')
    this.error.style('margin-bottom')

    super.append(this.label)
    super.append(this.input)
    super.append(this.error)
  }
}

class nTextareaComponent extends nElement {
  label = new nText()
  textarea = new nTextarea()
  error = new nTextError()

  constructor() {
    super({
      component: { name: 'textarea-component' },
    })

    this.build()
  }

  build() {
    super.build()

    this.label.style('margin', '0 0 0.5rem 0')
    this.error.style('margin', '0 0 0.5rem 0')

    super.append(this.label)
    super.append(this.textarea)
    super.append(this.error)
  }
}

class nThumbComponent extends nElement {
  image = new nImage()
  title = new nText()
  subtitle = new nText()

  constructor() {
    super({
      component: { name: 'thumb-component' },
    })

    this.build()
  }

  build() {
    super.build()

    this.style('background-color')
    this.style('margin-bottom')
    this.style('text-align')
    this.style('box-sizing')
    this.style('padding')

    this.title.style('text-align', 'center')
    this.subtitle.style('text-align', 'center')

    this.append(this.image)
    this.append(this.title)
    this.append(this.subtitle)
  }

  src(src) {
    return this.image.src(src)
  }

  getValue() {
    return this.image.id()
  }
}

class nImageGalleryComponent extends nElement {
  image_ids = []

  constructor() {
    super({
      component: { name: 'image-gallery-component' },
    })

    this.build()
  }

  build() {
    super.build()
  }

  append(id, title, subtitle) {
    this.image_ids.push(id)

    const thumb = new nThumbComponent()

    thumb.title.setText(title)
    thumb.subtitle.setText(subtitle)
    thumb.image.imageId(id)

    return super.append(thumb)
  }

  getValue() {
    return this.image_ids.join(' ')
  }
}

class nUploadComponent extends nElement {
  button = new nButton()
  file_input = new nFileInput()
  info = new nSmallText()
  error = new nTextError()
  gallery = new nImageGalleryComponent()

  constructor() {
    super({
      component: { name: 'file-button-component' },
    })

    this.build()
  }

  build() {
    super.build()

    const self = this

    self.button.setText('Adicionar arquivos')
    self.button.on('click', () => self.file_input.element.click())

    self.info.style('margin', '0 0 0.5rem 0')
    self.info.setText('Max.: 1MB; Ext.: jpg, png, webm')

    self.file_input.style('display', 'none')
    self.file_input.on('fileloaded', ({ file }) => self.gallery.append(file.id, file.name, file.id))
    self.file_input.on('fileerror', ({ error }) => self.error.setText(error.getMessage()))

    let button_text = ''
    self.file_input.on('uploadstart', () => {
      button_text = self.button.getText()
      self.button.setText('Loading...')
    })
    self.file_input.on('uploadend', () => {
      self.button.setText(button_text)
    })

    self.append(self.button)
    self.append(self.info)
    self.append(self.error)
    self.append(self.gallery)
  }

  getValue() {
    return this.gallery.getValue()
  }

  clear() {
    this.error.clear()
    this.gallery.clear()
  }

}

class nCenterFormComponent extends nElement {
  title = new nH1()
  subtitle = new nH2()
  form = new nElement()
  error = new nTextError()
  button = new nButton()
  link = new nLink()

  constructor() {
    super({
      component: { name: 'center-form' },
    })

    this.build()
  }

  build() {
    super.build()

    this.styleContainer('margin', '0.5rem auto')
    this.styleContainer('width', '30rem')

    this.style('display', 'inline-block')
    this.style('padding')
    this.style('width', '100%')

    this.append(this.title)
    this.append(this.subtitle)
    this.append(this.form)
    this.append(this.error)
    this.append(this.button)
    this.append(this.link)
  }
}

class nNewsThumb extends nElement {
  title = new nText()
  subtitle = new nText()
  description = new nText()
  image = new nImage()

  constructor() {
    super({
      component: { name: 'news-thumb' },
    })

    this.append(this.title)
    this.append(this.subtitle)
    this.append(this.description)
    this.append(this.image)
  }
}