const $=(selection)=>{
    return document.querySelector(selection)
}
const $$=(selection)=>{
    return document.querySelectorAll(selection)
}
const createElement = (tagName, className, content) => {
    const newElement = document.createElement(tagName);
        if(className){
            newElement.setAttribute('class', className);
        }
        if(content){
            newElement.innerHTML = `${content}`
        }
        return newElement;
}
