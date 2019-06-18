import { Color } from 'Style/'

const formatScoreChange = input => {
    if (input === null || input === undefined) {
        return '(N/A)'
    } else if (input > 0) {
        return `(+${input})`
    } else {
        return `(${input})`
    }
}

const getScoreColor = input => {
    if (input === null || input === undefined) {
        return '#777777'
    } else {
        return (input >= 0) ? Color.primary : '#AED581'
    }
}

export default { formatScoreChange, getScoreColor }