let mobile = "+1(123)656899";

if(String(mobile).includes('(')) {
    console.log(mobile.replace('(', '').replace(')', ''))
}