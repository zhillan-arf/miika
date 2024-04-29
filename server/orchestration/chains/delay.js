const delay = async (s) => {
    const ms = (Math.floor(Math.random() * s) + 1) * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
} 

export default delay;