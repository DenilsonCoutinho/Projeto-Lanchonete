import Router from "next/router"

export async function scrollToDiv(element) {

    const divToView = document.getElementById(element)
    if (divToView !== null) {
        divToView?.scrollIntoView({ behavior: "smooth", inline: "start" })
    }
    else {
        
        Router.push('/')

        while (window.location.pathname !== '/') {
            
           await new Promise (resolve => setTimeout(()=> {
               resolve()
           },10))
           
        }
        const ditToRedirect = document.getElementById(element)
            ditToRedirect?.scrollIntoView({behavior: 'smooth', block: "start" })
    }
}