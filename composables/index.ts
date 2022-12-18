export function truthy(val) {
  if (Array.isArray(val)) {
    return val.some(truthy);
  } else if (val === null) {
    return false;
  } else if (typeof val === "object") {
    return Object.values(val).some(truthy);
  } else {
    // primitives work well with !!
    return !!val;
  }
}

export const useDropFalsy = (obj) => {
  let truths = {};
  for (let [key, value] of Object.entries(obj)) {
    if (truthy(value)) {
      truths[key] = value;
    }
  }
  return truths;
};

export const useValidatePieces = (fen: string) => {
  let totalWhite = 0;
  let totalBlack = 0;
  let totalWhitePawns = 0;
  let totalBlackPawns = 0;
  let totalWhiteKnights = 0;
  let totalBlackKnights = 0;
  let totalWhiteBishops = 0;
  let totalBlackBishops = 0;
  let totalWhiteRooks = 0;
  let totalBlackRooks = 0;
  let totalWhiteQueens = 0;
  let totalBlackQueens = 0;
  let totalWhiteKings = 0;
  let totalBlackKings = 0;
  let totalUnknown = 0;
  for (let c of fen) {
    switch (c) {
      case "P":
        totalWhitePawns++;
        break;
      case "p":
        totalBlackPawns++;
        break;
      case "N":
        totalWhiteKnights++;
        break;
      case "n":
        totalBlackKnights++;
        break;
      case "B":
        totalWhiteBishops++;
        break;
      case "b":
        totalBlackBishops++;
        break;
      case "R":
        totalWhiteRooks++;
        break;
      case "r":
        totalBlackRooks++;
        break;
      case "Q":
        totalWhiteQueens++;
        break;
      case "q":
        totalBlackQueens++;
        break;
      case "K":
        totalWhiteKings++;
        break;
      case "k":
        totalBlackKings++;
        break;
      default:
        totalUnknown++;
    }
  }
  if (totalWhitePawns > 8) {
    throw "Too many white pawns on the board.";
  }
  if (totalWhiteKnights > 10) {
    throw "Too many white knights on the board.";
  }
  if (totalWhiteBishops > 10) {
    throw "Too many white bishops on the board.";
  }
  if (totalWhiteRooks > 10) {
    throw "Too many white rooks on the board.";
  }
  if (totalWhiteQueens > 9) {
    throw "Too many white queens on the board.";
  }
  if (totalWhiteKings > 1) {
    throw "Only 1 white king can be on the board";
  }
  if (totalWhiteKings < 1) {
    throw "A white king must be on the board";
  }
  if (totalWhite > 16) {
    throw "Too many white pieces on the board.";
  }
  if (totalBlackPawns > 8) {
    throw "Too many black pawns on the board.";
  }
  if (totalBlackKnights > 10) {
    throw "Too many black knights on the board.";
  }
  if (totalBlackBishops > 10) {
    throw "Too many black bishops on the board.";
  }
  if (totalBlackRooks > 10) {
    throw "Too many black rooks on the board.";
  }
  if (totalBlackQueens > 9) {
    throw "Too many black queens on the board.";
  }
  if (totalBlackKings > 1) {
    throw "Only 1 black king can be on the board";
  }
  if (totalBlackKings < 1) {
    throw "A black king must be on the board";
  }
  if (totalBlack > 16) {
    throw "Too many black pieces on the board.";
  } else {
    return true;
  }
};
