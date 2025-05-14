export async function checkLogIn(): Promise<string|null> {

    const userId = localStorage.getItem("userId");
    console.log("userId", userId);    

    await new Promise<void>((resolve, reject) => {
        const delay = (Math.random() * 2000) + 700;

        return setTimeout(() => {            
            if (!userId) {
                reject("User not logged in");
            } else {
                resolve();
            }
        }, delay);
    });        
    
    return userId;
}