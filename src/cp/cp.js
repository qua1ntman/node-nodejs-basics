import child_process from 'child_process'

export const spawnChildProcess = async (args) => {
    child_process.fork('./files/script.js', args)
};
