let tempo;
let tempos = [];

function DFSR(mapa, i, j, M, N, delta, arvores) {
    console.error(i, j, arvores);
    delta.forEach(([di, dj]) => {
        let ni = i + di;
        let nj = j + dj;
        if (0 <= ni && ni < M && 0 <= nj && nj < N) {
            if (mapa[ni][nj] == "#") {
                mapa[ni][nj] = arvores;
                DFSR(mapa, ni, nj, M, N, delta, arvores);
            }
        }
    });
}

let DFS = (mapa) => {
    let delta = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];
    let [M, N] = [mapa.length, mapa[0].length];
    let arvores = 0;
    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            if (mapa[i][j] == "#") {
                mapa[i][j] = arvores;
                DFSR(mapa, i, j, M, N, delta, arvores);
                arvores++;
            }
        }
    }
};

let readline = ((lixo) => {
    let idx = 0;
    const linhas = ["##.....####....", "##..#...####...", "....#..####..#.", "##.....####..#."];
    let getLinhas = (lixo) => linhas[idx++];
    return getLinhas;
})();

let map = [];
let line = readline();
while (line) {
    map.push(line.split(""));
    line = readline();
}
let M = map.length;
let N = map[0].length;

for (let i = 0; i < map.length; i++) {
    console.error(map[i].join(""));
}

DFS(map);

for (let i = 0; i < map.length; i++) {
    console.error(map[i].join(""));
}
