export function createDashboardLayer(font, playerEnv) {
    const LINE1 = font.size;
    const LINE2 = LINE1 * 2;
    const coins = 24;
    return function drawDashboard(contex) {
        const { time, score } = playerEnv.playerKontroller;
        font.print('MARIO', contex, 16, LINE1);
        font.print(score.toString().padStart(6, '0'), contex, 16, LINE2);
        font.print('@x' + coins.toString().padStart(3, '0'), contex, 96, LINE2);
        font.print('WORLD', contex, 152, LINE1);
        font.print('1-1', contex, 160, LINE2);
        font.print('TIME', contex, 208, LINE1);
        font.print(time.toFixed().toString().padStart(3, '0'), contex, 216, LINE2);
    };
}
export function createGameOverLayer(font, playerEnv) {
    const LINE1 = font.size;
    const LINE2 = LINE1 * 10;
    const LINE3 = LINE2 + LINE1;
    return function drawGameOver(contex) {
        if (playerEnv.playerKontroller.gameOver) {
            font.print('TIME IS UP', contex, 100, LINE2);
            font.print('GAME OVER', contex, 105, LINE3);
        }
    };
}
