import { siglaDoEstado } from "@/constants/estados";
import * as Location from "expo-location";
import { Platform } from "react-native";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

export type Coordenadas = { latitude: number; longitude: number };

// carregando = buscando | pronto = achou | negado = usuário negou a permissão | erro = falhou
export type StatusCidade = "carregando" | "pronto" | "negado" | "erro";

type CidadeContextType = {
  cidade: string | null; // ex.: "Cuiabá"
  uf: string | null; // ex.: "MT"
  coordenadas: Coordenadas | null; // posição do usuário
  status: StatusCidade;
  atualizar: () => Promise<void>; // pede a localização de novo
};

export const CidadeContext = createContext<CidadeContextType>({
  cidade: null,
  uf: null,
  coordenadas: null,
  status: "carregando",
  atualizar: async () => {},
});


export function CidadeProvider({ children }: { children: ReactNode }) {
  const [cidade, setCidade] = useState<string | null>(null);
  const [uf, setUf] = useState<string | null>(null);
  const [coordenadas, setCoordenadas] = useState<Coordenadas | null>(null);
  const [status, setStatus] = useState<StatusCidade>("carregando");

  const buscarLocalizacao = useCallback(async () => {
    try {
      if (Platform.OS !== "web") {
        const { status: permissao } = await Location.requestForegroundPermissionsAsync();
        if (permissao !== "granted") {
          setStatus("negado");
          return;
        }
      }

      // No navegador a mesma chamada pede permissão e busca a posição.
      const pos = Platform.OS === "web"
        ? await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 12000 });
          })
        : await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const aqui = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      };
      setCoordenadas(aqui);
      setStatus("pronto");
      if (Platform.OS === "web") return;

      // Geocodificação reversa: coordenadas -> endereço. Se falhar, o mapa
      // ainda abre no lugar certo, só o título fica sem o nome da cidade.
      try {
        const [lugar] = await Location.reverseGeocodeAsync(aqui);
        setCidade(lugar?.city ?? lugar?.subregion ?? null);
        setUf(siglaDoEstado(lugar?.region ?? null));
      } catch {
        setCidade(null);
        setUf(null);
      }
    } catch (falha) {
      const negado = Platform.OS === "web" &&
        typeof falha === "object" && falha !== null && "code" in falha && falha.code === 1;
      setStatus(negado ? "negado" : "erro");
    }
  }, []);

  const atualizar = useCallback(async () => {
    setCoordenadas(null);
    setStatus("carregando");
    await buscarLocalizacao();
  }, [buscarLocalizacao]);

  useEffect(() => {
    void buscarLocalizacao();
  }, [buscarLocalizacao]);

  return (
    <CidadeContext.Provider value={{ cidade, uf, coordenadas, status, atualizar }}>
      {children}
    </CidadeContext.Provider>
  );
}