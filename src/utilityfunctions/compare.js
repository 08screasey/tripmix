import quicktest from "./quicktest";

export default function (obj1, obj2){
    let foundData = null;

    obj1.labels.forEach((label)=>{
        obj2.interactions.forEach(interaction=>{
            if(quicktest(label, interaction.name)){
                foundData = interaction
            }
        })
    })
    obj2.labels.forEach((label)=>{
        obj1.interactions.forEach(interaction=>{
            if(quicktest(label, interaction.name)){
                foundData = interaction
            }
        })
    })
    obj1.interactions.forEach(obj=>{
        if(quicktest(obj2.name,obj.name)||(obj2.name.includes('2C')&&obj.name.includes('2C'))){
            foundData = obj
        }
    })
    obj2.interactions.forEach(obj=>{
        if(quicktest(obj1.name,obj.name)){
            foundData = obj
        }
    })
    console.log(foundData)
    return foundData ? foundData : {category:"N/A", details:"No details of combination"}
}