const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
}

export const getFormatDate = () => {
    const date = new Date();
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const ordinalSuffix = getOrdinalSuffix(day);
    
    const formattedDate = `${dayOfWeek}, ${day}${ordinalSuffix} of ${month} ${year}`;
    return formattedDate;
}