let Grafo = () => {
  let vertices = [];
  let inserirAresta = (pai, id, peso) => {
    if (vertices[pai]) {
      vertices[pai].push({ id, peso });
    } else {
      vertices[pai] = [{ id, peso }];
    }
  };
  let getVertices = () => {
    return vertices;
  };
  let getLength = () => {
    return vertices.length;
  };
  let getArestas = (id) => {
    return vertices[id];
  };
  return { inserirAresta, getVertices, getLength, getArestas };
};

// Se quiser melhorar a performance, FilaPrioridade deve ser uma HEAP
let FilaPrioridade = () => {
  let info = [];
  let inserir = (id, distancia) => {
    info.push({ id, distancia });
  };
  let removerMenor = () => {
    let idxMenor = 0;
    for (let i = 1; i < info.length; i++) {
      if (info[i].distancia < info[idxMenor].distancia) {
        idxMenor = i;
      }
    }
    return info.splice(idxMenor, 1)[0].id;
  };
  let editar = (id, distancia) => {
    for (let i = 0; i < info.length; i++) {
      if (info[i].id === id) {
        info[i].distancia = distancia;
        break;
      }
    }
  };
  let ehVazia = () => {
    return info.length === 0;
  };
  let log = () => {
    console.log(info);
  };
  return { inserir, removerMenor, editar, ehVazia, log };
};

// let PQ = FilaPrioridade();
// PQ.inserir(0, 123);
// PQ.inserir(1, 12);
// PQ.inserir(2, 10002);
// PQ.editar(2, 10);
// PQ.log();
// console.log("MENOR", PQ.removerMenor());
// PQ.log();

let dijkstra = (grafo, s) => {
  let nVertices = grafo.getLength();
  let maduro = [];
  let pai = [];
  let dist = [];
  for (let v = 0; v < nVertices; v++) {
    pai[v] = -1;
    maduro[v] = false;
    dist[v] = Number.MAX_SAFE_INTEGER;
  }
  pai[s] = s;
  dist[s] = 0;
  let PQ = FilaPrioridade();
  for (let v = 0; v < nVertices; v++) {
    PQ.inserir(v, dist[v]);
  }
  while (!PQ.ehVazia()) {
    let y = PQ.removerMenor();
    if (dist[y] === Number.MAX_SAFE_INTEGER) break; // achou uma floresta
    grafo.getArestas(y).forEach((a) => {
      if (!maduro[a.id]) {
        if (dist[a.id] > dist[y] + a.peso) {
          dist[a.id] = dist[y] + a.peso;
          PQ.editar(a.id, dist[a.id]);
          pai[a.id] = y;
        }
      }
    });
    maduro[y] = true;
  }
  return { pai, dist };
};

let grafo = Grafo();

var input = require("fs").readFileSync(__dirname + "/dev/stdin/input.txt", "utf8");
var lines = input.split("\r").join("").split("\n");

let S = parseInt(lines.shift());

let line = lines.shift();
while (line) {
  let [origem, destino, peso] = line.split(" ").map((x) => parseInt(x));
  grafo.inserirAresta(origem, destino, peso);
  grafo.inserirAresta(destino, origem, peso);
  line = lines.shift();
}
console.log(grafo.getVertices());
console.log(dijkstra(grafo, S));
