import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let i = 0;
        const repeatFct = async () => {
            await new Promise((res) => setTimeout(res, 1000));
            i += 1;
            if (i >= 10) {
                reject(new Error('DB connection timed out'));
            } else if (!dbClient.isAlive()) {
                repeatFct();
            } else {
                resolve();
            }
        };
        repeatFct();
    });
};

(async () => {
    try {
        console.log(dbClient.isAlive());
        await waitConnection();
        console.log(dbClient.isAlive());
        console.log(await dbClient.nbUsers());
        console.log(await dbClient.nbFiles());
    } catch (err) {
        console.error('Error in main.js:', err);
    }
})();
