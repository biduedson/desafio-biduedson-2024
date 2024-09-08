import { encontrarAnimal } from "../utils/animalRecintoValidador.js";

export class ValidarTipos {

    static validar(animal, quantidade) {

        if (typeof animal !== "string") {
            return {
                menssagemDeErro: "O nome do animal deve ser uma string",
                valido: false
            };
        }

        if (typeof quantidade !== "number" || isNaN(quantidade)) {

            return {
                menssagemDeErro: "A quantidade do animal deve ser um numero",
                valido: false
            };
        }

        if (quantidade <= 0) {
            return {
                menssagemDeErro: "Quantidade inválida",
                valido: false
            };
        }

        const animaExistente = encontrarAnimal(animal);
        if (!animaExistente) {
            return {
                menssagemDeErro: "Animal inválido",
                valido: false
            };
        }

        return {
            valido: true
        }
    }
}