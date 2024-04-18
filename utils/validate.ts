export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!regex.test(email)) {
        return true
      }
}

export const validatePhone = (phone) => {
    if (phone.length !== 10) {
        return true
    }
}

export const validatePassword = (password) => {
    if (password.length < 8) {
        return true
    }
}