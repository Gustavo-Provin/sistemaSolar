axios.get(`https://api.le-systeme-solaire.net/rest/bodies/
`).then((result) => {
// 1. Consuma a API: Utilize o endpoint /bodies para obter uma lista de corpos celestes. Armazene esses dados em um array para futuras operações. 
// Detalhes: Use axios para fazer a requisição à API. Certifique-se de tratar possíveis erros que possam ocorrer durante a requisição.    
const corposCelestes = result.data.bodies
    console.log(corposCelestes)

// 2. Filtre os Planetas: Use o método filter para criar um novo array contendo apenas planetas. 
// Detalhes: Cada objeto da API contém um campo que especifica o tipo do corpo celeste (por exemplo, planeta, estrela, lua, etc.). Use esse campo como critério para o filtro.
const filtrarPlanetas = corposCelestes.filter(corpo => corpo.isPlanet === true)
    console.log(filtrarPlanetas)

// 3. Encontre a Terra: Use o método find para encontrar o objeto que representa a Terra no array filtrado. 
// Detalhes: Você deve procurar pelo objeto cujo campo de nome seja igual a "Earth".

const terra = corposCelestes.find(planeta => planeta.englishName === 'Earth')
    console.log(terra)

// 4. Verifique Condições com some: Use o método some para verificar se algum planeta no array filtrado não tem luas. 
// Detalhes: Alguns planetas não possuem luas e isso é especificado em um dos campos do objeto. Use esse campo para realizar a verificação. 

const planetaSemLuas = filtrarPlanetas.some(planeta => planeta.moons === null)
    console.log(planetaSemLuas)

// 5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas. 
// Detalhes: O novo array deve ser uma lista de strings, onde cada string é o nome de um planeta. 

const nomesDosPlanetas = filtrarPlanetas.map(planeta => planeta.englishName)
    console.log(nomesDosPlanetas)

// 6. Classificação por Tamanho: Use os métodos map e sort para criar um novo array que contenha os nomes dos planetas, ordenados pelo seu tamanho (raio). 
// Detalhes: Utilize map para extrair os raios e os nomes dos planetas em um novo array. Depois, use sort para ordenar esse array com base no raio. 

const planetasPorTamanho = filtrarPlanetas
.map(planeta => ({ nome: planeta.englishName, raio: planeta.meanRadius }))
.sort((a, b) => b.raio - a.raio)
planetasPorTamanho.forEach(planeta => {
    console.log(`Nome: ${planeta.nome}, Raio: ${planeta.raio}`)
})

// 7. Informações Concatenadas: Use o método join para criar uma string que contenha os nomes de todos os planetas do array, separados por vírgulas. 
// Detalhes: A string resultante deve ser algo como "Mercúrio, Vênus, Terra, Marte,...". 

const nomesConcatenados = nomesDosPlanetas.join(', ')
    console.log(nomesConcatenados)


// 8. Sistema Solar Compacto: Use os métodos para pegar os 5 menores planetas e calcular a soma massa total desses planetas. 

const menoresPlanetas = filtrarPlanetas
.sort((a, b) => a.meanRadius - b.meanRadius)
.slice(0, 5)
const massaTotal = menoresPlanetas.reduce((soma, planeta) => {
    return soma + planeta.mass.massValue * (10 ** planeta.mass.massExponent)
  }, 0)
  
  console.log(`A massa total dos 5 menores planetas é ${massaTotal}`)

// 9. Luas e Densidade: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas entre eles que tem densidade maior que 1

const planetasComDuasLuas = filtrarPlanetas.filter(planeta => planeta.moons && planeta.moons.length > 2)
const densidadeMaiorQueUm = planetasComDuasLuas.filter(planeta => planeta.density > 1)
    console.log('Planetas com mais de duas luas e densidade maior que 1:')
densidadeMaiorQueUm.forEach(planeta => console.log(planeta.englishName))  

// 10. Ordem de descobrimento: Encontre e imprima na tela todos nomes dos astros
// e suas respectivas datas de descoberta (os que tiverem), ordenando-os do mais recente ao mais antigo.

const corposComDataDescoberta = corposCelestes.filter(corpo => corpo.discoveryDate != '')
    corposComDataDescoberta.sort((a, b) =>{
        const dateA = new Date(a.discoveryDate.split("/").reverse().join('-'))
        const dateB = new Date(b.discoveryDate.split("/").reverse().join('-'))

        return dateB - dateA
    })
    console.log('Corpos celestes ordenados do mais recente ao mais antigo:')
    corposComDataDescoberta.forEach(corpo => {
        console.log(`Nome: ${corpo.englishName}, Descoberto em: ${corpo.discoveryDate}`)
    })

// 11. Encontrando Astro: Faça uma função que recebe um nome, e retorna a distancia, a massa, gravidade e densidade 

function encontrarAstro(name) {
    const astro = corposCelestes.find(corpo => corpo.englishName.toLowerCase() === name.toLowerCase())
    if (astro) {
      console.log(`Nome: ${astro.englishName}`)
      console.log(`Distância do Sol: ${astro.semimajorAxis}`)
      console.log(`Massa: ${astro.mass.massValue}`)
      console.log(`Gravidade: ${astro.gravity}`)
      console.log(`Densidade: ${astro.density}`)
    } else {
      console.log(`Não foi encontrado nenhum astro com o nome "${name}".`)
    }
  }
  encontrarAstro('Phobos')

// 12. Filtro de Temperatura: econtre os planetas que tem uma temperatura de 8 a 30 graus celsius. Cuidado que o AvgTemp está na escala Kelvin. Ordene-os do mais frio ao mais quente.

const planetasNaFaixaTemp = filtrarPlanetas.filter(corpo => {
    const tempCelsius = corpo.avgTemp - 273.15
    return tempCelsius >= 8 && tempCelsius <= 30
  })
  
  planetasNaFaixaTemp.sort((a, b) => a.avgTemp - b.avgTemp)
  
  planetasNaFaixaTemp.forEach(corpo => {
    const tempCelsius = corpo.avgTemp - 273.15
    console.log(`${corpo.englishName}: ${tempCelsius.toFixed(2)}°C`)
  })

// 13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os astros pelo seu tipo. bodyType 

function separarPorTipo(corposCelestes) {
    const separadosPorTipo = {}

    corposCelestes.forEach(corpo => {
        if (!separadosPorTipo[corpo.bodyType]) {
            separadosPorTipo[corpo.bodyType] = []
        }
        separadosPorTipo[corpo.bodyType].push(corpo)
    })

    return separadosPorTipo
}

const corposSeparadosPorTipo = separarPorTipo(corposCelestes)
console.log(corposSeparadosPorTipo)

// 14. Ordenação Complexa: Use sort e slice para ordenar os planetas primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.
function ordenarPorTipoETamanho(corposCelestes) {
    const tipos = corposCelestes.reduce((acc, corpo) => {
        if (acc.indexOf(corpo.bodyType) === -1) {
            acc.push(corpo.bodyType)
        }
        return acc
    }, [])

    const maioresPorTipo = {}

    tipos.forEach(tipo => {
        const corposDoTipo = corposCelestes.filter(corpo => corpo.bodyType === tipo)
        const maioresDoTipo = corposDoTipo.sort((a, b) => b.meanRadius - a.meanRadius).slice(0, 3)
        maioresPorTipo[tipo] = maioresDoTipo
    })

    return maioresPorTipo
}

const maioresCorposPorTipo = ordenarPorTipoETamanho(corposCelestes)
console.log(maioresCorposPorTipo)

// 15. Encontrando planetas orbitados: Encontre todos os planetas que são orbitados por pelo menos um corpo celeste.

const planetasOrbitados = filtrarPlanetas.filter(corpo => corpo.moons && corpo.moons.length > 0)
    console.log(planetasOrbitados)

// 16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.

const somaDasMassas = filtrarPlanetas.reduce((soma, planeta) => {
    return soma + planeta.mass.massValue * (10 ** planeta.mass.massExponent)
  }, 0)
  const mediaDaMassa = somaDasMassas / filtrarPlanetas.length
  
  console.log(`A média da massa de todos os planetas é ${mediaDaMassa}`)

// 17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas 

const perihelionPluton = 4436756954
const aphelionSaturno = 1503509229

const subtracao = perihelionPluton - aphelionSaturno
    console.log(`A distância entre Saturno e Plutão é ${subtracao}`)

// 18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem. 

const planetasComLua = filtrarPlanetas.filter(planeta => planeta.moons && planeta.moons.length > 0)
    console.log('Planetas com Lua:')
planetasComLua.forEach(planeta => console.log(planeta.englishName))

// 19. O Desafio Final em Manipulação de Dados e Cálculos 
// Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar. 

// 1. Criar um novo array apenas com planetas
const apenasPlanetas = result.data.bodies.filter(corpo => corpo.isPlanet === true)
console.log(apenasPlanetas)

// 2. Criar um novo array apenas com as massas dos planetas
const massasDosPlanetas = apenasPlanetas.map(planeta => planeta.mass.massValue * (10 ** planeta.mass.massExponent))
console.log(massasDosPlanetas)

// 3. Ordenar o array de massas em ordem crescente
const massasOrdenadas = [...massasDosPlanetas].sort((a, b) => a - b)
console.log(massasOrdenadas)

// 4. Calcular a mediana das massas dos planetas
let mediana
const meio = Math.floor(massasOrdenadas.length / 2)

if (massasOrdenadas.length % 2 === 0) {
  mediana = (massasOrdenadas[meio - 1] + massasOrdenadas[meio]) / 2
} else {
  mediana = massasOrdenadas[meio]
}
console.log(`A mediana das massas dos planetas é ${mediana}`)

// 5. Encontrar o planeta mais próximo da mediana
const planetaMaisProximoDaMediana = apenasPlanetas.reduce((anterior, atual) => {
    const massaAtual = atual.mass.massValue * (10 ** atual.mass.massExponent)
    const massaAnterior = anterior.mass && (anterior.mass.massValue * (10 ** anterior.mass.massExponent)) || 0
    const diferencaAtual = Math.abs(massaAtual - mediana)
    const diferencaAnterior = Math.abs(massaAnterior - mediana)
  
    if (diferencaAtual < diferencaAnterior) {
      return atual
    } else {
      return anterior
    }
  })
  
  console.log(`O planeta mais próximo da mediana é ${planetaMaisProximoDaMediana.englishName}`)

})


