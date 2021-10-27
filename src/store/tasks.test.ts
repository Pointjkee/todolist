import {div, mult, multiTasker, sub, sum} from "./tasks"

test('Name test', () => {                  //test это ф-ция, принимает 2 параметра, 1й имя теста, 2й ф-ция которая будет выполняться
    const a = 10
    const b = 33

    const result = sum(a,b)
    expect(result).toBe(43)
})

test('Name test 2', () => {
    const a = 10
    const b = 5

    const result = div(a,b)
    expect(result).toBe(2)
})
test('Name test 3', () => {
    const a = 10
    const b = 33

    const result = mult(a,b)
    expect(result).toBe(330)
})
test('Name test 4', () => {
    const a = 10
    const b = 33

    const result = sub(a,b)
    expect(result).toBe(-23)
})

test('Name test 5', () => {

    let result= multiTasker(1, {type:"sum", num:1})

    expect(result).toBe(2)
})