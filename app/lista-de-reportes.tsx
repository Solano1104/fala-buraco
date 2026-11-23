import { STATUS } from "@/constants/status";
import { useOcorrencias } from "@/hooks/use-ocorrencias";
import { cores } from "@/styles";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatoData = new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" });

export default function ListaDeReportes() {
  const { ocorrencias, carregando, erro, atualizar } = useOcorrencias();

  return (
    <SafeAreaView style={estilos.tela} edges={["left", "right", "bottom"]}>
      <View style={estilos.cabecalho}>
        <Pressable accessibilityRole="button" disabled={carregando} onPress={atualizar}>
          <Text style={estilos.acao}>{carregando ? "Carregando…" : "Atualizar"}</Text>
        </Pressable>
      </View>
      {!!erro && <Text accessibilityRole="alert" style={estilos.mensagem}>{erro}</Text>}
      <FlatList
        contentContainerStyle={estilos.lista}
        data={ocorrencias}
        keyExtractor={(item) => item.id}
        // O gesto usa a mesma consulta que roda ao voltar para a tela.
        onRefresh={atualizar}
        refreshing={carregando}
        ListEmptyComponent={!carregando && !erro ? <Text style={estilos.mensagem}>Nenhum reporte ainda.</Text> : undefined}
        renderItem={({ item }) => (
          <View style={estilos.cartao}>
            <View style={[estilos.ponto, { backgroundColor: STATUS[item.status].cor }]} />
            <View style={estilos.textos}>
              <Text style={estilos.titulo}>{item.titulo}</Text>
              {!!item.descricao && <Text style={estilos.detalhe}>{item.descricao}</Text>}
              <Text style={estilos.detalhe}>{STATUS[item.status].rotulo}</Text>
              {item.criadoEm && <Text style={estilos.detalhe}>{formatoData.format(item.criadoEm)}</Text>}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: cores.bgBrancoGelo },
  cabecalho: { alignItems: "flex-end", paddingHorizontal: 16, paddingTop: 12 },
  acao: { color: cores.verdeEscuro, fontWeight: "700", padding: 10 },
  lista: { padding: 16, gap: 10 },
  mensagem: { color: cores.cinzaEscuro, textAlign: "center", padding: 16 },
  cartao: { flexDirection: "row", gap: 12, padding: 16, borderRadius: 12, backgroundColor: cores.branco },
  ponto: { width: 10, height: 10, borderRadius: 5, marginTop: 6 },
  textos: { flex: 1, gap: 4 },
  titulo: { fontSize: 16, fontWeight: "700", color: cores.preto },
  detalhe: { fontSize: 14, color: cores.cinzaEscuro },
});
