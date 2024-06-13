import { getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { createCollection, db } from "../controller/ConnectionFactory";
import { Usuario } from "../model/Usuario";

export const getUsers = async () => {
    let list : Usuario[] = [];
    const listaCol = createCollection('USUARIOS');
    const usersDocs = await getDocs(listaCol);
    usersDocs.docs.forEach((lista) => {
        
        list.push({
            nome: lista.data().nome,
            email: lista.data().email,
            nivel: lista.data().nivel,
            status: lista.data().status,
            uid: lista.data().uid,
            stamp: lista.data().stamp,
            profilePhoto: lista.data().profilePhoto
        });
    });
    return list;
}

export const getUser = async(email: string) => {
    const docRef = doc(db, 'USUARIOS', email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        let usuario: Usuario = {
            nome: docSnap.data().nome,
            email: docSnap.data().email,
            nivel: docSnap.data().nivel,
            status: docSnap.data().status,
            uid: docSnap.data().uid,
            stamp: docSnap.data().stamp,
            profilePhoto: docSnap.data().profilePhoto
        }    
        return usuario;
    } else {
        return undefined;
    }
}