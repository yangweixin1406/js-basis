/**
 * 假设你正在爬楼梯，需要n阶才可以爬到楼顶，
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢
 * 0 1 2 3 5 8 ····找到规律了，第三阶台阶开始最后一个数等于前面两个数的和
 * 
 * dp[0] = 0, dp[1] = 1, dp[2] = 2
 * dp[n] = dp[n - 1] + dp[n - 2]   到达第n阶台阶有n-1阶走一步和n-2阶走一步
 */

const climbStairs = (n) => {
  let dp = [];
  dp[0] = 0; dp[1] = 1; dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(climbStairs(4));
