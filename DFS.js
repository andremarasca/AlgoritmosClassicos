// Como o grafo do exemplo é direcionado
// eu preciso garantir que todo vertice[v] é um array
// para poder usar grafo.getArestas(v).forEach
let Grafo = () => {
  let vertices = [];
  let inicializa = (N) => {
    while (N--) {
      vertices[N] = [];
    }
  };
  // Tendo a garantia que vertice[v] é um array, só dar push ao inserir arestas
  let inserirAresta = (origem, destino) => vertices[origem].push(destino);
  let getVertices = () => vertices;
  let getArestas = (id) => vertices[id];
  return { inserirAresta, getVertices, getArestas, inicializa };
};

let tempo;
let tempos = [];

function DFSR(grafo, v) {
  tempos[v] = tempo++;
  grafo.getArestas(v).forEach((a) => {
    if (tempos[a] === -1) {
      DFSR(grafo, a);
    }
  });
}

let DFS = (grafo, s) => {
  let nVertices = grafo.getVertices().length;
  tempos.length = nVertices;
  tempo = 0;
  for (let v = 0; v < nVertices; v++) {
    tempos[v] = -1;
  }
  // Esse loop é necessário para alcançar todas as componentes do grafo
  for (let v = 0; v < nVertices; v++) {
    if (tempos[v] === -1) {
      DFSR(grafo, v);
    }
  }
};

////// leitura e processamento

let grafo = Grafo();

var input = require("fs").readFileSync(__dirname + "/dev/stdin/input.txt", "utf8");
var lines = input.split("\r").join("").split("\n");

let letraParaNumero = (c) => c.charCodeAt(0) - 65;

let N = parseInt(lines.shift());
let s = letraParaNumero(lines.shift());

grafo.inicializa(N);

let line = lines.shift();
while (line) {
  let [origem, destino] = line.split(" ").map((x) => letraParaNumero(x));
  grafo.inserirAresta(origem, destino);
  line = lines.shift();
}

DFS(grafo, s);

grafo.getVertices().forEach((vertice, idx) => {
  console.log(`${String.fromCharCode(idx + 65)} -> ${tempos[idx]}`);
});
