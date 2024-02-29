// Class responsible only for logging
class Logger {
    static logs = []

    static showAlert(message) {
        this.logs.push(message)
        alert(message)
    }
}

// Class responsible only for validating input
class Validator {
    static flags = {
        minLength: 'MIN-LENGTH',
        hasDigit: 'HAS-DIGIT',
    }

    static validate(value, flag, validatorValue) {
        if (flag === this.flags.minLength) {
            return value.trim().length >= validatorValue
        }

        if (flag === this.flags.hasDigit) {
            return value.match(/[0-9]/)
        }
    }
}

// Class responsible only for creating valid user
class User {
    constructor(username, password) {
        if (!Validator.validate(username, Validator.flags.minLength, 3))
            throw new Error('Username must be at least 3 characters long')
        if (!Validator.validate(password, Validator.flags.hasDigit))
            throw new Error('Password must contain at least one digit')

        this.username = username
        this.password = password
    }
}

// Class responsible only for from handling
class FormHandler {
    constructor(formElement) {
        this.form = formElement
        this.form.addEventListener('submit', this.handleSubmit.bind(this))
    }

    handleSubmit(e) {
        e.preventDefault()
        const username = e.target.elements.username.value
        const password = e.target.elements.password.value

        try {
            const user = new User(username, password)
            console.log(user)
            console.log(Logger.logs)
        } catch (err) {
            Logger.showAlert(err)
        }
    }
}

const form = document.querySelector('form')
new FormHandler(form)