//This will pull all data to make notifications

export function setTimes(){
    let times = [];
    for(let i in localStorage){
        console.log(i)
        if(i.substr(0,1) === "a"){
            times.push({name: i, time: localStorage.getItem(i)})
        }
    }
    console.log(times)
}

export function pushNotif(){
    let now = new Date();
    let time = now.getHours() + ":" + now.getMinutes();
    console.log(time);
    console.log("running")
    for(let i in localStorage){
        if(localStorage.getItem(i) !== null){
            if(localStorage.getItem(i).substr(0, localStorage.getItem(i).length - 2) === time){
                navigator.serviceWorker.ready.then(registration => {registration.showNotification('This is a test', {body: "Test"})})
            }
        }
    }
}