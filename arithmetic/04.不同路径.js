/**
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）
 * 
 * 假设是一个 1 * 2 或者是 2 * 1 的网格 则不同路径为 1
 * 假设是一个 2 * 2 的网格，不同路径为 2
 * 假设是一个 3 * 2 或者是 2 * 3 的网格，不同路径为 4
 */
const uniquePath = (m, n) => {
  if (m === 1 && n ===1) return 1;
  let data = [], rows = [0];
  for (let i = 0; i < n - 1; i++) {
    rows.push(1);
  }
  data.push(rows);
  for (let i = 0; i < m - 1; i++) {
    data.push(1);
  }
}