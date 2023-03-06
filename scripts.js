
function add(a,b)
{
    return (a+b).toString();
}


function subtract(a,b)
{
    return (a-b).toString();
}


function multiply(a,b)
{
    return (a*b).toString();
}

function divide(a,b)
{
    if(b==0)
        return "NaN"
    else
        return (a/b).toString();
}

function operate(operationType, a,b)
{
    let result;
    switch (operationType) {
        case "add":
            result = add(a,b)
            break;
    
        case "subtract":
            result = subtract(a,b)
            break;

        case "multiply":
            result = multiply(a,b)
            break;

        case "divide":
            result = divide(a,b)
            break;

        default:
            result = "Wrong operation"
            break;
    }

    return result;

}