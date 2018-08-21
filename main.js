//DOIS ELEVADOS


function addWeeks (weeks) {
    var date = new Date(2017, 08, 13);
    for(let i= 0; i<weeks;i++){
        date.setDate(date.getDate() +  7);
    }
    return date;
}

function nextWeek(num){
    let weeks = 1
    for(let i = 0; i<num;i++){
        weeks *=2
    }
    return addWeeks(weeks)
}

function pupolate2(){
    let data = new Date(2017, 08, 13)
    let datas = [data]

    for(let i =0;i<15;i++){
        datas.push(nextWeek(i))
    }

    return datas
}

//ANIVERSARIOS

function addYears(data,num){
    var year    = data.getFullYear();
    var month = data.getMonth();
    var day      = data.getDate();
    return new Date(year + num, month, day)
}

function pupolateKid(){
    let dKid = new Date(2017, 4, 16)
    let datas = []
    for(let i= 0; i<15; i++){
        datas.push(addYears(dKid, i))
    }
    return datas
}

function pupolateMistolim(){
    let dMis = new Date(2017, 06, 30)
    let datas = []

    for(let i= 0; i<15; i++){
        datas.push(addYears(dMis, i))
    }
    return datas
}


//Orders

function turnToObj(array,string,def){
    let obj = []
    let i = -1
    array.forEach( function(elem){
    let now = new Date()    
        if(string ==="twos"){
            if(now - elem < 0){
                obj.push({ type: def, num:i, css:string ,date: elem, next:"nextEvent"})
                i++
            }
            else{
                obj.push({ type: def, num:i, css:string ,date: elem, next:""})
                i++
            }
        }
        else{
            if(now-elem < 0){
            obj.push({ type: def, css:string ,date: elem, next:"nextEvent"})   
            }
            else{
                obj.push({ type: def, css:string ,date: elem, next:""})       
            }
        }
    })
    return obj
}

function findSmall(date1, date2){

        if(date1 - date2 < 0){
            return 0
        }
        else{
            return 1
        }
}

function orderMerge(array1, array2){
    let size = array1.length +array2.length
    let array = []
    let ans
    
    while(size>0){
        if(array1[0] === undefined){
            array.push(array2[0])
            array2.shift()
        }
        else if(array2[0] === undefined){
            array.push(array1[0])
            array1.shift()
        }
        else{
            ans = findSmall(array1[0].date,array2[0].date)

            if(ans === 0){
                array.push(array1[0])
                array1.shift()       
            }
            else{
                array.push(array2[0])
                array2.shift()
            }
        }

        size = array1.length + array2.length
    }

    return array
}

function extraObj(){
    let array = []
    
    array.push({ type: '<p>Primeiro jantar e</p><p> primeira foto</p><span style="color: #E8E8D1;">  <i class="fas fa-camera"></i></span>', css:"extra" ,date: new Date(2017,2,1), next:""})
    array.push({ type: '<p>A kid e o mistolas</p><p> são amigos no facebook</p> <span style="color: #E8E8D1;">  <i class="fab fa-facebook-f"></i></span>', css:"extra" ,date: new Date(2017,5,18), next:""})
    array.push({ type: 'Primeiro beijo <span style="color: #E8E8D1;">  <i class="fas fa-kiss-wink-heart"></i></span>', css:"extra" ,date: new Date(2017,6,26), next:""})
    array.push({ type: "KID A TUNANTE", css:"extra" ,date: new Date(2018,3,20), next:""})
    array.push({ type: "MISTOLIM A TUNO", css:"extra" ,date: new Date(2018,7,11), next:""})
    

    return array
}


function order(kid, mistolim,twos){
    let kidObj = turnToObj(kid,'kid', 'Kidolas faz anos <span style="color: #E8E8D1;">  <i class="fas fa-birthday-cake"></i></span>')
    let mistolimObj = turnToObj(mistolim,'mistolim', 'Mistolas faz anos <span style="color: #E8E8D1;">  <i class="fas fa-birthday-cake"></i></span>')
    let twosObj = turnToObj(twos,'twos', "Exponenciais de fofuras")

    let extra = extraObj()

    let array = orderMerge(kidObj, mistolimObj)
    array = orderMerge(array, twosObj)
    array = orderMerge(array,extra)

    return array
}




//PUPOLATES

let kid = pupolateKid()
let mistolim = pupolateMistolim()
let twos = pupolate2()

let orders = order(kid,mistolim,twos)


orders.forEach(function(elem){
    if(elem.num>=0){
       document.write( `
    <div>
        <li class="flex-item ${elem.next} ${elem.css}">${elem.type}<p>2^${elem.num} </p></li>
        <h3 style="text-align: center">  ${elem.date.getDate()}/${elem.date.getMonth()+1}/${elem.date.getFullYear()} </h3>
    </div>

    `)
    }
    else{
       document.write( `
    <div>
        <li class="flex-item ${elem.next} ${elem.css}">${elem.type} </li>
        <h3 style="text-align: center">  ${elem.date.getDate()}/${elem.date.getMonth()+1}/${elem.date.getFullYear()} </h3>
    </div>

    `)
    }
})
