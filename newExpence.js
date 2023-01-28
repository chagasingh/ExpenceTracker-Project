function saveToLocalStorage(event){
    event.preventDefault();
    const amount=event.target.amount.value;
    const description=event.target.description.value;
    const category=event.target.category.value;

    let myObj={
        amount:amount,
        description:description,
        category:category,
    }
    var myObjnew=JSON.stringify(myObj)
    axios.post('https://crudcrud.com/api/64258b7c2576451ea62a22a0cf74144e/expencedata',myObj)
    .then((respone) =>{
        showUserOnScreen(respone.data)
        console.log(respone)
    })
    .catch((err)=>{
        console.log(err)
    })
    // localStorage.setItem(category,myObjnew)
    // showUserOnScreen(myObj)
}

    function showUserOnScreen(myObj){
        const parentEle=document.getElementById('listOfItems')
        const childEle=document.createElement('li')
        childEle.textContent=myObj.amount+'----'+myObj.description+'-----'+myObj.category
        const deleteBtn=document.createElement('input')
        deleteBtn.type="button"
        deleteBtn.value='delete'
        deleteBtn.onclick=() =>{
            axios.delete(`https://crudcrud.com/api/64258b7c2576451ea62a22a0cf74144e/expencedata/${myObj._id}`)
            .then((response) =>{
                parentEle.removeChild(childEle)
            })
            .catch((err) =>{
                console.log(err)
            })
        }

        const editBtn =document.createElement('input')
        editBtn.type='button'
        editBtn.style.color='white'
        editBtn.style.backgroundColor='green'
        editBtn.value='Edit'
        editBtn.onclick=() => {
            axios.delete(`https://crudcrud.com/api/64258b7c2576451ea62a22a0cf74144e/expencedata/${myObj._id}`)
            .then((respone) =>{
                parentEle.removeChild(childEle)
            })
            .catch((err) => {
                console.log(err)
            })
            //localStorage.removeItem(myObj.category)
            //parentEle.removeChild(childEle)

            document.getElementById('amount').value=myObj.amount
            document.getElementById('description').value=myObj.description
            document.getElementById('category').value=myObj.category

        }
        childEle.appendChild(editBtn)
        childEle.appendChild(deleteBtn)
        parentEle.appendChild(childEle) 
    }

    window.addEventListener("DOMContentLoaded",()=>{

        axios.get("https://crudcrud.com/api/64258b7c2576451ea62a22a0cf74144e/expencedata")
        .then((respone) =>{
            console.log(respone)

            for(var i=0;i<respone.data.length;i++){
                showUserOnScreen(respone.data[i])
            }
        })
        .catch((err) =>{
            console.log(err)
        })

    })