//Movimiento de dinero(Crear transaccion)
//Obtener transacciones 
//Obtener transaccion por usuario 

import TransactionModel from "../models/TransactionModel.js"

class ManagerAccount {
    constructor(accountFromId, accountTold, type, amount, description){
        this.accountFromId = accountFromId;
        this.accountTold = accountTold;
        this.type = type;
        this.amount = amount;
        this.description = description;
    }

    async createTransaction(){
        try {
            const transaction = TransactionModel.create({
                accountFromId: this.accountFromId, 
                accountTold: this.accountTold, 
                type: this.type,
                amount: this.amount, 
                description: this.description
            })
            return transaction;
        } catch (error) {
            throw new Error(`Error al crear la transaccion:${error}`) 
        }
    }

    async getTransaction(id){
        try {
            const transaction = await TransactionModel.findById(id);
            return transaction;
        } catch (error) {
            throw new Error(`Error al crear la transaccion:${error}`) 

        }
    }

    async getTransaction(id){
        try {
            const transaction = await TransactionModel.findById(id);
            return transaction;
        } catch (error) {
            throw new Error(`Error al obtener la transaccion:${error}`) 

        }
    }

    async getTransactions(){
        try {
            const transactions = await TransactionModel.find();
            return transactions;
        } catch (error) {
            throw new Error(`Error al obtener las transacciones:${error}`) 

        }
    }

    async getUserTransactions(accountFromIdId){
        try {
            const transaction = await TransactionModel.find(accountFromIdId);
            return transaction;
        } catch (error) {
            throw new Error(`Error al obtener las transacciones:${error}`) 

        }
    }
}