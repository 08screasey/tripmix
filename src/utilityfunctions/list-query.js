import quickTest from './quicktest';
export default function (list, query, length, comparingObj){
    console.log(list, query, comparingObj)
    return list.filter((el)=>{
        if(quickTest(query, el)){
            console.log(query, el)
            return true
        }
       const foundObj = comparingObj.find(x=>x.name===el);
        if(foundObj){
            for(let i = 0; i <foundObj.aliases.length; i++){
            if(quickTest(query, foundObj.aliases[i])){
                return true
            }
        }}
        return false
    }).slice(0, length)
}