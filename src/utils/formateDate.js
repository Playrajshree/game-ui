
const dateFormatter = (date) => {
     const dateArr = date.split("-");
     const yearArr = dateArr[0].split("");
     const year = `${yearArr[2]}${yearArr[3]}`
     return `${dateArr[2]}/${dateArr[1]}`;
}

export {dateFormatter}