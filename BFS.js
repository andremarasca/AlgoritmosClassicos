let Grafo = () => {
  let vertices = [];
  let inserirAresta = (origem, destino) => {
    if (vertices[origem]) {
      vertices[origem].push(destino);
    } else {
      vertices[origem] = [destino];
    }
  };
  let getVertices = () => vertices;
  let getArestas = (id) => vertices[id];
  return { inserirAresta, getVertices, getArestas };
};

let BFS = (grafo, s) => {
  let nVertices = grafo.getVertices().length;
  let fila = [];
  let dist = [];
  let pai = [];
  for (let i = 0; i < nVertices; i++) {
    dist[i] = -1;
    pai[i] = -1;
  }
  dist[s] = 0;
  pai[s] = s;
  fila.push(s);
  while (fila.length) {
    let u = fila.shift();
    grafo.getArestas(u).forEach((id) => {
      if (dist[id] < 0) {
        dist[id] = dist[u] + 1;
        pai[id] = u;
        fila.push(id);
      }
    });
  }
  return { pai, dist };
};

////// leitura e processamento

let grafo = Grafo();

var input = require("fs").readFileSync(__dirname + "/dev/stdin/input.txt", "utf8");
var lines = input.split("\r").join("").split("\n");

let s = parseInt(lines.shift());

let line = lines.shift();
while (line) {
  let [origem, destino] = line.split(" ").map((x) => parseInt(x));
  grafo.inserirAresta(origem, destino);
  grafo.inserirAresta(destino, origem);
  line = lines.shift();
}
console.log(grafo.getVertices());
let { pai, dist } = BFS(grafo, s);
for (let i = 0; i < pai.length; i++) {
  console.log(`${pai[i]} -> ${i} ---- ${dist[i]}`);
}
