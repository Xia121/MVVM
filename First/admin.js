
axios.interceptors.response.use(function (response) {
    return response
})


function fetchDb() {
  return axios.get('http://127.0.0.1:3002/api')
}

function saveDb(newData) {
  return axios.put('http://127.0.0.1:3002/put', newData)
}

var template = `
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
`


fetchDb().then((request) => {
  let result = request.data

  $('#app').html(
    template.replace('__number__', result.number)
      .replace('__name__', result.name)
  )

  //加1
  $('#increaseByOne').on('click', (e) => {
    let oldResult = parseInt($('#number').text(), 10)
    let newResult = oldResult + 1
    saveDb({number: newResult}).then(function({data}) {
        console.log(data)
      $('#number').text(data.number)
    })
  })

  //减1
  $('#decreaseByOne').on('click', (e) => {
    let oldResult = parseInt($('#number').text(), 10)
    let newResult = oldResult - 1
    saveDb({number: newResult}).then(({data}) => {
      $('#number').text(data.number)
    })
  })

  //平方
  $('#square').on('click', (e) => {
    let oldResult = parseInt($('#number').text(), 10)
    let newResult = Math.pow(oldResult, 2)
    saveDb({number: newResult}).then(({data}) => {
      $('#number').text(data.number)
    })
  })

  //立方
  $('#cube').on('click', (e) => {
    let oldResult = parseInt($('#number').text(), 10)
    let newResult = Math.pow(oldResult, 3)
    saveDb({number: newResult}).then(({data}) => {
      $('#number').text(data.number)
    })
  })

  //归零
  $('#reset').on('click', (e) => {
    let newResult = 0
    saveDb({number: newResult}).then(({data}) => {
      $('#number').text(data.number)
    })
  })
})