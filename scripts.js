

let displayValue = "0";
let operationType = "";
let operatorLastPressed = false;
let secondNumber = false; //used to signal when the second number was pressed
let firstNumber = 0;

let screenResultClear = false; // used to decide when to clear the list of the operations

let operationOrderListResult = "";

const screenDisplay = document.querySelector('.screen');

const screenOperationDisplay = document.querySelector('.screen-result-operation');

const btnNumberClick = document.querySelectorAll('.number');
btnNumberClick.forEach(button => {
    button.addEventListener('click', () => {


        if(screenResultClear == true)
        {
            screenOperationDisplay.textContent = ""; //reset content of operation list
            screenResultClear = false;
            screenDisplay.textContent = "";
        }    

        if(operatorLastPressed == true)
            secondNumber = true;

        if(screenDisplay.textContent == "Division by 0")
            secondNumber=false;

        if(screenDisplay.textContent == "0" || operatorLastPressed == true || screenDisplay.textContent == "Division by 0")
        {
            screenDisplay.textContent = button.textContent;

            operatorLastPressed = false;
            
            console.log(`Button ${screenDisplay.textContent}`);
        }    
        else
            screenDisplay.textContent = screenDisplay.textContent + button.textContent;
        console.log(`Button ${button.textContent}`);



    });
  });


  const btnClearClick = document.querySelector('.clear');
  btnClearClick.addEventListener('click',() => {
    
    screenDisplay.textContent = "0";
    firstNumber = 0;
    screenOperationDisplay.textContent = ""; //reset content of operation list

  })

  const btnDeleteClick = document.querySelector('.delete');
  btnDeleteClick.addEventListener('click',() => {
    
    screenDisplay.textContent = screenDisplay.textContent.slice(0,-1);


  })


  const btnOperationClick = document.querySelectorAll('.operation');
  btnOperationClick.forEach(button => {
      button.addEventListener('click', () => {
  
        if(secondNumber == true) // if the second number was previously pressed evaluate the previous operation
        {
           
            

            screenDisplay.textContent = operate(operationType, parseFloat(firstNumber),parseFloat(screenDisplay.textContent));

            secondNumber = false;
            
            if(screenDisplay.textContent == "Division by 0")
            {
                //screenDisplay.textContent = "0";
                firstNumber = 0;
                operatorLastPressed = false;
                
                console.log(`Button ${screenDisplay.textContent}`);
            }    
        
        
        }

        switch (button.textContent) {
            case "+":
                operationType = "+";
                break;
        
            case "-":
                operationType = "-";
                break;

            case "*":
                operationType = "*";
                break;
            case "/":
                operationType = "/";
                break;    
    
            default:
                break;
        }

        
        firstNumber = screenDisplay.textContent;
        operatorLastPressed = true;
         
      });
    });


  const btnEqualClick = document.querySelector('.equal');
  btnEqualClick.addEventListener('click',() => {

    
    
    console.log(`first number: ${parseInt(firstNumber)}`)
    console.log(`second number: ${screenDisplay.textContent}`)

    screenDisplay.textContent = operate(operationType, parseFloat(firstNumber),parseFloat(screenDisplay.textContent))
    firstNumber = parseFloat(screenDisplay.textContent) //reset result value to first number
    secondNumber = false;
    operatorLastPressed = false;

    screenResultClear = true;

    //screenOperationDisplay.textContent = ""; //reset content of operation list
    //screenDisplay.textContent = parseInt(firstNumber) + parseInt(screenDisplay.textContent)


  })

  const btnDecimalClick = document.querySelector('.decimal');
  btnDecimalClick.addEventListener('click',() => {

    
    
    console.log(`first number: ${parseInt(firstNumber)}`)
    console.log(`second number: ${screenDisplay.textContent}`)

    if(screenDisplay.textContent.includes(".") == false)
        screenDisplay.textContent = screenDisplay.textContent + ".";



   

  })


  const btnClick = document.querySelectorAll('.button');
  btnClick.forEach(button => {
      button.addEventListener('mousedown', () => {

        button.style.backgroundColor = 'Lightgreen';
       
      });
    });

    btnClick.forEach(button => {
        button.addEventListener('mouseup', () => {
  
          button.style.backgroundColor = 'bisque';
         
        });
      });


    const btnModifyClick = document.querySelectorAll('.modify');
    btnModifyClick.forEach(button => {
          button.addEventListener('mousedown', () => {
    
            button.style.backgroundColor = 'Lightgreen';
           
          });
        });
    
    btnModifyClick.forEach(button => {
            button.addEventListener('mouseup', () => {
      
              button.style.backgroundColor = '#e1d56f'
             
            });
          });
    


