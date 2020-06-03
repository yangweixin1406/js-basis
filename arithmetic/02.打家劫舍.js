/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，
 * 影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，
 * 如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * dp[n] = num + Max(dp[n - 1]);
 * 
 * 创建一个新的数组 用来存放之前盗窃的最大数量
 * 当没有房屋的时候 dp[0] = 0
 * 当只有一间房屋的时候 dp[1] = 1
 * 当有两间房屋的时候 dp[2] = Math.max(dp[1], dp[2])
 * 如果大于2的时候，则需要计算偷窃两家划算还是偷窃一家划算 dp[n] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1])
 */

const rob = (nums) => {
  const len = nums.length;
  if (!len) return 0;
  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0];
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i -1])
  }
  return dp[len];
}

console.time('start')
console.log(rob([1, 5, 3, 8, 1, 9]))
console.timeEnd('start')