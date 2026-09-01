import GoogleLogo from '@/components/google-logo';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//Paleta de cores do projeto
const cores = {
  verde: '#108245', 
  verdeEscuro: '#0c6b38',
  cinzaClaro: '#8a93a1',
  cinzaEscuro: '#5b6472',
  preto: '#161a20',
  bgBrancoGelo: '#f6f8fa',
  branco: '#ffffff',
  red: ''
};

export default function HomeScreen() {
  return (
        <SafeAreaView style={styles.container}>
          <View style={styles.logo}>
            <Text style={styles.logoText}>
              BC
            </Text>
          </View>
        <Text style={styles.titulo}>Falaa Buraco!!!</Text>
        <Text style={styles.subtitulo}>Reporte, acompanhe e confirme a correção dos buracos na sua cidade.</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.botao}>
          <Text style={styles.textoBotao}>
             <GoogleLogo size={20}/>   
             <a href="/mapa-logado">Login com o Google</a>
          </Text>
        </TouchableOpacity>
        <Text style={styles.rodape}>
          Ao continuar, você concorda com os Termos de Serviço e Política de Privacidade (LGPD).
        </Text>
        <Link href="/mapa" asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={{color: cores.verde, fontSize: 18, fontWeight: 'bold',
              marginTop: 20
            }}>
              <a href="/mapa?logado=false">Ver mapa sem login</a> {'>'}
            </Text>
          </TouchableOpacity>
        </Link>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.bgBrancoGelo,
  },

   containerlogin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cores.red,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: cores.verde,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '900',
  },

  titulo: {
    color: cores.preto,
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 25,
  },

  subtitulo: {
    color: cores.cinzaClaro,
    fontSize: 18,
    textAlign: 'center',
    marginHorizontal: 40,
  },

  botao: {
    backgroundColor: cores.verde,
    marginTop: 30,
    padding: 20,
    height: 'auto',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 18, 
    fontWeight: 'bold',

  },

  rodape: {
    color: cores.cinzaEscuro,
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 20,
  },
  
  mapaSemLogin: {
    color: cores.verdeEscuro,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
