import { Coordenadas } from "@/context/cidade-context";
import { buscarOcorrencias } from "@/services/ocorrencias";
import { Ocorrencia } from "@/types/ocorrencia";
import { useEffect, useState } from "react";

const listaVazia: Ocorrencia[] = [];

export function useOcorrencias(coordenadas: Coordenadas | null) {
  const [resultado, setResultado] = useState<{
    coordenadas: Coordenadas;
    lista: Ocorrencia[];
  } | null>(null);

  useEffect(() => {
    if (!coordenadas) return;

    let ativo = true;
    buscarOcorrencias(coordenadas)
      .catch((erro) => {
        console.warn("Falha ao carregar ocorrências", erro);
        return listaVazia;
      })
      .then((lista) => {
        if (ativo) setResultado({ coordenadas, lista });
      });

    return () => {
      ativo = false;
    };
  }, [coordenadas]);

  return {
    ocorrencias: resultado?.coordenadas === coordenadas ? resultado.lista : listaVazia,
    carregando: coordenadas !== null && resultado?.coordenadas !== coordenadas,
  };
}
