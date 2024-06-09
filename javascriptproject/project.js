//1.deposit some money
//3. no of lines to bet
//2 . collect  a bet amount
//4.spin the slot machine
//5.check if the user won
//6.give the user their winning
//7.play again

// function deposit(){
//    return 1 
// }
// const x= deposit()
const prompt = require("prompt-sync")();

const rows = 3;
const col = 3;
const symbols_count = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
const symbol_values = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

const deposit = () => {
    while (true) {
        const depositamount = prompt("Enter a deposit amount: ");
        const numberdepositamount = parseFloat(depositamount);

        if (isNaN(numberdepositamount) || numberdepositamount <= 0) {
            console.log("Invalid deposit amount. Please enter a valid amount.");
        }
        else {
            return numberdepositamount;
        }
    }
};
const getnumberoflines = () => {
    while (true) {
        const lines = prompt("Enter number of lines ");
        const numberoflines = parseFloat(lines);

        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3) {
            console.log("Invalid number of lines");
        }
        else {
            return numberoflines;
        }
    }
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter a bet perline: ");
        const numberbet = parseFloat(bet);

        if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance / lines) {
            console.log("Invalid bet,try again");
        }
        else {
            return numberbet;
        }
    }
};
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbols_count)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
        // console.log(symbol,count)

    }
    const reels = [[], [], []];
    for (let i = 0; i < col; i++) {
        const reelsymbols = [...symbols];
        for (let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelsymbols.length);
            const selectedsymbol = reelsymbols[randomIndex];
            reels[i].push(selectedsymbol);
            reelsymbols.splice(randomIndex,1);


        }
    }

return reels;

};



const transpose=(reels)=>{
    const Rows=[];
for(let i=0;i<rows;i++){
    Rows.push([]);
    for(let j=0;j<col;j++){
        Rows[i].push(reels[j][i]);
    }
}

return Rows;
};

const printrows =(Rows)=>{
    for(const row of Rows){
        let rowstring="";
        for(const [i,symbol] of row.entries()){
            rowstring+= symbol
            if(i != row.length-1){
                rowstring+= " | "
            }
        }
        console.log(rowstring);
    }
};
const getwinning=(Rows,bet,lines)=>{
    let winning=0;
    for(let row=0;row<lines;row++){
        const symbols=Rows[row];
        let allsame= true; 


        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allsame=false;
                break;
            }
        }
        if(allsame){
            winning+=bet* symbol_values[symbols[0]]
    }
}
return winning;
};







const game=()=>{
    let balance = deposit();
    while(true){
        console.log(`Your current balance is: ${balance}`);

    
    const numberoflines = getnumberoflines();
    const bet = getBet(balance, numberoflines);
    balance-= bet*numberoflines;
    
    const reels=spin(); 
    const Rows=transpose(reels);
    // console.log(reels);
    // console.log(Rows);
    printrows(Rows);
    const winning = getwinning(Rows,bet,numberoflines);
    balance+=winning;
    console.log(`You won ${winning}`);
if(balance<=0){
    console.log("you ran out of money");
    break;
}

const playagain= prompt("do you want to play again(Y/n)?; ");
if(playagain!="Y") break;
}

};
game();

