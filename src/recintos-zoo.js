import { RegrasDoRecinto } from "./validacoes/validarRegras.js";

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const { erro, recintosViaveis } = RegrasDoRecinto.validar(animal, quantidade);
        return {
            erro: erro,
            recintosViaveis: recintosViaveis
        }
    }
}
const resultado = new RecintosZoo()
const result = resultado.analisaRecintos('LEOPARDO', 1)
console.log(result)

export { RecintosZoo as RecintosZoo };

