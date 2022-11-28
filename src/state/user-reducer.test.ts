import userReducer, {increaseAgeAC, increaseChildrenCount, StateType} from "./user-reducer";

let user: StateType;

beforeEach(()=>{
    user = {
        age: 30,
        childrenCount: 1,
        name: 'Egor'
    }
})

test('reducer should increase users age', ()=>{
    let newUser=userReducer(user, increaseAgeAC())

    expect(newUser.age).toBe(31)
    expect(newUser.childrenCount).toBe(1)
    expect(user.age).toBe(30)
})

test('reducer should increase users children count', ()=>{
    let newUser=userReducer(user, increaseChildrenCount())

    expect(newUser.childrenCount).toBe(2)
    expect(user.childrenCount).toBe(1)
})

test('reducers should increase users age and children count', ()=>{
    let newUser=userReducer(user, increaseAgeAC())
    newUser=userReducer(newUser, increaseChildrenCount())

    expect(newUser.age).toBe(31)
    expect(newUser.childrenCount).toBe(2)
    expect(user.age).toBe(30)
    expect(user.childrenCount).toBe(1)
})

test('reducer should throw error', ()=>{
    expect(()=>userReducer(user, {type: '123'})).toThrow('Bad action!')
})