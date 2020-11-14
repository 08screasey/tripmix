export default function (thing1, thing2){
    let regex = new RegExp(thing1, "i")
    return regex.test(thing2)
}