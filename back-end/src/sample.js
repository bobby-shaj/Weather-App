const localtime = "2022-01-29 15:39"; 

let arr = localtime.split(' '); 
const date = arr[0];
const time = arr[1];
arr = time.split(':');
const hour = arr[0]; 
console.log(hour);