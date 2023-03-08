function timeFunc() {
    const now = Date.now();
    console.log(now.getHours)
}

timeFunc()

import('lodash').then(() =>{
    console.log('Lodash', _.random(0, 42, true))
})