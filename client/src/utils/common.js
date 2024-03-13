import { computed } from 'vue'

export function useComputed(fn) {
    const cache = new Map()
    function getCache(args) {
        return cache.get(JSON.stringify(args))
    }
    return function(...args) {
        const cacheResult = getCache(args)
        if(cacheResult) {
            // console.log("直接拿到缓存结果,未执行耗时操作",cacheResult.value);
            return cacheResult.value
        }
        // console.log("未拿到缓存结果,执行了耗时操作",cacheResult,"传参: ",args);
        const result = computed(() => fn(...args))
        cache.set(JSON.stringify(args),result)
        return result.value
    }
}