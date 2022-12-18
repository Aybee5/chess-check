// All functions created here are retrieved from  here https://github.com/oakmac/chessboardjs/
// and installed package is from https://github.com/jonschlinkert/is-plain-object

import { isPlainObject } from "is-plain-object";

const COLUMNS = "abcdefgh".split("");

function pieceCodeToFen(piece) {
  let pieceCodeLetters = piece.split("");

  // white piece
  if (pieceCodeLetters[0] === "w") {
    return pieceCodeLetters[1].toUpperCase();
  }

  // black piece
  return pieceCodeLetters[1].toLowerCase();
}
``;

function squeezeFenEmptySquares(fen: string) {
  return fen
    .replace(/11111111/g, "8")
    .replace(/1111111/g, "7")
    .replace(/111111/g, "6")
    .replace(/11111/g, "5")
    .replace(/1111/g, "4")
    .replace(/111/g, "3")
    .replace(/11/g, "2");
}

function isString(s) {
  return typeof s === "string";
}

function validSquare(square: string) {
  return isString(square) && square.search(/^[a-h][1-8]$/) !== -1;
}

function validPieceCode(code: string) {
  return isString(code) && code.search(/^[bw][KQRNBP]$/) !== -1;
}

function validPositionObject(pos) {
  if (!isPlainObject(pos)) return false;

  for (let i in pos) {
    if (!pos.hasOwnProperty(i)) continue;

    if (!validSquare(i) || !validPieceCode(pos[i])) {
      return false;
    }
  }

  return true;
}

export function useObjToFen(obj) {
  if (!validPositionObject(obj)) return false;

  let fen = "";

  let currentRow = 8;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      let square = COLUMNS[j] + currentRow;

      // piece exists
      if (obj.hasOwnProperty(square)) {
        fen = fen + pieceCodeToFen(obj[square]);
      } else {
        // empty space
        fen = fen + "1";
      }
    }

    if (i !== 7) {
      fen = fen + "/";
    }

    currentRow = currentRow - 1;
  }

  // squeeze the empty numbers together
  fen = squeezeFenEmptySquares(fen);

  return fen;
}
