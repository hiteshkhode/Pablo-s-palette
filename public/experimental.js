// var email, password
// var inflagcheck = 'login'

// function loginflagupdater(event){
//     if(event.target.getAttribute('id') === 'loginbutton'){
//         inflagcheck = 'login'
//         document.getElementById('loginbutton').style.color = 'black'
//         document.getElementById('signinbutton').style.color = 'gray'
//     }
//     else{
//         inflagcheck = 'signup'
//         document.getElementById('loginbutton').style.color = 'gray'
//         document.getElementById('signinbutton').style.color = 'black'
//     }
//     console.log(inflagcheck)
// }

// document.getElementById("signupsubmit").addEventListener("submit", (event) => {
//     event.preventDefault();
//     console.log('im here', document.getElementById('emailinput').value)
//     email = document.getElementById('emailinput').value;
//     password = document.getElementById('passwordinput').value
//     if(inflagcheck === 'signup'){
//         fetch('/personadder',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({email, password}),
//             }).then(data => data.json().then(msg => processalert(msg.fallout)))
//     }
//     else{
//         fetch('/login',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({email, password}),
//             }).then(data => data.json().then((msg) => {
//                 processalert(msg.fallout);
//                 if(msg.fallout === 'successul login') renderapp()
//             }))
//     }
// })

// function processalert(msg){
//     msgbox = document.getElementsByClassName('processalert')[0]
//     msgbox.setAttribute('id', '')
//     document.getElementById('processalerttext').innerText = msg
// }
// function closemsgbox(){
//     document.getElementsByClassName('processalert')[0].setAttribute('id', 'none')
// }


///////////////////////////////////////////////////////BELOW CODE IS FOR APP//////////////////////////////////////////////////////////

renderapp()
function renderapp(){
    renderinitialcolors()
}
function renderinitialcolors(){
    document.getElementById('colorsofpalette').innerHTML = ''
    for (let i = 0; i < 5; i++) {
        coloreddivgenerator()
    }
}
function coloreddivgenerator(){
    div = document.createElement('div')
    div.setAttribute('class', 'randomcolor')
    div.style.background = 'rgb(' + Math.random()*256 + ', ' + Math.random()*256 + ', ' + Math.random()*256 + ')'
    document.getElementById('colorsofpalette').appendChild(div)
}
function addpalettetodb(){
    fetch('/addpalettetodb')
}