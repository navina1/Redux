const redux =require('redux');
const createStore=redux.createStore
const bindActionCreators=redux.bindActionCreators

const combineReducers=redux.combineReducers


const reduxLogger=require('redux-logger')
const logger=reduxLogger.createLogger
const applyMiddleware=redux.applyMiddleware



const CAKE_ORDERED='CAKE_ORDERED'
const CAKE_RESTOCKED='CAKE_RESTOCKED'
const ICECREAM_ORDERED='ICECREAM_ORDERED'
const ICECREAM_RESTORED='ICECREAM_RESTOCKED'

function orderCake(){
    return{
        type:CAKE_ORDERED,  
        payload:1
    }
}

function restockCake(qty=1){
    return{
        type: CAKE_RESTOCKED,
        payload:qty
    }
}

function orderIcecream(){
    return{
        type:ICECREAM_ORDERED,
        payload:1
    }
}

function restockIcecream(qty=1){
    return{
        type:ICECREAM_RESTORED,
        payload:qty
    }
}



const initialCakeState={
    numOfCakes:10,
   
}
const initialIceCreamState={
    numOfIcecreams:20
}


// console.log('Initialstate',initialState);





const cakeReducer=(state=initialCakeState ,action)=>{
    switch(action.type){
        case CAKE_ORDERED:
            return{
                ...state,
                numOfCakes:state.numOfCakes-1
            }

        case CAKE_RESTOCKED:
            return{
                ...state,
                numOfCakes:state.numOfCakes + action.payload
            }

        default:
            return state
    }
}

const icecreamReducer=(state=initialIceCreamState,action)=>{
    switch(action.type){
        case ICECREAM_ORDERED:
            return{
                ...state,
                numOfIcecreams:state.numOfIcecreams-1
            }
        case ICECREAM_RESTORED:
            return{
                ...state,
                numOfIcecreams:state.numOfIcecreams+action.payload
            }
        default:
            return state
    }
}


const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:icecreamReducer
})







const store=createStore(rootReducer,applyMiddleware(logger))

const unsubscribe= store.subscribe()
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(5))

const actions=bindActionCreators({orderCake,restockCake,orderIcecream,restockIcecream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(5)
actions.orderIcecream()
actions.restockIcecream(10)


unsubscribe() 
