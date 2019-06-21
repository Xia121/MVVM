#傻瓜都能看懂的双向绑定原理#

想要理解这些概念最好是自己动手撸一个出来(感谢方方老师)
所以我们先要从最开始的意大利面条式的代码一步一步过渡到MVC在到Vue
需求可以书籍的数量和名字进行计算和绑定

##第一阶段:意大利面条式代码##
https://github.com/Xia121/MVVM/tree/master/First  

1.这种代码适用于2008年前那个jq统治天下的时间  

换句或说 如果你还在写这种代码 这说明你 out 了

2.下一步我们将会对这种老代码进行MVC封装

##第二阶段:MVC式代码##
1.首先我们应该搞清楚什么是MVC或者说MVC代表了什么

2.我们先从MVC模式这个概念的历史开始，MVC模式最早是起于smalltalk语言（据我了解）

后来渐渐被后台语言所应用与构建后台语言的架构比如ThinkPHP，SpringMVC，等等 为什么会出现MVC模式呢

是因为一开始的意大利面条式代码乍看起来没有问题，但是一旦时间久了之后，这种代码想要维护和更新就像是在屎堆里面查找一快特定形状的屎，对开发人员的三观和头发是一种极大的挑战（亚马逊开发人员也有相似言论）  

所以一些聪明的工程师在想为什么我们不把这些相似的代码套路总结一下形成业内的潜规则呢，于是各种设计模式就这样出现了今天我们就从MVC开始说起（所以说前端的MVC模式就是从后台语言借鉴的）

3. M(Model)专门负责数据（比如前端从api接口获取到了数据）  
   V(View)专门负责表现（比如把梳理过的数据添加到HTML上）  
   C(Controller)负责其他逻辑（比如处理数据）  
   如果我们来反思一下，会发现这个分类是无懈可击的：  
   每个网页都有数据
   每个网页都有表现（具体为 HTML）
   每个网页都有其他逻辑
   于是乎，MVC 成了经久不衰的设计模式  
   
4. 现在我们改进一下列子让她MVC起来 哈哈哈
https://github.com/Xia121/MVVM/tree/master/Second
```angular2html
this[event.fnName].bind(this)
//作用是传递this 确定this是let controller
```


##第三阶段:面向对象(模板代码)把重复的代码写到一个类##
1.为什么要用类或者也可以换成原型那是因为如果有n个页面需要按照上面那个代码其实要重复n次

如果写成类那么new一下就可以啦

https://github.com/Xia121/MVVM/tree/master/Third
    
##第四阶段:实现简单的观察者模式##
1.这个问题解决「手动」调用 this.view.render(this.model.data),而出现的所以我改成
这个的方法说白了就是在跟节点上绑定一个change事件当数据出来时通知change事件自动进行更改
这样就不用手工调用了

https://github.com/Xia121/MVVM/tree/master/Fourth

##第五阶段:双向绑定和虚拟DOM的初步思想##
1.在我们写的例子中你会发现DOM更新其实就是直接.html() 这样特别粗暴的进行  

2.如果我们的例子里面有input并对根据input里面的数值进行计算的话 .html()这样就会把input

里面的数值覆盖掉除非我们把数字记录到JS的data中进行储存(双向绑定初步思想)就这样出来了

3. 而虚拟DOM则是换了一种思想那就是我只改变有关于数字的部分DOM，先生成即将改变的DOM对象然后替换掉文档中的DOM(这样就是虚拟DOM的初步思想)

4.Angular 就是基于双向绑定而发明的，而 React 则是基于虚拟DOM思想。

5.现在我们用Vue来替代代码中的View

https://github.com/Xia121/MVVM/tree/master/Fifth

Vue 的双向绑定（也是 Angular 的双向绑定）有这些功能：

1.只要 JS 改变了 view.number 或 view.name 或 view.n （注意 Vue 把 data 里面的 number、name 和 n 放到了 view 上面，没有 view.data 这个东西）， HTML 就会局部更新
    
2.只要用户在 input 里输入了值，JS 里的 view.n 就会更新。

这就像双向绑定：JS 数据与页面元素互相绑定。

##第六阶段:用vue彻底替换掉MVC##
因为Vue有很多功能 他的核心功能是双向绑定和虚拟DOM但是当他实现的View的数据绑定之后觉得为什么我不把Controller 和 model 的功能一起替换掉呢
于是我们有了现在的 Vue 哈哈哈

https://github.com/Xia121/MVVM/tree/master/Sixth

当然Vue肯定不是这么简单的里面有很多的技术点在里面 这仅仅是一个入门概括详细的我会再进行研究并发布的
请大家给我点个赞啊啊啊！！！
    
