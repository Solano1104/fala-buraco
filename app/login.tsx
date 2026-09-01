import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Login() {
  const entrarNoMapa = () => {
    router.push("/mapa-logado");
  };

  const entrarNoMapaSemLogin = () => {
    router.push({
      pathname: "/mapa",
      params: { logado: "false" },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <View style={styles.logo}>
          <Text style={styles.textoLogo}>FB</Text>
        </View>

        <Text style={styles.titulo}>Falaa Buraco!!</Text>
        <Text style={styles.subtitulo}>
          Reporte, acompanhe e confirme a correção de buracos na sua cidade.
        </Text>

        <Pressable onPress={entrarNoMapa} style={styles.botaoPrimario}>
          <Text style={styles.textoBotaoPrimario}>Entrar com Google</Text>
        </Pressable>

        <Text style={styles.textoLegal}>
          Ao continuar, você concorda com os Termos e a Política de Privacidade (LGPD).
        </Text>

        <Pressable onPress={entrarNoMapaSemLogin}>
          <Text style={styles.textoVisitante}>Ver mapa sem login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  conteudo: {
    width: "100%",
    maxWidth: 360,
    alignItems: "center",
  },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 22,
    backgroundColor: "#108245",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#108245",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  textoLogo: {
    fontSize: 26,
    fontWeight: "800",
    color: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#161a20",
    marginBottom: 6,
  },
  subtitulo: {
    fontSize: 13,
    lineHeight: 20,
    color: "#5b6472",
    textAlign: "center",
    marginBottom: 18,
    maxWidth: 260,
  },
  botaoPrimario: {
    backgroundColor: "#108245",
    borderRadius: 14,
    width: "100%",
    maxWidth: 260,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#108245",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 6,
  },
  textoBotaoPrimario: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  textoLegal: {
    marginTop: 18,
    maxWidth: 250,
    fontSize: 11,
    color: "#8a93a1",
    textAlign: "center",
    lineHeight: 16,
  },
  textoVisitante: {
    marginTop: 16,
    color: "#108245",
    fontWeight: "700",
    fontSize: 13,
  },
});