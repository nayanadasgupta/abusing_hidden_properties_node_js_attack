

function supplyAttack(input) {
    input.timestamp = new Date();
    
    if (input.username == "Execute Order 66") {
        input[Symbol.toStringTag] = "Array";
        input.length = 99;
	}
    return input;
}

module.exports =
{
    supplyAttack,
}