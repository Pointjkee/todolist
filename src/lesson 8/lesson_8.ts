// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {   //rest оператор
    return nums.reduce((acc, cur) => {
        return acc + cur;
    })
}


// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний,
//  - "01", если треугольник равнобедренный,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.

export function getTriangleType(a: number, b: number, c: number): any {
    let result: string
    if (a === b && a === c) {
        result = '10'
        return result
    }
    if (
        (a + b) > c && (a === b) && (a !== c) ||
        (a + c) > b && (a === c) && (a !== b) ||
        (b + c) > a && (b === c) && (b !== a)
    ) {
        result = '01'
        return result
    }
    if (
        (a + b) > c && (b + c) > a && (a + c) > b && (a !== b) && (b !== c) && (a !== c)
    ) {
        result = '11'
        return result
    }
    if (
        (a + b) < c || (b + c) < a || (a + c) < b
    ) {
        result = '00'
        return result
    }
}


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
    let sum
    sum = number.toString().split('')
    return sum.reduce((acc, cur) => {
        acc = acc + +cur
        return acc
    }, 0)
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let a = 0
    let b = 0
    arr.map((currentNumber, index) => index % 2 === 0 ? a += currentNumber : b += currentNumber)
    return a > b;
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.


export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    let a: Array<number> = []
    array.map(t => {
        if (t > 0 && (Number.isInteger(t))) {
            a.push(Math.pow(t, 2))
        }
        return t
    })
    return a

}


// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    return N === 0 ? 0 : N + sumFirstNumbers(N - 1)
}


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    let arr: Array<number>
    let tisycha
    let pitsot
    if (Math.trunc(amountOfMoney / 1000)) {
        tisycha = Math.trunc(amountOfMoney)
        if ((amountOfMoney / 1000) % tisycha) {
            pitsot = Math.trunc((amountOfMoney / 1000) % tisycha)
        }
    }

    return [0]
}