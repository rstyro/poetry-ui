// 延时方法
export const sleep=(time:number) =>{
    return new Promise((resolve) => setTimeout(resolve, time));
}