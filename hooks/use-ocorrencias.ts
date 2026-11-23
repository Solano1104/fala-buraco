import { buscarOcorrencias } from "@/services/ocorrencias";
import type { Ocorrencia } from "@/types/ocorrencia";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

export function useOcorrencias() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [versao, setVersao] = useState(0);
  const atualizar = useCallback(() => setVersao((valor) => valor + 1), []);

  useFocusEffect(useCallback(() => {
    // Ao voltar do formulário, uma nova busca inclui o reporte recém-gravado.
    let ativo = true;
    setCarregando(true);
    setErro("");

    buscarOcorrencias()
      .then((lista) => { if (ativo) setOcorrencias(lista); })
      .catch((falha) => {
        if (!ativo) return;
        console.warn("Falha ao carregar ocorrências", falha);
        setErro("Não foi possível carregar os reportes.");
      })
      .finally(() => { if (ativo) setCarregando(false); });

    return () => { ativo = false; };
  }, [versao]));

  return { ocorrencias, carregando, erro, atualizar };
}