//add event listener for keyboard 
document.addEventListener('keydown', function(event) {
    if (event.key >= '0' && event.key <= '9') {

        numberPressed(event.key);  
        // Handle the number keypress

        

        //screenOperationDisplay.textContent = screenOperationDisplay.textContent + "" + event.target.textContent;
        screenOperationDisplay.textContent += event.key;
        console.log('You pressed the number ' + event.key);
    }


    if(event.key == '/' || event.key == '+' || event.key == '-' || event.key == '*' )
    {
        screenOperationDisplay.textContent += event.key;
        operationKeyboard(event.key);
    }
        

    if(event.key === "Enter")
    {
        screenOperationDisplay.textContent += event.key;
        equalKeyboard();
    }
        
  });



//add event listener for screen operation order display
document.addEventListener('click', function(event) {

//    operationOrderListResult = operationOrderListResult + " " + event.target.textContent;
//    screenOperationDisplay.textContent = operationOrderListResult;
    if (event.target.classList.contains('button')) 
    {
        screenOperationDisplay.textContent = screenOperationDisplay.textContent + "" + event.target.textContent;
    }

  });

  







function equalKeyboard()
{
    screenDisplay.textContent = operate(operationType, parseFloat(firstNumber),parseFloat(screenDisplay.textContent))
    firstNumber = parseFloat(screenDisplay.textContent) //reset result value to first number
    secondNumber = false;
    operatorLastPressed = false;

    screenResultClear = true; //clear the list 
}

function operationKeyboard(keyPressed)
{
    if(secondNumber == true) // if the second number was previously pressed evaluate the previous operation
    {
       
        

        screenDisplay.textContent = operate(operationType, parseFloat(firstNumber),parseFloat(screenDisplay.textContent));

        secondNumber = false;
        
        if(screenDisplay.textContent == "Division by 0")
        {
            //screenDisplay.textContent = "0";
            firstNumber = 0;
            operatorLastPressed = false;
            
            console.log(`Button ${screenDisplay.textContent}`);
        }    
    
    
    }

    switch (keyPressed) {
        case "+":
            operationType = "+";
            break;
    
        case "-":
            operationType = "-";
            break;

        case "*":
            operationType = "*";
            break;
        case "/":
            operationType = "/";
            break;    

        default:
            break;
    }

    if(screenDisplay.textContent == "Division by 0")
    {
        //screenDisplay.textContent = "0";
    }
    firstNumber = screenDisplay.textContent;
    operatorLastPressed = true;


}


function numberPressed(keyPressed)
{
        if(operatorLastPressed == true)
            secondNumber = true;

        if(screenDisplay.textContent == "Division by 0")
            secondNumber=false;

        if(screenDisplay.textContent == "0" || operatorLastPressed == true || screenDisplay.textContent == "Division by 0")
        {
            screenDisplay.textContent = keyPressed;

            operatorLastPressed = false;
            console.log(`Button ${screenDisplay.textContent}`);
        }    
        else
            screenDisplay.textContent = screenDisplay.textContent + keyPressed;
        console.log(`Button ${keyPressed}`);

}

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
        return "Division by 0"
    else
        return (a/b).toString();
}

function operate(operationType, a,b)
{
    let result;
    switch (operationType) {
        case "+":
            result = add(a,b)
            break;
    
        case "-":
            result = subtract(a,b)
            break;

        case "*":
            result = multiply(a,b)
            break;

        case "/":
            result = divide(a,b)
            break;

        default:
            result = "Wrong operation"
            break;
    }

    return result;

}