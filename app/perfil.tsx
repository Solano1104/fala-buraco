import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChipRoute = "/login" | "/mapa-logado" | "/criacao_reporte" | "/perfil" | "/painel" | "/detalhe";

const chips: { label: string; route: ChipRoute }[] = [
  { label: "Login", route: "/login" },
  { label: "Mapa", route: "/mapa-logado" },
  { label: "Criar reporte", route: "/criacao_reporte" },
  { label: "Detalhe da ocorrência", route: "/detalhe" },
  { label: "Perfil", route: "/perfil" },
  { label: "Painel da prefeitura", route: "/painel" },
];

export default function Detalhe() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Cuiabá, MT</Text>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MA</Text>
        </View>
      </View>

      <View style={styles.statusBanner}>
        <Text style={styles.statusText}>Você está logado</Text>
      </View>

      <View style={styles.content}>
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

        <View style={styles.detailWrap}>
          <Text style={styles.detailText}>Perfil</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4ea",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: "#dfe4ea",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111827",
  },
  statusBanner: {
    borderBottomWidth: 1,
    borderBottomColor: "#dfe4ea",
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#dfe4ea",
  },
  statusText: {
    color: "#1f2937",
    fontWeight: "700",
    fontSize: 16,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: "#f5f7fa",
    flex: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#dfe4ea",
  },
  detailWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },
  searchBox: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#dfe4ea",
    marginBottom: 14,
  },
  searchText: {
    fontSize: 14,
    color: "#6b7280",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfe4ea",
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
    backgroundColor: "#ebf8f1",
    borderColor: "#1a9d5a",
  },
  chipText: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#1a9d5a",
  },
});
