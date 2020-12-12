module.exports = {
    generateFiles: (num = 10) => {
        return new Promise((resolve, reject)=> {
            setTimeout(()=>{
                resolve();
            }, 15000);
        });
    },
    readFiles: () => {
        return true;
    }
}