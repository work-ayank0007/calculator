class Stack {
    constructor() {
        this.items = [];
    }

    push(element) {
        this.items.push(element);
    }

    pop() {
        if (this.items.length === 0) {
            return "Underflow";
        }
        return this.items.pop();
    }
    peek(){
        if (this.items.length===0) {
            return -1;
        }
        return this.items[(this.items.length)-1]
    }
    precedence(symb){
        switch (symb) {
            case '*':
                return 2
            
            case '/':
                return 2
            
            case '%':
                return 2
            
            case '+':
                return 1
            
            case '-':
                return 1
            default :
                return 0
        }
    }
}
let result=document.getElementById("result");
// console.log(result.value);

let stack=new Stack();

function clear(){
    console.log(result.value);
    result.value= "";
    stack.items=[];
}


function bksp() {
    result.value=result.value.substring(0,result.value.length-1)
}

function append(symb) {
    // console.log(result.value.length);
    
    // console.log(symb);
    if (result.value.length ==0 && symb==='-') {
        // console.log("minus wla");
        
        result.value+=symb
        return
    }
    if (result.value.length ==0 && isNaN(symb)) {
        return
    }
    // console.log( isNaN(result.value.charAt(result.value.length-1)));
    
    if (isNaN(result.value.charAt(result.value.length-1)) && isNaN(symb)) {
        return
    }else{
        result.value+=symb;
    }
};

function res() {
    let exp=[];
    for (let i = 0; i< result.value.length; i++) {
        let value='';
        if (result.value.charAt(i)==='-' && i===0) {
            value+=result.value.charAt(i);
            i++;
        };
        if(!isNaN(+result.value.charAt(i))){
            do{
                value+=result.value.charAt(i);
                i++;
            }
            while (!isNaN(+result.value.charAt(i)) && i<result.value.length)
                i--;
        }else{
            value+=result.value.charAt(i);
        }
        exp.push(value);
    }

    // converting to postfix 
    let res = [];
    
    for (let i = 0; i < exp.length; i++) {
        let token = exp[i];
    
        if (!isNaN(token)) {
            res.push(token);
        } else if (stack.peek() === -1) {
            stack.push(token);
        } else if (stack.precedence(stack.peek()) < stack.precedence(token)) {
            stack.push(token);
        } else if (stack.precedence(stack.peek()) >= stack.precedence(token)) {
            while (stack.peek() !== -1 && stack.precedence(stack.peek()) >= stack.precedence(token)) {
                res.push(stack.pop());
            }
            stack.push(token);
        }
    }
    
    while (stack.peek() !== -1) {
        res.push(stack.pop());
    }
    
    // console.log(res);
    
    result.value=evaluatePostfix(res);
    stack.items.push(result.value)
}

function evaluatePostfix(postfix) {
    let stack = [];
    
    for (let i = 0; i < postfix.length; i++) {
        let token = postfix[i];
        
        if (!isNaN(token)) {
            stack.push(Number(token));
        } else {
            let val1 = stack.pop();
            let val2 = stack.pop();
            
            switch (token) {
                case '+':
                    stack.push(val2 + val1);
                    break;
                case '-':
                    stack.push(val2 - val1);
                    break;
                case '*':
                    stack.push(val2 * val1);
                    break;
                case '/':
                    stack.push(val2 / val1);
                    break;
                case '%':
                    stack.push(val2 % val1);
                    break;
                default:
                    throw new Error('Unknown operator: ' + token);
            }
        }
    }
    return stack.pop();
}


let ele = document.getElementById('clear');
document.getElementById("clear").addEventListener("click",clear);

