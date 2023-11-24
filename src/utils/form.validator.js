export function validateFields(fields) {

    const errors = []

    fields.forEach((field) => {
        if (field?.required) {
            switch (field?.type) {
                case 'string':
                    if (field?.value === '') {
                        errors.push(field)
                        try {
                            document.getElementById(field?.name).style.border = '1px solid red'
                        } catch (error) {
                            console.log('error field')
                        }
                    } else if (field?.value !== '') {
                        document.getElementById(field?.name).style.border = ''

                    }
                    break;
                case 'object':
                    if (typeof (field.value) != 'object') {
                        errors.push(field)

                        try {

                            document.getElementById(field?.name).style.border = '1px solid red'
                        } catch (error) {
                        }
                    } else {
                        document.getElementById(field?.name).style.border = ''
                    }
                    break;
                case 'number':
                    if (field?.value === 0 || field?.value === null) {

                        try {
                            document.getElementById(field?.name).style.border = '1px solid red'
                        } catch (error) {
                            console.log('error field')
                        }
                    } else {
                        document.getElementById(field?.name).style.border = ''
                    }
                    break;
                default:
                    break;
            }
        }
    })

    return errors
}
