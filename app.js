const roleNames = [
    'მოქალაქე',
    'მაფია',
    'დონი',
    'ექიმი',
    'დეტექტივი',
    'მანიაკი',
    'მონადირე',
    'შერიფი',
    'იაკუძა',
    'აფერისტი',
    'ქურდი',
]
const roles = {
    'მოქალაქე': 0,
    'მაფია': 0,
    'დონი': 0,
    'ექიმი': 0,
    'დეტექტივი': 0,
    'მანიაკი': 0,
    'მონადირე': 0,
    'შერიფი': 0,
    'იაკუძა': 0,
    'აფერისტი': 0,
    'ქურდი': 0,
}
let rolesArray = new Array
let theme = 'classic'

const Get = (el) => {
    return document.querySelector(el)
}

const GetAll = (el) => {
    return document.querySelectorAll(el)
}

let inp = GetAll('input')
let p = GetAll('.roleP')
let n = 0;

const otherRolesDiv = Get('.newRoles')
const otherRoles = GetAll('.newRole')
const rolesDiv = Get('.roles')

otherRolesDiv.style.display = 'none'

for(let i = 0; i < p.length; i++){
    inp[i].id = 'inp' + i;
    p[i].id = i;
    n = i;
}

const Check = () => {
    inp.forEach(i => {

        let oldValue = parseInt(i.defaultValue)
    
        i.addEventListener('focusout', (e) => {
    
            const value = parseInt(e.target.value)
            
            const min = parseInt(e.target.min)
            const max = parseInt(e.target.max)

            if(value == '0111001101101000011000010110111001101111') theme = '8^4'
    
            if(value < min || value > max || e.target.value == '') e.target.value = oldValue.toString()
            else oldValue = value;
    
        })
    
    })
}
Check()

const SetUp = async () => {

    p.forEach(i => {
        roles[ i.textContent ] = document.getElementById( 'inp' + i.id ).value
    })
    roleNames.forEach(role => {
        for(let i = 0; i < roles[role]; i++){
            rolesArray.push(role)
        }
    })

}

const RevealCard = async (h2, card, cardImg) => {

    const random = Math.floor( Math.random() * rolesArray.length )
    const Role = rolesArray[ random ]
    
    h2.style.display = 'none'
    cardImg.src = `./${theme}/${Role}.PNG`
    card.style.display = ''
    rolesArray.splice(
        rolesArray.indexOf( Role ),
        1
    )

}

const Start = () => {

    const maxClicks = rolesArray.length
    let clicks = 0;

    document.body.innerHTML = `
        <h2>დააჭირე როლის სანახავად</h2>
        <div class='card'>
            <img class='cardImg' />
        </div>
    `;

    const h2 = Get('h2')
    const card = Get('.card')
    const cardImg = Get('.cardImg')

    card.style.display = 'none'

    h2.addEventListener('click', async () => {
        await RevealCard(h2, card, cardImg)
    })

    card.addEventListener('click', async () => {

        clicks++
        card.style.display = 'none'
        h2.style.display = ''
        if(clicks == maxClicks){
            h2.style.display = 'none'
            End()
        }

    })

}

const End = () => {
    document.body.innerHTML = '<h3>გადატვირთე საიტი ხელახლა თამაშისთვის</h3>'
}

const changeP = () => {

    p = GetAll('.roleP')
    inp = GetAll('input')

    n++
    p[n].id = n;
    inp[n].id = 'inp' + n;
    Check()

}

const addBt = Get('#addRole')
addBt.addEventListener('click', () => {

    otherRolesDiv.style.display = '';
    otherRoles.forEach(i => {

        i.addEventListener('click', (e) => {

            const name = e.target.dataset.role

            rolesDiv.innerHTML += `
            <div class="role">
                <p class="roleP">${name}</p>
                <input type="number" min="0" max="1" value="1">
            </div>
            `
            otherRolesDiv.style.display = 'none'  

            changeP()

        })


    })

})

const startBt = Get('#start')
startBt.addEventListener('click', async () => {
    await SetUp()
    Start()
})