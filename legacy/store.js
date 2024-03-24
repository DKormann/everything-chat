
class Writable{
    constructor(key, value){
        this.subscribers = [];
        if (localStorage.getItem(key)){
            value = JSON.parse(localStorage.getItem(key));
        }else{
            localStorage.setItem(key, JSON.stringify(value));
        }
        this.value = value
    }
    set(value){
        if (JSON.stringify(this.value) == JSON.stringify(value))return
        this.value = value
        localStorage.setItem(key, JSON.stringify(value));
        this.subscribers.forEach(subscriber=>subscriber(this.value))
    }
    subscribe(fn){
        this.subscribers.push(fn)
        fn(this.value)
    }
}

const messages = new Writable('messages', [])
