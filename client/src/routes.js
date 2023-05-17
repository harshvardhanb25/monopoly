import Game from './pages/Game.svelte'
import Login from './pages/Login.svelte'
import Error from './pages/Error.svelte'

export const routes = {
    "/": Game,
    "/login": Login,
    "*": Error
};