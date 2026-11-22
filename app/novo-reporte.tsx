import { useAuth } from "@/hooks/use-auth";
import { useCidade } from "@/hooks/use-cidade";
import { criarReporte, type TipoReporte } from "@/services/reportes";
import { cores } from "@/styles";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const tipos: { valor: TipoReporte; rotulo: string }[] = [
  { valor: "buraco", rotulo: "Buraco" },
  { valor: "calçada", rotulo: "Calçada" },
  { valor: "iluminação", rotulo: "Iluminação" },
  { valor: "outro", rotulo: "Outro" },
];

export default function NovoReporte() {
  const roteador = useRouter();
  const { user: usuario } = useAuth();
  const { coordenadas, status } = useCidade();
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState<TipoReporte>("buraco");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState("");
  const envioEmAndamento = useRef(false);

  function voltar() {
    if (roteador.canGoBack()) {
      roteador.back();
    } else {
      roteador.replace("/");
    }
  }

  async function enviar() {
    if (envioEmAndamento.current || enviado) return;
    if (!titulo.trim()) {
      setErro("Informe um título para o reporte.");
      return;
    }
    if (!usuario) {
      setErro("Entre com sua conta para enviar um reporte.");
      return;
    }
    if (!coordenadas || status === "negado" || status === "erro") {
      setErro(status === "carregando"
        ? "Aguarde enquanto o app busca sua localização."
        : "Localização indisponível. Permita o acesso à localização e tente novamente.");
      return;
    }

    // A trava também cobre toques repetidos antes de o botão ser desativado na tela.
    envioEmAndamento.current = true;
    setEnviando(true);
    setErro("");
    try {
      // O UID vem da sessão e as coordenadas vêm da localização do aparelho.
      await criarReporte({ idNotificante: usuario.uid, titulo, descricao, tipo, ...coordenadas });
      setEnviado(true);
    } catch (falha) {
      console.warn("Falha ao gravar o reporte", falha);
      setErro("Não foi possível enviar o reporte. Tente novamente.");
    } finally {
      setEnviando(false);
      envioEmAndamento.current = false;
    }
  }

  return (
    <SafeAreaView style={estilos.tela} edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerStyle={estilos.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={estilos.titulo}>Novo reporte</Text>
        {enviado ? (
          <>
            <Text accessibilityRole="alert">Reporte enviado. Obrigado por ajudar a cidade!</Text>
            <Pressable accessibilityRole="button" style={estilos.botao} onPress={voltar}>
              <Text style={estilos.textoBotao}>Voltar</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Text style={estilos.rotulo}>Título</Text>
            <TextInput
              accessibilityLabel="Título do reporte"
              style={estilos.campo}
              placeholder="Ex.: Buraco na Rua das Palmeiras"
              value={titulo}
              onChangeText={setTitulo}
              editable={!enviando}
            />
            <Text style={estilos.rotulo}>Descrição (opcional)</Text>
            <TextInput
              accessibilityLabel="Descrição do reporte"
              style={[estilos.campo, estilos.descricao]}
              placeholder="Descreva o problema"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              editable={!enviando}
            />
            <Text style={estilos.rotulo}>Tipo de ocorrência</Text>
            <View style={estilos.tipos} accessibilityRole="radiogroup">
              {tipos.map(({ valor, rotulo }) => (
                <Pressable
                  key={valor}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: tipo === valor, disabled: enviando }}
                  disabled={enviando}
                  style={[estilos.tipo, tipo === valor && estilos.tipoSelecionado]}
                  onPress={() => setTipo(valor)}
                >
                  <Text style={tipo === valor ? estilos.textoBotao : estilos.rotulo}>{rotulo}</Text>
                </Pressable>
              ))}
            </View>
            {!!erro && <Text accessibilityRole="alert" style={estilos.erro}>{erro}</Text>}
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: enviando, busy: enviando }}
              style={[estilos.botao, enviando && estilos.desativado]}
              onPress={enviar}
              disabled={enviando}
            >
              {enviando && <ActivityIndicator color={cores.branco} />}
              <Text style={estilos.textoBotao}>{enviando ? "Enviando…" : "Enviar reporte"}</Text>
            </Pressable>
            <Pressable accessibilityRole="button" onPress={voltar} disabled={enviando}>
              <Text style={estilos.cancelar}>Cancelar</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.bgBrancoGelo },
  conteudo: { padding: 20, gap: 12 },
  titulo: { fontSize: 22, fontWeight: "700", color: cores.preto },
  rotulo: { fontSize: 15, fontWeight: "600", color: cores.preto },
  campo: { backgroundColor: cores.branco, borderRadius: 12, padding: 14, fontSize: 15, color: cores.preto },
  descricao: { minHeight: 100, textAlignVertical: "top" },
  tipos: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tipo: { paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, backgroundColor: cores.branco },
  tipoSelecionado: { backgroundColor: cores.verde },
  botao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: cores.verde,
    borderRadius: 12,
    padding: 16,
  },
  desativado: { opacity: 0.75 },
  textoBotao: { color: cores.branco, fontWeight: "700", fontSize: 16 },
  cancelar: { textAlign: "center", color: cores.cinzaEscuro, padding: 8 },
  erro: { color: "#a42626" },
});
