// Only called jsx, so that is compiles into pure javascript.

export function findBestMove(stateManager) {
    let bestMove = null;
    // finds the maximal move

    const possibleMoves = stateManager.getPossibleMoves()

    for (let i = 0; i < possibleMoves.length; i++) {
        const possibleBestMove = possibleMoves[i];
        const safeBestMoveStrength = bestMove.strength === null? 0: bestMove.strength;
        if (possibleBestMove.strength > safeBestMoveStrength) {
            bestMove = possibleBestMove
        }
    }

    return bestMove;
}