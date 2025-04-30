const dateFormatter = (date) => {
     const dateArr = date.split("-");
     return `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
}

export {dateFormatter}