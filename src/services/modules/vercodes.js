
var verificationcodes = [];

var passwordresetcodes = [];

async function convertPointsToVbucks(points) {
    const vbucksPer100Points = 1000;
    const vbucks = (points / 100) * vbucksPer100Points;
    return vbucks;
}

module.exports = {
    verificationcodes,
    passwordresetcodes,
    convertPointsToVbucks
}