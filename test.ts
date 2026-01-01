import moonrakerClient from "./index";

async function main() {
    const client = new moonrakerClient("vanilla.local:7125");
    await client.onReady();
    console.log("ready");
    const status = await client.job.queue.status();
    console.log(status);
    console.log(`res - ${x}`);
}

main();
