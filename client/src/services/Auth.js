class Auth {
    set userData(data){
        const encodedData = btoa(JSON.stringify(data))
        localStorage.setItem('userData', encodedData)
    }
    
    get userData(){
        const userData = localStorage.getItem('userData')

        if (!userData) return false

        return JSON.parse(atob(localStorage.getItem('userData')))
    }

    logout(){
        localStorage.removeItem('userData')
        return (window.location = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://op1naton.web.app')
    }
}

export default new Auth()