console.log('Start...')
const testform=document.querySelector('#form')
const message=document.querySelector('#message')
const namedata=document.querySelector('#name')
const emaildata=document.querySelector('#email')
const desgdata=document.querySelector('#desg')
const qlfidata=document.querySelector('#qlfi')
const depdata=document.querySelector('#dep')
const dojdata=document.querySelector('#doj')

testform.addEventListener('submit',(e)=>{
	e.preventDefault()
	name=namedata.value
	email=emaildata.value
	desg=desgdata.value
	qlfi=qlfidata.value
	dep=depdata.value
	doj=dojdata.value
	console.log(name,email,desg,qlfi,dep,doj)
    message.textContent="Loading.."
    fetch('/admin/addFacultyDB?name=' + name+'&email='+email+'&desg='+desg+'&qlfi='+qlfi+'&dep='+dep+'&doj='+doj).then((response) => {
        response.json().then((data) => {
            message.textContent=data.msg
        }).catch((e)=>{
            console.log(e)
        })
    })
})