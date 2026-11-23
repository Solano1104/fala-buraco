import { bancoDeDados } from "@/firebase-config";
import type { Ocorrencia } from "@/types/ocorrencia";
import { collection, getDocs, limit, orderBy, query, Timestamp } from "firebase/firestore";

export async function buscarOcorrencias(): Promise<Ocorrencia[]> {
  // A consulta busca no máximo 50 documentos, já na ordem da lista.
  const consulta = query(collection(bancoDeDados, "ocorrencias"), orderBy("criadoEm", "desc"), limit(50));
  const resultado = await getDocs(consulta);

  return resultado.docs.flatMap((documento) => {
    const { titulo, descricao, status, latitude, longitude, criadoEm } = documento.data();
    if (typeof titulo !== "string" ||
      (status !== "aberto" && status !== "em_execucao" && status !== "resolvido") ||
      typeof latitude !== "number" || !Number.isFinite(latitude) || Math.abs(latitude) > 90 ||
      typeof longitude !== "number" || !Number.isFinite(longitude) || Math.abs(longitude) > 180) {
      return [];
    }

    return [{
      id: documento.id,
      titulo,
      descricao: typeof descricao === "string" ? descricao : undefined,
      status,
      latitude,
      longitude,
      criadoEm: criadoEm instanceof Timestamp ? criadoEm.toDate() : undefined,
    }];
  });
}
