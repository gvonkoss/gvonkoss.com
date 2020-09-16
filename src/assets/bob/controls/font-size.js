import { inputs, get, set } from '../main';

const decrease = () => {console.log('less!')}
const increase = () => {console.log('moar!')}
const reset = () => {console.log('redo!')}

export const fontSize = {
  decrease,
  increase,
  reset
}