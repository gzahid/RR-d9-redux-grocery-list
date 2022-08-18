// Establish DOM elements as variables
const grocerySubmit = document.getElementById('addGrocery')
const list = document.getElementById('list')
const clearBtn = document.getElementById('clear')

// Instantiate default state value:
const initialState = {
    groceries: []
}

// establish the reducer. Takes initial state value and an action as arguments.
const groceryReducer = (state = initialState.groceries, action) => {
    switch(action.type) {
        case 'grocery/add':
            return [
                ...state,
                {
                    text: action.text
                }
            ]
        case 'grocery/clear':
            return []
        default:
            return state
    }
}

// store creation
let store = Redux.createStore(groceryReducer)

const renderList = (state) => {
    while(list.firstChild) {
        list.removeChild(list.firstChild)
    }
    state.forEach(grocery => {
        // Generate a new list element
        let li = document.createElement('li')
        // append the new element
        list.appendChild(li)
        // populate text
        li.textContent = grocery.text
    })
}


const newGrocery = (e) => {
    e.preventDefault()
    let groceryText = document.getElementById('newItem').value
    store.dispatch({
        type: 'grocery/add',
        text: groceryText
    })
    console.log(store.getState())
}


const clearList = () => {
    document.getElementById('newItem').value = ''
    store.dispatch({
        type: 'grocery/clear'
    })
}

grocerySubmit.addEventListener('click', (e) => {newGrocery(e)})
clearBtn.addEventListener('click', clearList)

const render = () => {
    const state = store.getState()
    renderList(state)
}

store.subscribe(render)
