class EventHub {

    constructor(){
        this.events = {}
    }

    on(eventName, fn){
        console.log(this,'111')
        if(!this.events[eventName]){
            this.events[eventName] = []
        }
        this.events[eventName].push(fn)
    }

    emit(eventName, params){
        let fnList = this.events[eventName]
        fnList.map((fn)=>{
            fn.apply(null, params)
        })
    }

    off(eventName, fn){
        let fnList = this.events[eventName]
        for(let i =0; i<fnList.length; i++){
            if(fnList[i] === fn){
                delete fnList[i]
                break
            }
        }
    }
}


class Model extends EventHub{
    constructor (options) {
        super()
        this.data = options.data || {}
        this.baseUrl = options.baseUrl || 'http://127.0.0.1:3002'
    }
    fetch(id) {
        return axios.get(this.baseUrl + '/api').then(({data}) => {
            this.data = data
        })
    }
    update(newData) {
        return axios.put(this.baseUrl + '/put', newData).then(({data}) => {
            this.data = data
            this.emit('changed')
        })
    }

}

let model = new Model({
    data: {
        id: null,
        number: 0,
        name: null
    }
})

class View {
    constructor({el, template}) {
        this.el = el
        this.$el = $(el)
        this.template = template
    }
    render (data) {
        let html = this.template
        for (let key in data) {
            let value = data[key]
            html = html.replace(`__${key}__`, value)
        }
        this.$el.html(html)
    }
}

let view = new View({
    el: '#app',
    template: `
    <div>
      书名：《__name__》，
      数量：__number__
    </div>
    <div class="actions">
      <button id="increaseByOne">加1</button>
      <button id="decreaseByOne">减1</button>
      <button id="square">平方</button>
      <button id="cube">立方</button>
      <button id="reset">归零</button>
    </div>
      `,
})

class Controller {

    constructor({view, model, events, init, ...rest }) {
        this.view = view
        this.model = model
        this.events = events
        Object.assign(this, rest)
        this.bindEvents()
        this.view.render(this.model.data)
        init.apply(this, arguments)
    }

    bindEvents() {
        this.events.map((e) => {
            this.view.$el.on(e.type, e.el, this[e.fn].bind(this))
        })
    }
}

let controller = new Controller({
    view: view,
    model: model,
    events: [
        { type: 'click', el: '#increaseByOne', fn: 'add' },
        { type: 'click', el: '#decreaseByOne', fn: 'minus' },
        { type: 'click', el: '#square', fn: 'square' },
        { type: 'click', el: '#cube', fn: 'cube' },
        { type: 'click', el: '#reset', fn: 'reset' }
    ],

    init(options) {
        this.model.on('changed', ()=>{
            this.view.render(this.model.data)
        })

        this.model.fetch(1)
            .then(() => {
                this.view.render(this.model.data)
            })
    },

    add() {
        let newData = {number: this.model.data.number + 1}
        this.updateModel(newData)
    },
    minus() {
        // 注意这里有 bug
        this.model.data.number = this.model.data.number - 1
        this.updateModel(this.model.data)
    },
    square() {
        let newData = {number: Math.pow(this.model.data.number, 2)}
        this.updateModel(newData)
    },
    cube() {
        let newData = {number: Math.pow(this.model.data.number, 3)}
        this.updateModel(newData)
    },
    reset() {
        this.updateModel({number: 0})
    },
    updateModel(newData) {

        this.model.update(newData)
    }
})