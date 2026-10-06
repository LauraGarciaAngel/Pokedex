//Parte 2

async function buscarPokemon(nombre) {
    const url = "https://pokeapi.co/api/v2/pokemon/" + nombre.toLowerCase();

    const respuesta = await fetch(url);

    if (!respuesta.ok) {
        console.log("No se encontro el pokemon. Status: " + respuesta.status);
        return null;
    }

    return await respuesta.json();
}

//Parte 3

function mostrarFicha(datos) {
    if (!datos) {
        console.log("No hay datos para mostrar.");
        return;
    }
    console.log("Nombre: " + datos.name.toUpperCase() + " | #" + datos.id);

    const tiposArray = [];
    for (let i = 0; i < datos.types.length; i++) {
        tiposArray[i] = datos.types[i].type.name;
    }
    console.log("Tipos: " + tiposArray.join(" / "));

    console.log("Altura: " + (datos.height * 10) + " cm");
    console.log("Peso: " + (datos.weight / 10) + " kg");

    console.log("Stats:");
    for (let i = 0; i < datos.stats.length; i++) {
        console.log("  " + datos.stats[i].stat.name + ": " + datos.stats[i].base_stat);
    }

    console.log("Habilidades:");
    for (let i = 0; i < datos.abilities.length; i++) {
        let linea = "  " + datos.abilities[i].ability.name;
        if (datos.abilities[i].is_hidden) {
            linea = linea + " (oculta)";
        }
        console.log(linea);
    }
}

//Parte 4

function obtenerStat(datos, nombreStat) {
    for (let i = 0; i < datos.stats.length; i++) {
        if (datos.stats[i].stat.name === nombreStat) {
            return datos.stats[i].base_stat;
        }
    }
    return null;
}


async function compararPokemon(nombre1, nombre2, stat) {
    const pk1 = await buscarPokemon(nombre1);
    const pk2 = await buscarPokemon(nombre2);

    if (pk1 === null || pk2 === null) {
        console.log("No se puede comparar porque uno de los pokemon no se encontro.");
        return;
    }

    const valor1 = obtenerStat(pk1, stat);
    const valor2 = obtenerStat(pk2, stat);

    if (valor1 === null || valor2 === null) {
        console.log("La stat '" + stat + "' no existe. Stats validas: hp, attack, defense, special-attack, special-defense, speed");
        return;
    }

    console.log(pk1.name + " " + stat + ": " + valor1);
    console.log(pk2.name + " " + stat + ": " + valor2);

    if (valor1 > valor2) {
        console.log("Ganador en " + stat + ": " + pk1.name);
    } else if (valor2 > valor1) {
        console.log("Ganador en " + stat + ": " + pk2.name);
    } else {
        console.log("Empate en " + stat + "!");
    }
}

//Parte 5

async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = null;
    let mejorValor = -1;

    for (let i = 0; i < listaNombres.length; i++) {
        const datos = await buscarPokemon(listaNombres[i]);

        if (datos === null) {
            continue;
        }

        const valor = obtenerStat(datos, stat);

        if (valor === null) {
            continue;
        }

        if (valor > mejorValor) {
            mejorValor = valor;
            mejorNombre = datos.name;
        }
    }

    if (mejorNombre !== null) {
        console.log("El mas fuerte en " + stat + " es: " + mejorNombre + " con " + mejorValor);
    } else {
        console.log("No se pudo determinar el mas fuerte.");
    }

    return mejorNombre;
}

//Pruebas

async function main() {

    // Ejercicio 2 - buscarPokemon con 3 pokemon distintos
    console.log("=== Ejercicio 2 ===");
    const pk1 = await buscarPokemon("charizard");
    if (pk1 !== null) console.log(pk1.name + " | ID: " + pk1.id);

    const pk2 = await buscarPokemon("bulbasaur");
    if (pk2 !== null) console.log(pk2.name + " | ID: " + pk2.id);

    const pk3 = await buscarPokemon("gengar");
    if (pk3 !== null) console.log(pk3.name + " | ID: " + pk3.id);

    // prueba con nombre invalido
    await buscarPokemon("pokemoninventado");

    // Ejercicio 3 - mostrarFicha de dos pokemon nuevos
    console.log("\n=== Ejercicio 3 ===");
    const eevee = await buscarPokemon("eevee");
    mostrarFicha(eevee);

    console.log("");
    const snorlax = await buscarPokemon("snorlax");
    mostrarFicha(snorlax);

    // Ejercicio 4 - compararPokemon
    console.log("\n=== Ejercicio 4.1 - snorlax vs machamp en hp ===");
    // elegimos hp porque snorlax es famoso por su resistencia y machamp por su fuerza bruta,
    // quiero ver si snorlax realmente aguanta mas
    await compararPokemon("snorlax", "machamp", "hp");

    console.log("\n=== Ejercicio 4.2 - mewtwo vs dragonite en defense ===");
    await compararPokemon("mewtwo", "dragonite", "defense");

    console.log("\n=== Ejercicio 4.3 - stat invalida ===");
    await compararPokemon("pikachu", "charmander", "fuerza");

    // Ejercicio 5 - pokemonMasFuerte con mi equipo de 6
    console.log("\n=== Ejercicio 5 ===");
    const miEquipo = ["pikachu", "charizard", "blastoise", "mewtwo", "gengar", "dragonite"];

    console.log("Mas fuerte en attack:");
    const ganadorAtaque = await pokemonMasFuerte(miEquipo, "attack");

    console.log("\nMas fuerte en defense:");
    await pokemonMasFuerte(miEquipo, "defense");

    // ficha completa del ganador en attack
    console.log("\nFicha del ganador en attack:");
    const fichaGanador = await buscarPokemon(ganadorAtaque);
    mostrarFicha(fichaGanador);
}

main();
