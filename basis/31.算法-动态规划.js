/**
 * 动态规划算法：把原有的大问题逐渐分解成类似但是规模更小的子问题
 * 凑出n最少需要多少个硬币？ 硬币面值：[11, 5, 1];
 * 
 * 假设 1，5，11分别为最后一枚硬币：
 * 最后一枚硬币的面额为11: min = f(4) + 1;
 * 最后一枚硬币的面额为5： min = f(10) + 1;
 * 最后一枚硬币的面额为1： min = f(14) + 1;
 * 
 * f(n) = min(f(n - 1), f(n - 5), f(n - 11)) + 1;
 */

function f1(n) {
  if (n === 0) return 0;
  let min = Infinity;
  if (n >= 1) {
    min = Math.min(f(n - 1) + 1, min);
  }

  if (n >= 5) {
    min = Math.min(f(n - 5) + 1, min);
  }

  if (n >= 11) {
    min = Math.min(f(n - 11) + 1, min);
  }
  return min;
}

/**
 * 缓存集合优化
 * [记忆化搜索]
 * @param {*} n 
 */
function f2(n) {
  function makeChange(amount) {
    if (amount <= 0) return 0;
    
    if (cache[amount]) return cache[amount];
  
    let min = Infinity;
    if (amount >= 1) {
      min = Math.min(makeChange(amount - 1) + 1, min);
    }
  
    if (amount >= 5) {
      min = Math.min(makeChange(amount - 5) + 1, min);
    }
  
    if (amount >= 11) {
      min = Math.min(makeChange(amount - 11) + 1, min);
    }

    return (cache[amount] = min);
  }

  // 备忘录（缓存）
  const cache = [];
  return makeChange(n);
}

/**
 * 动态规划通常使用迭代解决递归问题
 *     通过小规模问题递推来解决大规模问题
 * f[n] = min(f[n - 1], f[n - 5], f[n - 15]) + 1;
 */


// 通用的找零问题
const coinChange = (coins, amount) => {
  const dp = new Array(amount + 1).fill(Infinity);

  dp[0] = 0;

  for (let i = 0; i < amount; i++) {
    for (const coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.time('start');
console.log(coinChange([1, 5, 11], 15));
console.timeEnd('start');