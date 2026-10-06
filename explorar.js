//Parte 1
async function explorar() {
    const url = "https://pokeapi.co/api/v2/pokemon/pikachu";

    const respuesta = await fetch(url);
    console.log("Status de la respuesta:", respuesta.status);

    const datos = await respuesta.json();
    console.log(datos);
    console.log("--- TIPOS ---");
    for (let i = 0; i < datos.types.length; i++) {
        console.log(datos.types[i].type.name);
    }
    console.log("--- STATS ---");
    for (let i = 0; i < datos.stats.length; i++) {
        console.log(datos.stats[i].stat.name + ": " + datos.stats[i].base_stat);
    }
    console.log("--- HABILIDADES ---");
    for (let i = 0; i < datos.abilities.length; i++) {
        console.log(datos.abilities[i].ability.name);
    }
}

explorar();
