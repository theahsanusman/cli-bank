import inquirer from "inquirer";

type Gender = 'Male' | 'Female' | 'Other';
class Customer {
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    mobileNumber: number;
    bankAccount: BankAccount;

    constructor(firstName: string, lastName: string, age: number, gender: Gender, mobileNumber: number, bankAccount: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.bankAccount = bankAccount;
    }

    getCustomerInfo() {
        return `First name: ${this.firstName}
Last name: ${this.lastName}
Age: ${this.age}
Gender: ${this.gender}
Mobile Number: ${this.mobileNumber}
Balance: ${this.bankAccount.balance}`;
    }

}
interface BankAccountITF {
    balance: number;
    credit(amount: number): void;
    debit(amount: number): void;
}

class BankAccount implements BankAccountITF {
    balance;

    constructor() {
        this.balance = 0;
    }

    credit(amount: number) {
        if (amount <= 0) return console.log('Transaction Failed!');
        this.balance += amount;
        if (amount > 100) this.balance -= 1;
        console.log(`Transaction Succesfull! Your new balance is ${this.balance}`);
    }

    debit(amount: number) {
        if (amount <= 0) return console.log('Enter Valid Number!');
        if (amount > this.balance) return console.log(`You're not having enough Balance to do this transaction. Your current balance is ${this.balance}`);
        this.balance -= amount;
        console.log(`Transaction successful! Your updated balance is ${this.balance}`);

    }
}

class Bank {
    customers: Customer[] = [];
    bankAccounts: BankAccount[] = [];
    enter() {
        console.log(`Welcome to the Citi Bank`);
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "What's your first name?"
            },
            {
                type: 'input',
                name: 'lastName',
                message: "What's your last name?"
            },
            {
                type: 'number',
                name: 'age',
                message: "What's your age?"
            },
            {
                type: 'list',
                name: 'gender',
                message: "What's your gender?",
                choices: ['Male', 'Female', 'Other']
            },
            {
                type: 'number',
                name: 'mobileNumber',
                message: "What's your mobile number?"
            }
        ]).then(async res => {
            const newBankAccount = new BankAccount();
            this.customers.push(new Customer(res.firstName, res.lastName, res.age, res.gender, res.mobileNumber, newBankAccount));
            const nextStep = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    choices: ['Credit', 'Debit'],
                    message: 'What would you like to do?'
                },
                {
                    type: 'number',
                    name: 'amount',
                    message: 'Enter the amount'
                }
            ]);
            if (nextStep.action === 'Credit') {
                this.customers[0].bankAccount.credit(nextStep.amount)
            }
            else if (nextStep.action === 'Debit') {
                this.customers[0].bankAccount.debit(nextStep.amount)
            }
        })
    }
}
const cityBankBranch = new Bank();
cityBankBranch.enter();