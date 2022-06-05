export const parseEnv = () => {
    for (const [key, value] of Object.entries(process.env)) {
        console.log(`RSS_${key}=${value}`);
      }
};
