import { encontrarAnimal, regraAnimalCarnivoro, regraHipopotamo, regraMacaco, validarEspacoDisponivel } from "../utils/animalRecintoValidador.js";
import { ValidarTipos } from "./validarTipos.js";

export class RegrasDoRecinto {

    static validar(animal, quantidade) {

        const resultadoValidacao = ValidarTipos.validar(animal, quantidade);
        if (!resultadoValidacao.valido) {
            return {
                erro: resultadoValidacao.menssagemDeErro,
                recintosViaveis: false
            }
        }

        const animalEncontrado = encontrarAnimal(animal)
        const espacoDisponivel = validarEspacoDisponivel(animal, quantidade)

        if (!espacoDisponivel.length) {
            return {
                erro: "Não há recinto viável",
                recintosViaveis: false
            };
        }

        if (animalEncontrado.especie === "HIPOPOTAMO") {
            const result = regraHipopotamo(animalEncontrado, quantidade, espacoDisponivel)
            return result
        }

        if (animalEncontrado.carnivoro) {
            const result = regraAnimalCarnivoro(animalEncontrado)
            return result
        }
        if (animalEncontrado.especie === "MACACO") {
            const result = regraMacaco(animalEncontrado, quantidade, espacoDisponivel)
            return result
        }

    }
}