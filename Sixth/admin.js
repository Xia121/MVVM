class Model {
    constructor (options) {
        this.baseUrl = options.baseUrl || 'http://127.0.0.1:3002'
    }
    fetch(id) {
        return axios.get(this.baseUrl + '/api')
    }
    update(newData) {
        return axios.put(this.baseUrl + '/put', newData)
    }

}

let model = new Model({
    baseUrl: 'http://127.0.0.1:3002'
})

var view = new Vue({
    el: '#app',
    data: {
        book: {
            id: null,
            name: '未命名',
            number: 0,
        },
        n: 1
    },
    template: `
    <div>
    <div>
      书名：《{{book.name}}》，
      数量：{{book.number}}
    </div>
    <div><input v-model="n"></div>
    <div class="actions">
      <button v-on:click="add">加N</button>
      <button v-on:click="minus">减N</button>
      <button v-on:click="square">平方</button>
      <button v-on:click="cube">立方</button>
      <button v-on:click="reset">归零</button>
    </div>
    </div>
  `,
    created() {
        model.fetch(1).then(({data}) => {
            view.book = data
        })
    },
    methods: {
        add() {
            let newData = {
                number: this.book.number + (this.n - 0)
            }
            this.updateModel(newData)
        },
        minus() {
            let newData = {
                number: this.book.number - (this.n - 0)
            }
            this.updateModel(newData)
        },
        square() {
            let newData = {
                number: Math.pow(this.book.number, 2)
            }
            this.updateModel(newData)
        },
        cube() {
            let newData = {
                number: Math.pow(this.book.number, 3)
            }
            this.updateModel(newData)
        },
        reset() {
            this.updateModel({
                number: 0
            })
        },
        updateModel(newData) {
            model.update(newData).then(({data})=>{
                this.book = data
            })
        }
    }
})