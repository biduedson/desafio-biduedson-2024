import { especies, recintos } from "../data.js";


export const encontrarAnimal = (nomeDoAnimal) =>
    especies.find((tipo) => tipo.especie === nomeDoAnimal);


export const validarEspacoDisponivel = (animal, quantidade) => {
    const animalEncontrado = encontrarAnimal(animal);
    return recintos.filter((recinto) => {
        const espacoLivre = recinto.tamanhoTotal - recinto.animaisExistentes.quantidade;
        const espacoNecessario = animalEncontrado.tamanho * quantidade;
        return espacoLivre >= espacoNecessario;
    });
};


export const regraAnimalCarnivoro = (animalEncontrado) => {
    const possiveisRecintos = recintos.filter((recinto) => {
        return (
            (recinto.bioma === animalEncontrado.bioma &&
                recinto.animaisExistentes.quantidade === 0) ||
            recinto.animaisExistentes.nome === animalEncontrado.especie
        );
    });

    if (!possiveisRecintos.length) {
        return {
            erro: "Não há recinto viável",
            recintosViaveis: false
        };
    }
    return {
        erro: false,
        recintosViaveis: possiveisRecintos.map((recinto) => {
            const numero = recinto.numero;
            const espacoLivre = recinto.tamanhoTotal - animalEncontrado.tamanho;
            return `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        }),
    };
};


export const regraHipopotamo = (
    animalEncontrado,
    quantidade,
    espacoDisponivel
) => {
    const possiveisRecintos = espacoDisponivel.filter((recinto) => {
        return ["savana", "rio", "savana e rio"].includes(recinto.bioma);
    });

    const recintosDisponiveis = possiveisRecintos.filter((recinto) => {
        return (
            recinto.animaisExistentes.quantidade === 0 ||
            (recinto.animaisExistentes.quantidade > 0 &&
                recinto.bioma === "savana e rio")
        );
    });

    if (!recintosDisponiveis.length) {
        return {
            erro: "Não há recinto viável",
            recintosViaveis: false
        };
    }

    return {
        erro: false,
        recintosViaveis: recintosDisponiveis.map((recinto) => {
            const espacoExtra =
                animalEncontrado.especie === recinto.animaisExistentes.nome ||
                    recinto.animaisExistentes.quantidade === 0
                    ? 0
                    : 1;
            const numero = recinto.numero;
            const espacoLivre =
                recinto.tamanhoTotal -
                recinto.animaisExistentes.quantidade -
                animalEncontrado.tamanho * quantidade -
                espacoExtra;
            return `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        }),
    };

};

export const regraMacaco = (animalEncontrado, quantidade, espacoDisponivel) => {
    const possiveisRecintos = espacoDisponivel.filter((recinto) => {
        return (
            ["floresta", "savana", "savana e rio"].includes(recinto.bioma) &&
            !["LEAO", "LEOPARDO", "HIPOPOTAMO"].includes(recinto.animaisExistentes.nome)
        );
    });

    if (!possiveisRecintos.length) {
        return {
            erro: "Não há recinto viável",
            recintosViaveis: false
        };
    }

    return {
        erro: false,
        recintosViaveis: possiveisRecintos.map((recinto) => {
            const espacoExtra =
                animalEncontrado.especie === recinto.animaisExistentes.nome ||
                    recinto.animaisExistentes.quantidade === 0
                    ? 0
                    : 1;
            const numero = recinto.numero;
            const espacoLivre =
                recinto.tamanhoTotal -
                recinto.animaisExistentes.quantidade -
                animalEncontrado.tamanho * quantidade -
                espacoExtra * quantidade;
            console.log(espacoLivre);
            return `Recinto ${numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
        }),
    };

};
