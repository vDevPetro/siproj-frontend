import { getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { createCollection } from "../controller/ConnectionFactory";

export const getEmpresas = async () => {
    let list : any[] = [];
    const listaCol = createCollection('BASE');
    const empDocs = await getDocs(listaCol);
    empDocs.docs.forEach((lista) => {
        
        list.push({
            id: lista.id,
            nome: lista.data().nome,
            cnpj: lista.data().cnpj,
            contratoicj: lista.data().contrato_icj,
            contratosap: lista.data().contrato_sap,
            cliente: lista.data().cliente,
            objeto: lista.data().objeto,
            contato: lista.data().contato,
            iniciocontrato: lista.data().inicio_contrato,
            fimcontrato: lista.data().termino_contrato,
            valorcontrato: lista.data().valor_contrato
        });
    });
    return list;
}

export const listarContratos = async () => {
    let list : any[] = [];
    const listaColection = createCollection('BASE');
    const empDocs = await getDocs(listaColection);
    empDocs.docs.forEach((item) => {
        list.push({
            label: item.data().contrato_sap
        });
    });
    return list;
}