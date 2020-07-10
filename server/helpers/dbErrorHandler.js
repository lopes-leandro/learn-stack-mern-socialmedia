
const getErrorMessage = (err) => {
    let message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessager(err);
                break;
            default:
                message = 'Algo deu errado';
                break;
        }
    } else {
        for (const errName in err.errors) {
            if (err.errors[errName].message) {
                message = err.errors[errName].message;
            }
        }
    }
    return message;
}

const getUniqueErrorMessager = (err) => {
    let output = '';
    try {
        let fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2,
            err.message.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'já existe'

    } catch (err) {
        output = 'O campo exclusivo já existe'
    }
    return output;
}

export default { getErrorMessage }