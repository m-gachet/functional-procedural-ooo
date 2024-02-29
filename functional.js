const FLAGS = {
    minLength: 'MIN-LENGTH',
    hasDigit: 'HAS-DIGIT',
}

// Function that handles validation
const validate = (value, flag, validatorValue) => {
    switch (flag) {
        case FLAGS.minLength:
            return value.trim().length >= validatorValue

        case FLAGS.hasDigit:
            return !!value.match(/[0-9]/)
    }
}

// Function that sets submit handler
const setFormSubmitHandler = (formId, onSubmit) => {
    const form = document.getElementById(formId)
    form.addEventListener('submit', onSubmit)
}

// Function that returns values of required fields as object
// In this case it will return {username: "<value>", password: "<value>"}
// It might look scary but keep in mind that it's completely reusable
const getFormValues = (e, ...fields) => {
    const values = Object.entries(e.target.elements)
    const filteredValues = values.filter(([key]) => fields.includes(key))
    return filteredValues.reduce(
        (acc, [key, { value }]) => ({ ...acc, [key]: value }),
        {}
    )
}

// Function that creates valid user
const createUser = (username, password) => {
    if (!validate(username, FLAGS.minLength, 3))
        throw new Error('Username must be at least 3 characters long')
    if (!validate(password, FLAGS.hasDigit))
        throw new Error('Password must contain at least one digit')

    return { username, password }
}

// Function that creates logger object with *logs* and *showAlert* function
const logger = (() => {
    const logs = []
    return {
        logs,
        showAlert: message => {
            logs.push(message)
            alert(message)
        },
    }
})()

// Main function
const handleSubmit = e => {
    e.preventDefault()
    const { username, password } = getFormValues(e, 'username', 'password')

    try {
        const user = createUser(username, password)
        console.log(user)
        console.log(logger.logs)
    } catch (error) {
        logger.showAlert(error)
    }
}

setFormSubmitHandler('user-form', handleSubmit);