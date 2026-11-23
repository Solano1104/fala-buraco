import { useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const pontos = [
  { topo: 70, esquerda: 70, cor: "#d03b3b" },
  { topo: 150, esquerda: 190, cor: "#9c6209" },
  { topo: 250, esquerda: 110, cor: "#1f66c4" },
  { topo: 320, esquerda: 250, cor: "#d03b3b" },
  { topo: 115, esquerda: 270, cor: "#9c6209" },
];

export default function Mapa() {
  const { logado } = useLocalSearchParams<{ logado?: string }>();
  const estaLogado = logado === "true";

  return (
    <SafeAreaView style={styles.areaSegura}>
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>Cuiabá, MT</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>MA</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.conteudo, { flex: 1 }]}>
        <View style={styles.caixaBusca }>
          <Text style={styles.textoBusca}>Buscar endereço, bairro...</Text>
        </View>

        <View style={styles.filtroLinha}>
          {['Todos', 'Abertos', 'Em execução', 'Resolvidos'].map((filtro, indice) => (
            <View
              key={filtro}
              style={[styles.filtro, indice === 0 && styles.filtroAtivo]}
            >
              <Text style={[styles.textoFiltro, indice === 0 && styles.textoFiltroAtivo]}>{filtro}</Text>
            </View>
          ))}
        </View>

        <View style={styles.mapaContainer}>
          {pontos.map((ponto, indice) => (
            <View
              key={`${ponto.esquerda}-${ponto.topo}-${indice}`}
              style={[styles.pino, { top: ponto.topo, left: ponto.esquerda, backgroundColor: ponto.cor }]}
            >
              <View style={styles.pinoInterno} />
            </View>
          ))}

          <View style={styles.legenda}>
            <Text style={styles.textoLegenda}>124 ocorrências nesta área toque em um pino</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.botaoFlutuante}>
        <Text style={styles.textoBotaoFlutuante}>+</Text>
      </Pressable>

      <View style={styles.barraAbas}>
        <View style={[styles.aba, styles.abaAtiva]}>
          <Text style={[styles.textoAba, styles.textoAbaAtiva]}>Mapa</Text>
        </View>
        <View style={styles.aba}>
          <Text style={styles.textoAba}>Ranking</Text>
        </View>
        <View style={styles.aba}>
          <Text style={styles.textoAba}>Notificações</Text>
        </View>
        <View style={styles.aba}>
          <Text style={styles.textoAba}>Perfil</Text>
        </View>
      </View>

      {estaLogado ? (
        <View style={styles.bannerStatusLogado}>
          <Text style={styles.textoStatus}>Sim está logado</Text>
        </View>
      ) : (
        <View style={styles.bannerStatusNaoLogado}>
          <Text style={styles.textoStatusNaoLogado}>Não está logado</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  areaSegura: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d7dce2",
  },
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#161a20",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#e3e8ee",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTexto: {
    fontSize: 11,
    fontWeight: "700",
    color: "#161a20",
  },
  conteudo: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
  },
  caixaBusca: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d7dce2",
    marginBottom: 12,
  },
  textoBusca: {
    fontSize: 13,
    color: "#5b6472",
  },
  filtroLinha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  filtro: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7dce2",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filtroAtivo: {
    backgroundColor: "#e2f5ea",
    borderColor: "#108245",
  },
  textoFiltro: {
    fontSize: 11.5,
    color: "#5b6472",
    fontWeight: "600",
  },
  textoFiltroAtivo: {
    color: "#108245",
  },
  mapaContainer: {
    position: "relative",
    height: 420,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d7dce2",
    backgroundColor: "#eaf1e6",
    marginBottom: 12,
  },
  pino: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    transform: [{ translateX: -13 }, { translateY: -13 }],
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 4,
  },
  pinoInterno: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  legenda: {
    position: "absolute",
    left: 10,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  textoLegenda: {
    fontSize: 10.5,
    color: "#5b6472",
  },
  botaoFlutuante: {
    position: "absolute",
    right: 18,
    bottom: 82,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#108245",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#108245",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },
  textoBotaoFlutuante: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 34,
    marginTop: -2,
  },
  barraAbas: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 72,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#d7dce2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
  },
  aba: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  abaAtiva: {
    borderTopWidth: 2,
    borderTopColor: "#108245",
  },
  textoAba: {
    fontSize: 10,
    color: "#8a93a1",
    fontWeight: "600",
  },
  textoAbaAtiva: {
    color: "#108245",
  },
  bannerStatusLogado: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "rgba(16,130,69,0.12)",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  bannerStatusNaoLogado: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "rgba(208,59,59,0.1)",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  textoStatus: {
    color: "#108245",
    fontWeight: "700",
    fontSize: 14,
  },
  textoStatusNaoLogado: {
    color: "#d03b3b",
    fontWeight: "700",
    fontSize: 14,
  },
});
