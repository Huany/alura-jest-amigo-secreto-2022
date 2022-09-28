import { useRecoilValue } from "recoil";
import { resultadoAmigoSecreto } from "../atom";

export const useResultadoDoSorteio = () => {
  return useRecoilValue(resultadoAmigoSecreto);
};
