export function createDashboardLayer(font, playerEnv) {
  const LINE1 = font.size;
  const LINE2 = font.size * 2;


  return function drawDashboard(context) {
    const {score, time} = playerEnv.playerController;

    font.print('TROLLIO', context, 10, LINE1);
    font.print(score.toString().padStart(6, '0'), context, 14, LINE2);
    font.print('TIME', context, 204, LINE1);
    font.print(time.toFixed().toString().padStart(3, '0'), context, 208, LINE2);

  };
}
