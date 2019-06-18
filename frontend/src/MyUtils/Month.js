const monthIndexToName = (index) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    if (index < month.length) {
        return month[index]
    } else {
        return ""
    }
}

export default { monthIndexToName }