let model = {
    data: {
        number: 0,
        name: ''
    },
    fetch(id) {
        return axios.get('http://127.0.0.1:3002/api').then(({data}) => {
            this.data = data
        })
    },
    update(newData) {
        return axios.put('http://127.0.0.1:3002/put', newData).then(({data}) => {
            this.data = data
        })
    }
}

let view = {
    el: '#app',
    template: `
    <div>
      书名：《__name__》，
      数量：<span id="number">__number__</span>
    </div>
    <div class="actions">
      <button id="increaseByOne">加1</button>
      <button id="decreaseByOne">减1</button>
      <button id="square">平方</button>
      <button id="cube">立方</button>
      <button id="reset">归零</button>
    </div>
    `,
    render (data) {
        let html = this.template.replace('__name__', data.name)
            .replace('__number__',data.number);

        $(this.el).html(html)
    }
}

let controller = {
    init ({view, model}) {
        this.view = view;
        this.model = model;
        this.view.render(this.model.data);
        this.bindEvent();
        this.fetchModel()
    },
    events: [
        { type: 'click', selector: '#increaseByOne', fnName: 'add' },
        { type: 'click', selector: '#decreaseByOne', fnName: 'minus' },
        { type: 'click', selector: '#square', fnName: 'square' },
        { type: 'click', selector: '#cube', fnName: 'cube' },
        { type: 'click', selector: '#reset', fnName: 'zero' },
    ],
    bindEvent () {
        this.events.map((event) => {
            $(this.view.el).on(event.type, event.selector, this[event.fnName].bind(this))
        })
    },
    add(){
        let newData = {number: this.model.data.number + 1}
        this.updateModel(newData)
    },
    minus(){
        let newData = {number: this.model.data.number - 1}
        this.updateModel(newData)
    },
    square(){
        let newData = {number: Math.pow(this.model.data.number, 2)}
        this.updateModel(newData)
    },
    cube(){
        let newData = {number: Math.pow(this.model.data.number, 3)}
        this.updateModel(newData)
    },
    zero () {
        let newData = {number: 0}
        this.updateModel(newData)
    },
    fetchModel(){
        this.model.fetch(1).then(() => {
            this.view.render(this.model.data)
        })
    },
    updateModel(newData) {
        this.model.update(newData).then(()=>{
            this.view.render(this.model.data)
        })
    }
}
controller.init({view, model})