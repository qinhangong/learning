/** 
* call继承:
* 子类只能继承父类私有的属性,不能继承父类prototype上的属性
*/
function Parent(name) {
    this.name = name;
    this.hobby = 'basketball';
}
Parent.prototype.say = function () {
    console.log(`My name is ${this.name}`);
}
Parent.prototype.play = function () {
    console.log(`I play ${this.hobby}`);
}

function Child(name) {
    Parent.call(this, name);
}
Child.prototype.play = function () {
    console.log(`My name is ${this.name}, I play ${this.hobby} too`);
}

const parent = new Parent('laozhang');
const child = new Child('xiaozhang');
console.log(parent.say()); // My name is laozhang
console.log(parent.play()); // I play basketball
console.log(child.say()); // child.say is not a function 说明不能继承父类prototype尚德属性
console.log(child.play()); // I play basketball too


/** 
* 原型链继承:
* 1.子类既继承了父类私有的属性，也继承了父类prototype上的属性
* 2.需要重写Child.prototype.constructor方法;
* 3.Child.prototype = new Parent('xiaozhang')必须写在Child.prototype.xxx=any之前;
*/

function Parent(name) {
    this.name = name;
    this.hobby = 'basketball';
}
Parent.prototype.say = function () {
    console.log(`My name is ${this.name}`);
}
Parent.prototype.play = function () {
    console.log(`I play ${this.hobby}`);
}

function Child() {
    //这里不指定子类私有属性,通过继承获取
}
Child.prototype = new Parent('xiaozhang');
console.log(Child.prototype.constructor); //[Function: Parent]
Child.prototype.constructor = Child;
console.log(Child.prototype.constructor); //[Function: Child]


const parent = new Parent('laozhang');
const child = new Child();
console.log(parent.say()); // My name is laozhang
console.log(parent.play()); // I play basketball
console.log(child.say()); // My name is laozhang
console.log(child.play()); // I play basketball 

/**
 *  组合继承
 *  1.call实现对私有属性的继承
 *  2.Object.create()实现对父类prototype上的属性的继承
 *  3.同原型链继承的3
 */
function Parent(name) {
    this.name = name;
    this.hobby = 'basketball';
}
Parent.prototype.say = function () {
    console.log(`My name is ${this.name}`);
}
Parent.prototype.play = function () {
    console.log(`I play ${this.hobby}`);
}

function Child(name) {
    Parent.call(this,name);
}
Child.prototype = Object.create(Parent.prototype);
console.log(Child.prototype.constructor); //[Function: Parent]
Child.prototype.constructor = Child;


const parent = new Parent('laozhang');
const child = new Child('xiaozhang');
console.log(parent.say()); // My name is laozhang
console.log(parent.play()); // I play basketball
console.log(child.say()); // My name is laozhang
console.log(child.play()); // I play basketball 

/**
 *  class继承
 *  1.只是一个语法糖，同组合继承
 *  2.子类constructor必须执行super(),而且必须放在第一行执行，否则会报错
 */
 class Parent {
     constructor(name){
         this.name = name;
         this.hobby = 'basketball';
     }
     say(){
        console.log(`My name is ${this.name}`);
     }
     play(){
        console.log(`I play ${this.hobby}`);
     }
}

class Child extends Parent {
    constructor(name){
        super(name);
    }
}
const parent = new Parent('laozhang');
const child = new Child('xiaozhang');
console.log(parent.say()); // My name is laozhang
console.log(parent.play()); // I play basketball
console.log(child.say()); // My name is laozhang
console.log(child.play()); // I play basketball 