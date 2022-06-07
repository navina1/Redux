const redux=require('redux')
const produce=require('immer').produce


const initialState={
    name:'Navina',
    address:{
        Housename:'Punartham',
        PO:'Kanhirode',
        PIN:670592,
        State:'Kerala'
    }

}

const HOUSENAME_UPDATED='HOUSENAME_UPDATED'

const updateHousename=(Housename)=>{
    return{
        type:HOUSENAME_UPDATED,
        payload:Housename
    }
}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case HOUSENAME_UPDATED:
            // return{
            //     ...state,
            //     address:{
            //         ...state.update,
            //         Housename:action.payload
            //     }
            // }

            return produce(state, (draft)=>{
                draft.address.Housename=action.payload
            })
        default:{
            return state
        }
    }
}

const store=redux.createStore(reducer)
console.log('initialState',store.getState())
const unsubscribe=store.subscribe(()=>{
    console.log('UpdatedState',store.getState())
})
store.dispatch(updateHousename('Shivoham'))
unsubscribe()