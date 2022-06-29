// 1. Метод String replaceAll()

const str = "Backbencher sits at the Back";
const newStr = str.replaceAll("Back", "Front");
console.log(newStr); // "Frontbencher sits at the Front"

// 2.  new WeakRef() / .deref() - слабые сслылки очистка кэша

const callback = () => {
    const aBigObj = new WeakRef({
        name: "Backbencher"
    });
    console.log(aBigObj.deref().name);
}
(async function(){
    await new Promise((resolve) => {
        setTimeout(() => {
            callback(); // Гарантированно напечатает "Backbencher"
            resolve();
        }, 2000);
    });

    await new Promise((resolve) => {
        setTimeout(() => {
            callback(); // Нет гарантий, что напечатается "Backbencher"
            resolve();
        }, 5000);
    });
})();

// 3. Финализаторы FinalizationRegistry навешивает колбек на очистку мусора

const registry = new FinalizationRegistry((value) => {
    console.log(value);
});

(function () {
    const obj = {};
    registry.register(obj, "Backbencher");
})();

// 4. Promise.any() и AggregateError

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("A"), Math.floor(Math.random() * 1000));
});
const p2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("B"), Math.floor(Math.random() * 1000));
});
const p3 = new Promise((resolve, reject) => {
    setTimeout(() => resolve("C"), Math.floor(Math.random() * 1000));
});

(async function() {
    const result = await Promise.any([p1, p2, p3]);
    console.log(result); // Печатает "A", "B" или "C"
})();

//если не сработает - AggregateError - спец ошибка в консоль

// 5. Оператор логического присваивания
// &&=  Поскольку x - истинное значение, ему присваивается значение y, то есть 2.
let x = 1; 
let y = 2;
x &&= y; 
console.log(x); // 2
// ||=   операция присваивания происходит, только если x является ложным значением
let xx = 1; 
let yy = 2;
xx ||= yy;
console.log(xx); // 1
// ??= проверка null или undefined 
// если значение a равно null или undefined, правая часть ?? вычисляется и присваивается переменной b.
let a;
let b = a ?? 5;
console.log(b); // 5
let z;
let c = 2;
z ??= c;
console.log(z);  //2