var fs=require('fs');
var os=require('os');

var user=os.userInfo();
console.log(user);
console.log(user.username);

fs.appendFile('greeting.txt','hi '+user.username +'!',()=>{
    console.log('file is created');
});
