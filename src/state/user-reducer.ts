export type StateType = {
    age: number
    name: string
    childrenCount: number
}

type ActionsType = IncreaseAgeACType | IncreaseChildrenCountACType

const userReducer = (state: StateType, action: ActionsType) => {
    switch (action.type) {
        case "INCREASE_AGE": {
            return {...state, age: state.age+1}
        }
        case "INCREASE_CHILDREN_COUNT": {
            return {...state, childrenCount: state.childrenCount+1}
        }
        default:
            throw new Error('Bad action!')
    }
}

type IncreaseAgeACType = ReturnType<typeof increaseAgeAC>
export const increaseAgeAC = () => {
    return {
        type: 'INCREASE_AGE'
    } as const
}

type IncreaseChildrenCountACType = ReturnType<typeof increaseChildrenCount>
export const increaseChildrenCount = () => {
    return {
        type: 'INCREASE_CHILDREN_COUNT'
    } as const
}

export default userReducer;