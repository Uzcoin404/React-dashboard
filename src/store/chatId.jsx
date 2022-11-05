import { createStore } from "redux";

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object. It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 */
function counterReducer(state = { chatId: null }, action) {
    let hash = window.location.hash.substring(1);
    if (hash.trim() != "" && !isNaN(hash)) {
        return { chatId: hash };
    }
    // window.addEventListener("hashchange", getHashUrl, {
    //     once: true,
    // });
    window.location.hash = "";
    return { chatId: null };
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counterReducer);

store.subscribe(() => console.log(store.getState()))


// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// There may be additional use cases where it's helpful to subscribe as well.

export default window.addEventListener("hashchange", function() {
    store.dispatch({type: 'hashListener'})
});
