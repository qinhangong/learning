##高阶函数
**高阶函数是指满足以下条件之一的函数:** 
- 函数可以作为`参数`被传递 
- 函数可以作为`返回值`输出

```javascript

    function isType(type){
        return function(val){
            return Object.prototype.toString.call(val)===`[object ${type}]`
        }
    }

    let isString = isType('String');
    let isArray = isType('Array');
    isString('zhangsan'); //true
    isString(0); //false
    isArray([1,2,3,4,5]); //true
    isArray({a:1,b:2}); //false  


    let isHas = key => item => item.hasOwnProperty(key);
    let arr = [
        {name:'lisi',age:15,sex:'male',borth:'beijing'},
        {name:'wangwu',sex:'female',borth:'hainan'},        
    ];
    arr.filter(isHas('age')); //{name:'lisi',age:15,sex:'male',borth:'beijing'}
```

##JS继承
###js的继承主要有以下几种方式:
- call继承
```javascript
    function Parent(language){
        this.language = language;
    }
    Parent.prototype.say = function(){
        console.log(`i am speak ${this.language}`);
    }

    function Child(name,language){
        Parent.call(this,language);
        this.name =name;
    }
    Child.prototype.say = function(){
        console.log(`myname is ${this.name},i am speak ${this.language}`);
    }

    let parent = new Parent('Chinese');
    let child = new Child('zhangsan','English');
    parent.say(); // i am speak Chinese
    child.say(); // myname is zhangsan,i am speak English
```
缺点:`call`继承只能继承父类私有的属性，无法继承父类`prototype`上的属性;
优点:`call`继承可以给父类传参，这样父类的私有属性的值就不用写死了；

- 原型链继承
```javascript
    function Cat(){
        this.favoriteFood = 'fish';
    }
    Cat.prototype.sing = function(){
        console.log('miao miao');
    }

    function Kitty(name){
        this.name =name;
    }
    Kitty.prototype = new Cat();
    Kitty.prototype.constructor = Kitty;
    Kitty.prototype.eat = function(){
        console.log(`my name is ${this.name},i like ${this.favoriteFood}`);
    }

    let kitty = new Kitty('kitty');
    kitty.eat(); // my name is kitty,i like fish
    kitty.sing(); // miao miao
```

优点: 通过原型链不仅可以继承父类的私有属性，而且可以继承父类`prototype`上的属性
缺点: 通过`Kitty.prototype = new Cat()`继承的时候不能给父类传参;  
      需要重新给`prototype.constructor`赋值;
      继承的实现必须写在子类原型属性定义之前,即`Kitty.prototype.constructor = Kitty` 必须在`Kitty.prototype.eat = function...`之前;

- 组合继承
```javascript
    function Parent(name){
        this.name = name;
    }
    Parent.prototype.say = function(){
        console.log(`my name is ${this.name}`);
    }

    function Child(name,age){
        Parent.call(this,name);
        this.age =age;
    }
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
    Child.prototype.say = function(){
        console.log(`my name is ${this.name},i am ${this.age} years old`);
    }
    let parent = new Parent('father');
    let child = new Child('son',15);
    parent.say(); // my name is father
    child.say(); // my name is son,i am 15 years old
```

优点:通过`原型链`继承把父类私有的和原型上的属性方法都继承了,`call`继承了父类的私有属性并实现了传参
缺点:需要重新给`prototype.constructor`赋值;
    继承的实现必须写在子类原型属性定义之前,即`Kitty.prototype.constructor = Kitty` 必须在`Kitty.prototype.eat = function...`之前;

- 寄生组合式继承
```javascript
    function Parent(name){
        this.name = name;
    }
    Parent.prototype.say = function(){
        console.log(`my name is ${this.name}`);
    }

    function Child(name,age){
        Parent.call(this,name);
        this.age =age;
    }
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
    Child.prototype.say = function(){
        console.log(`my name is ${this.name},i am ${this.age} years old`);
    }
    let parent = new Parent('father');
    let child = new Child('son',15);
    parent.say(); // my name is father
    child.say(); // my name is son,i am 15 years old
```
优点:通过`Object.create`只继承了父类prototype的属性,`call`继承了父类的私有属性并实现了传参
缺点:需要重新给`prototype.constructor`赋值;
    继承的实现必须写在子类原型属性定义之前,即`Kitty.prototype.constructor = Kitty` 必须在`Kitty.prototype.eat = function...`之前;

- es6`class`继承
```javascript
    class Parent{
        constructor(name){
            this.name = name;
            this.sex = 'boy';
        }
        say(){
            console.log(`my name is ${this.name}`);
        }
    }

    class Child extends Parent{
        constructor(name,age){
            super(name);// 子类必须执行super,而且必须放在最前面执行
            this.age = age;
        }

        say(){
            console.log(`my name is ${this.name},i am ${this.age} years old,i am a ${this.sex}`);
        }
    }

    let parent = new Parent('parent');
    let child = new Child('child',15);
    parent.say();
    child.say();
```
优点:看着清爽,子类继承了父类私有的属性和prototype上的属性,可以传参,不用重写子类的constructor了
