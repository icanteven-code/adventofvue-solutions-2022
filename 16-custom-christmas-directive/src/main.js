import { createApp } from 'vue'
import App from './App.vue'
import './base.css'

const app = createApp(App)

// Original solution - Function Shorthand 
app.directive('christmas', (el, binding) => {
  let colorClass = 'red-green';
  switch (binding.arg) {
    case 'red':
      colorClass = 'red'
      break;
    case 'green':
      colorClass = 'green'
      break;
  }

  if (binding.value) {
    el.style = `--animation-duration: ${binding.value}s;`
  }

  el.classList.add('christmas-text', colorClass)
})


// Solution 2 - using life cycles (hook functions)
// app.directive('christmas', {
//   created(el, binding) {
//     let colorClass = 'red-green';
//     switch (binding.arg) {
//       case 'red':
//         colorClass = 'red'
//         break;
//       case 'green':
//         colorClass = 'green'
//         break;
//     }

//     if (binding.value) {
//       el.style = `--animation-duration: ${binding.value}s;`
//     }

//     el.classList.add('christmas-text', colorClass)
//   },
// })

app.mount('#app')
