/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1
 * 
 * 创建一个对象，里面所有的值都设为无穷大 用来存放最少的硬币个数
 * 当总金额为0时 dp[0] = 0
 * 当总金额为1是,判断是否有小于当前金额的币值，如果没有，返回-1，如果有则 dp[n] = Math.min(dp[n], dp[n - coin] + 1);
 */

const coinChange = (coins, amount) => {
  let dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
console.log(coinChange([1, 5, 11], 15));