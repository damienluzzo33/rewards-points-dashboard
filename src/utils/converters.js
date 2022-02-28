
export function convertToPoints(total) {
    let rewardsPoints = 0;
    if (total > 100) {
        rewardsPoints += 50;
        let newTotal = total - 100;
        rewardsPoints = rewardsPoints + (newTotal * 2);
    } else if (total > 50) {
        let newTotal = total - 50;
        rewardsPoints = rewardsPoints + newTotal;
    }
    return rewardsPoints;
}

export function dateConverter(dateStr) {
    let dateData = dateStr.split("/");
    let month = dateData[0];
    return month;
}

export function getMonth(num) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const answer = months[num - 1];
    return answer;
}