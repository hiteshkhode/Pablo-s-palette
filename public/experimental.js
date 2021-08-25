var email, password
var inflagcheck = 'login'

function loginflagupdater(event){
    if(event.target.getAttribute('id') === 'loginbutton'){
        inflagcheck = 'login'
        document.getElementById('loginbutton').style.color = 'black'
        document.getElementById('signinbutton').style.color = 'gray'
    }
    else{
        inflagcheck = 'signup'
        document.getElementById('loginbutton').style.color = 'gray'
        document.getElementById('signinbutton').style.color = 'black'
    }
}

document.getElementById("signupsubmit").addEventListener("submit", (event) => {
    event.preventDefault();
    email = document.getElementById('emailinput').value;
    password = document.getElementById('passwordinput').value
    if(inflagcheck === 'signup'){
        fetch('/personadder',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            }).then(data => data.json().then(msg => processalert(msg.fallout)))
    }
    else{
        fetch('/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            }).then(data => data.json().then((msg) => {
                // processalert(msg.fallout);
                if(msg.fallout === 'successul login') renderapp()
            }))
    }
})

function processalert(msg){
    msgbox = document.getElementsByClassName('processalert')[0]
    msgbox.setAttribute('id', '')
    document.getElementById('processalerttext').innerText = msg
}
function closemsgbox(){
    document.getElementsByClassName('processalert')[0].setAttribute('id', 'none')
}

///////////////////////////////////////////////////////BELOW CODE IS FOR APP//////////////////////////////////////////////////////////

function renderapp(){
    refreshuserpalette()
    document.getElementsByClassName('signupbox')[0].setAttribute('id', 'none')
    document.getElementsByClassName('maincontent')[0].setAttribute('id', 'maincontent')
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
    div.innerHTML = '<button onclick="deleteperticularcolor(event)">remove</button>'
    div.setAttribute('class', 'randomcolor')
    div.style.background = 'rgb(' + Math.random()*256 + ', ' + Math.random()*256 + ', ' + Math.random()*256 + ')'
    document.getElementById('colorsofpalette').appendChild(div)
}
function updatelocalpalette(){
    stagedpalette = document.getElementById('colorsofpalette')
    cloneofstaged = stagedpalette.cloneNode(true)
    cloneofstaged.setAttribute('class', 'perticularuserspalettes')
    cloneofstaged.setAttribute('id', '')
    document.getElementById('userspalettes').appendChild(cloneofstaged)
    savepalette()
    // refreshuserpalette()
}
function deleteperticularcolor(event){
    element = event.target.parentNode 
    element.parentNode.removeChild(element)
}
function savepalette(){
    palettestoupload = []
    perticularpalettetoupload = []
    for (let i = 0; i < document.getElementsByClassName('perticularuserspalettes').length; i++) {
        outerpalette = document.getElementsByClassName('perticularuserspalettes')[i].childNodes
        for (let j = 0; j < outerpalette.length; j++) {
            perticularpalettetoupload.push(outerpalette[j].style.backgroundColor)
        }
        palettestoupload.push(perticularpalettetoupload)
        perticularpalettetoupload = []
    }
    fetch('/savepalette', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, palettestoupload}),
        }).then((data => processalert('your palettes updated successfully')))
    refreshuserpalette()
}
function refreshuserpalette(){
    document.getElementById('userspalettes').innerHTML = '<p>Right click to delete palette and left click to edit</p><button onclick="refreshuserpalette()">refresh</button>'
    fetch('/getuserpalettes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
        }).then(data => data.json().then((userpalettes) => {
            colorsforuserpalette = userpalettes.fallout
            for (let i = 0; i < colorsforuserpalette.length; i++) {
                let foroneuserpalette = document.createElement('div')
                foroneuserpalette.setAttribute('class', 'perticularuserspalettes')
                for (let j = 0; j < colorsforuserpalette[i].length; j++) {
                    let colorinuserpalette = document.createElement('div')
                    colorinuserpalette.setAttribute('class', 'randomcolor')
                    colorinuserpalette.style.background = colorsforuserpalette[i][j]
                    foroneuserpalette.appendChild(colorinuserpalette)
                }
                document.getElementById('userspalettes').appendChild(foroneuserpalette)
            }
            listneraddertouserpalettes()
        }))
}
// function userpalettedivgeneration(color){
//     div = document.createElement('div')
//     div.innerHTML = '<button onclick="deleteperticularcolor(event)">remove</button>'
//     div.setAttribute('class', 'randomcolor')
//     div.style.background = color
//     document.getElementById('colorsofpalette').appendChild(div)
// }
function listneraddertouserpalettes(){
    for (let i = 0; i < document.getElementsByClassName('perticularuserspalettes').length; i++) {
        document.getElementsByClassName('perticularuserspalettes')[i].setAttribute('onmousedown', 'paletteswapper(event)')
    }
}
function paletteswapper(event){
    if(event.button === 2){
        console.log('right clicked')
        event.target.parentNode.parentNode.removeChild(event.target.parentNode)
        savepalette()
        return 0
    }
    else{
        console.log('left clicked')
        divtoswap = event.target.parentNode
        clonedivtoswap = divtoswap.cloneNode(true)
        clonedivtoswap.setAttribute('class', '')
        clonedivtoswap.setAttribute('id', 'colorsofpalette')
        for (let i = 0; i < clonedivtoswap.childNodes.length; i++) {
            clonedivtoswap.childNodes[i].innerHTML = '<button onclick="deleteperticularcolor(event)">remove</button>'
            
        }
        manaeuveringdiv = document.getElementById('colorsofpalette')
        manaeuveringdiv.parentNode.removeChild(manaeuveringdiv)
        clonedivtoswap.removeAttribute('onclick')
        document.getElementById('newpalettecreation').appendChild(clonedivtoswap)
    }
}

window.addEventListener('contextmenu', function (e) { 
    e.preventDefault(); 
  }, false);
function reloadpage(){
    window.location.reload();
}