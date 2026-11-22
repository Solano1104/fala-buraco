import { bancoDeDados } from "@/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export type TipoReporte = "buraco" | "calçada" | "iluminação" | "outro";

type DadosDoReporte = {
  idNotificante: string;
  titulo: string;
  descricao: string;
  tipo: TipoReporte;
  latitude: number;
  longitude: number;
};

export async function criarReporte(dados: DadosDoReporte): Promise<string> {
  // O Firestore gera o ID e registra a hora no servidor.
  const documento = await addDoc(collection(bancoDeDados, "ocorrencias"), {
    ...dados,
    titulo: dados.titulo.trim(),
    descricao: dados.descricao.trim() || null,
    status: "aberto",
    criadoEm: serverTimestamp(),
  });
  return documento.id;
}
