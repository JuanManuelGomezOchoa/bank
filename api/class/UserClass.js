//Registrar usuarios
//Iniciar sesion
//Cerrar sesion
//Obtener informacion del usuario 
//Crear transacciones
//Pedir prestamos
//Borrar cuenta 
//Actualizar

import UserModel from "../models/UserModel.js";
import ManagerAccount from "./AccountClass.js";
import ManagerCard from "./CardClass.js"



class ManagerUser{
    constructor(
        email,
        phone,
        name,
        lastName,
        isInSession,
        isAdmin,
        password
     ){
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.isInSession = isInSession;
        this.isAdmin = isAdmin;
        this.password = password;
    }
    async register(){
        try {
            const user = await UserModel.create({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                isInSession: this.isInSession,
                isAdmin: this.isAdmin,
                password: this.password,
            });
            const MA = new ManagerAccount(user._id, 12345, "Ahorro",10000);
            const CurrentAccount = await MA.createAccount();
            const MC = new ManagerCard(user._id, CurrentAccount._id, "16 digitos al asar", "debito", "De la fecha actual sumar 3 anos", "codigo de 3 cifras", "active");
            await MC.createCard();
            return user;
        } catch (error) {
            throw new Error(`Error al registrar:${error}`) 
        }
        
    }

    async Login(email, password){
        try {
            const user = await UserModel.findOne({email: email});
            if(!user){
                throw new Error('Usuario no registrado')
            }
            if(user.password !== password){
                throw new Error('Constrasena incorrecta')
            }
            return "Success"
        } catch (error) {
            throw new Error(`Error al iniciar sesion:${error}`); 
        }
    }

    async getUserInfo(id){
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener infromacion del usuario:${error}`) 
        }
    }

    async updateEmail(id, email){
        try {
            if(!email){
                throw new Error('Correo invalido')
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{email:email}
             });
             return "OK"
        } catch (error) {
            throw new Error(`Error al actualizar el correo:${error}`) 

        }
    }

    async updatePhone(id, phone){
        try {
            if(!phone){
                throw new Error('Correo invalido')
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{phone:phone}
             });
             return "OK"
        } catch (error) {
            throw new Error(`Error al actualizar el numero de telefono:${error}`) 

        }
    }

    async updatePhone(id, password){
        try {
            if(!password){
                throw new Error('Correo invalido')
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{password:password}
             });
             return "OK"
        } catch (error) {
            throw new Error(`Error al actualizar la contrasena:${error}`) 

        }
    }

    
}

export default ManagerUser;
//Metodos estaticos de tarea