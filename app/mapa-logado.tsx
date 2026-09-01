import { router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const pins = [
  { top: 70, left: 70, color: "#d03b3b" },
  { top: 150, left: 190, color: "#9c6209" },
  { top: 250, left: 110, color: "#1f66c4" },
  { top: 320, left: 250, color: "#d03b3b" },
  { top: 115, left: 270, color: "#9c6209" },
];

type ChipRoute = "/login" | "/mapa-logado" | "/criacao_reporte" | "/perfil" | "/painel" | "/detalhe" ;

const chips: { label: string; route: ChipRoute }[] = [
  { label: "Login", route: "/login" },
  { label: "Mapa", route: "/mapa-logado" },
  { label: "Criar reporte", route: "/criacao_reporte" },
  { label: "Detalhe da ocorrência", route: "/detalhe" },
  { label: "Perfil", route: "/perfil" },
  { label: "Painel da prefeitura", route: "/painel" },
];

export default function MapaLogado() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Cuiabá, MT</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MA</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { flex: 1 }]}>
        <View style={styles.searchBox}>
          <Text style={styles.searchText}>Buscar endereço, bairro...</Text>
        </View>

        <View style={styles.chipsRow}>
          {chips.map((chip, index) => (
            <Pressable
              key={`${chip.label}-${index}`}
              onPress={() => router.push(chip.route)}
              style={({ pressed }) => [
                styles.chip,
                index === 0 && styles.chipActive,
                pressed && styles.chipPressed,
              ]}
            >
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.mapContainer}>
          {pins.map((pin, index) => (
            <View
              key={`${pin.left}-${pin.top}-${index}`}
              style={[styles.pin, { top: pin.top, left: pin.left, backgroundColor: pin.color }]}
            >
              <View style={styles.pinInner} />
            </View>
          ))}

          <View style={styles.legend}>
            <Text style={styles.legendText}>124 ocorrências nesta área toque em um pino</Text>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.fab}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>

      <View style={styles.tabBar}>
        <View style={[styles.tabItem, styles.tabItemActive]}>
          <Text style={[styles.tabText, styles.tabTextActive]}>Mapa</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Ranking</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Notificações</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Perfil</Text>
        </View>
      </View>

      <View style={styles.statusBannerLogado}>
        <Text style={styles.statusText}>Você está logado</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f6f8fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#d7dce2",
  },
  title: {
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
  avatarText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#161a20",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 90,
    marginTop: 30,
  },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#d7dce2",
    marginBottom: 12,
  },
  searchText: {
    fontSize: 13,
    color: "#5b6472",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  chip: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#d7dce2",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    transform: [{ scale: 1 }],
  },
  chipPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  chipActive: {
    backgroundColor: "#e2f5ea",
    borderColor: "#108245",
  },
  chipText: {
    fontSize: 11.5,
    color: "#5b6472",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#108245",
  },
  mapContainer: {
    position: "relative",
    height: 420,
    borderRadius: 22,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d7dce2",
    backgroundColor: "#eaf1e6",
    marginBottom: 12,
  },
  pin: {
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
  pinInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  legend: {
    position: "absolute",
    left: 10,
    bottom: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  legendText: {
    fontSize: 10.5,
    color: "#5b6472",
  },
  fab: {
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
  fabText: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 34,
    marginTop: -2,
  },
  tabBar: {
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
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: "#108245",
  },
  tabText: {
    fontSize: 10,
    color: "#8a93a1",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#108245",
  },
  statusBannerLogado: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "rgba(16,130,69,0.12)",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 10,
  },
  statusText: {
    color: "#108245",
    fontWeight: "700",
    fontSize: 14,
  },
  statusBanner2: {
    position: "absolute",
    top: 60,
    left: 16,
    right: 16,
    backgroundColor: "rgba(16,130,69,0.12)",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  statusText2: {
    color: "#108245",
    fontWeight: "700",
    fontSize: 14,
  },
});
