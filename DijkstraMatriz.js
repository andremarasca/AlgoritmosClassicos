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
      if (info[i].id[0] === id[0] && info[i].id[1] === id[1]) {
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

let mapa = [];
let maduro = [];
let pai = [];
let dist = [];
for (let i = 0; i < altura; i++) {
  mapa[i] = [];
  maduro[i] = [];
  pai[i] = [];
  dist[i] = [];
  for (let j = 0; j < largura; j++) {
    mapa[i][j] = 1;
  }
}

let dijkstra = (u, v) => {
  let mascara = [
    [-1, 0],
    [0, +1],
    [+1, 0],
    [0, -1],
  ];
  for (let i = 0; i < altura; i++) {
    for (let j = 0; j < largura; j++) {
      pai[i][j] = -1;
      maduro[i][j] = false;
      dist[i][j] = Number.MAX_SAFE_INTEGER;
    }
  }
  pai[u][v] = s;
  dist[u][v] = 0;
  let PQ = FilaPrioridade();
  for (let i = 0; i < altura; i++) {
    for (let j = 0; j < largura; j++) {
      PQ.inserir([i, j], dist[i][j]);
    }
  }
  while (!PQ.ehVazia()) {
    let [u, v] = PQ.removerMenor();
    if (dist[u][v] === Number.MAX_SAFE_INTEGER) break;
    mascara.forEach((coordenadas) => {
      let [du, dv] = coordenadas;
      let nu = u + du;
      let nv = v + dv;
      if (mapa[nu][nv] >= 0) {
        if (!maduro[nu][nv]) {
          if (dist[nu][nv] > dist[u][v] + mapa[nu][nv]) {
            dist[nu][nv] = dist[u][v] + mapa[nu][nv];
            PQ.editar([nu, nv], dist[nu][nv]);
            dist[nu][nv] = [u, n];
          }
        }
      }
    });
    /*grafo.getArestas(y).forEach((a) => {
      if (!maduro[a.id]) {
        if (dist[a.id] > dist[y] + a.peso) {
          dist[a.id] = dist[y] + a.peso;
          PQ.editar(a.id, dist[a.id]);
          pai[a.id] = y;
        }
      }
    });*/
    maduro[u][v] = true;
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
