let person={
    fname:"Nishka",
    lname:"Agarwal"
}
console.log(person)
person.age=18
console.log(person)
person.fullname=function(){
    return(this.fname+" "+this.lname)
}
console.log(person.fullname())
console.log(person)
console.log(person["fname"])
