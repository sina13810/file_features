import { Telegraf } from "telegraf";
import fs from "fs";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";

var __dirname = path.dirname(fileURLToPath(import.meta.url));

const api_token = "5728537487:AAHqOPtSF6f_1xlrjgIxDcfxIrA2YGvLxrs";

// MongoDB :
// Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);
// var db, dbo;
// // Database Name
// const dbName = "tlg_db";
// async function mongo() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log("Connected successfully to server");
//     db = client.db(dbName);
//     dbo = db;
// }

// mongo();

//End

const bot = new Telegraf(api_token);

var allowed_users = [5395286252];

var django_url = "http://65.108.1.206:8008/django-resize/";

bot.use(async (ctx) => {
    for (let i of allowed_users) {
        if (i == ctx.chat.id) {
            if (ctx.message.video) {
                let file_id = ctx.message.video.file_id;
                let vid_link = await ctx.telegram.getFileLink(file_id);
                let writable;
                try {
                    (async () => {
                        if (ctx.message.video.mime_type == "video/mp4") {
                            if (ctx.message.video.file_size < 10000000) {
                                const config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.mp4");
                                await response.data.pipe(writable);

                                // ctx.replyWithVideo({
                                //     url: "https://static.netrun.ir/video/2018/09/1535917133--hd720.mp4",
                                //     filename: "test.mp4",
                                // });

                                // console.log(vid_link);

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                let option = {
                                    method: "post",
                                    url: django_url,
                                    data: {
                                        data: "success",
                                        suffix: "mp4",
                                        desired_size: 7,
                                    },
                                    json: true,
                                };

                                await sleep(2000);

                                const dj_res = await axios(option);

                                // const dj_res = await axios.post(
                                //     django_url,
                                //     {
                                //         data: "success",
                                //         suffix: "mp4",
                                //         desired_size: 7,
                                //     },
                                //     {}
                                // );

                                console.log(dj_res);

                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.mp4",
                                        filename: "resized_vid.mp4",
                                    });
                                }
                            } else {
                                console.log("log 1");

                                let config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.mp4");
                                await response.data.pipe(writable);

                                console.log(ctx.message.video);

                                console.log("log 2");

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                const option = {
                                    method: "POST",
                                    url: django_url,
                                    data: {
                                        data: "success",
                                        suffix: "mp4",
                                        desired_size: 10,
                                    },
                                    json: true,
                                };

                                await sleep(2000);

                                const dj_res = await axios(option);

                                console.log(dj_res);

                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.mp4",
                                        filename: "resized_vid.mp4",
                                    });
                                }

                                // ctx.replyWithVideo({
                                //     url: "https://bot.bamatop.ir/file_features/Videos/output.mp4",
                                //     filename: "resized_vid.mp4",
                                // });

                                // await sleep(5000);

                                // ctx.replyWithVideo({
                                //     url: vid_link,
                                // });

                                // await sleep(7000);
                                // fs.unlink("./video.mp4", (err) => {
                                //     if (err) console.log("File wasn't deleted => error : " + err);
                                //     console.log("File was successfully deleted");
                                // });

                                // await sleep(7000);

                                /*                   await fs.unlink("./resized_video.mp4", (err) => {
                                if (err) console.log("File wasn't deleted => error : " + err);
                                console.log("File was successfully deleted");
                            }); */
                            }
                        } else if (ctx.message.video.mime_type == "video/mpeg") {
                            if (ctx.message.video.file_size > 10000000) {
                                const config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.mpeg");
                                await response.data.pipe(writable);

                                await sleep(2000);

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                const dj_res = await axios.post(django_url, {
                                    data: "success",
                                    suffix: "mpeg",
                                    desired_size: 10,
                                });

                                // ctx.replyWithVideo({
                                //     url: "https://bot.bamatop.ir/file_features/Videos/output.mpeg",
                                //     filename: "resized_vid.mpeg",
                                // });

                                // await sleep(5000);
                                // fs.unlink("./video.mpeg", (err) => {
                                //     if (err) console.log("File wasn't deleted => error : " + err);
                                //     console.log("File was successfully deleted");
                                // });
                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.mpeg",
                                        filename: "resized_vid.mpeg",
                                    });
                                }
                            } else {
                                const config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.mpeg");
                                await response.data.pipe(writable);

                                await sleep(2000);

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                const dj_res = await axios.post(django_url, {
                                    data: "success",
                                    suffix: "mpeg",
                                    desired_size: 7,
                                });

                                // ctx.replyWithVideo({
                                //     url: "https://bot.bamatop.ir/file_features/Videos/output.mpeg",
                                //     filename: "resized_vid.mpeg",
                                // });
                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.mpeg",
                                        filename: "resized_vid.mpeg",
                                    });
                                }
                            }
                        } else if (ctx.message.video.mime_type == "video/x-msvideo") {
                            if (ctx.message.video.file_size > 10000000) {
                                const config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.avi");
                                await response.data.pipe(writable);

                                await sleep(2000);

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                const dj_res = await axios.post(django_url, {
                                    data: "success",
                                    suffix: "avi",
                                    desired_size: 10,
                                });

                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.avi",
                                        filename: "resized_vid.mp4",
                                    });
                                }
                                // ctx.replyWithVideo({
                                //     url: "https://bot.bamatop.ir/file_features/Videos/output.avi",
                                //     filename: "resized_vid.mpeg",
                                // });

                                // await ctx.replyWithVideo({ url: vid_link, filename: "video.avi" });

                                // await sleep(5000);
                                // fs.unlink("./video.avi", (err) => {
                                //     if (err) console.log("File wasn't deleted => error : " + err);
                                //     console.log("File was successflly deleted");
                                // });
                            } else {
                                const config = {
                                    method: "GET",
                                    url: `${vid_link}`,
                                    header: {
                                        "cache-control": "no-cache",
                                        // "Content-Type": "application/x-www-form-urlencoded",
                                    },
                                    responseType: "stream",
                                };

                                const response = await axios(config);

                                writable = fs.createWriteStream("../Videos/video.avi");
                                await response.data.pipe(writable);

                                await sleep(2000);

                                await bot.telegram.sendMessage(ctx.chat.id, "لطفا صبر کنید...");

                                const dj_res = await axios.post(django_url, {
                                    data: "success",
                                    suffix: "avi",
                                    desired_size: 7,
                                });
                                if (dj_res.data.message == "success") {
                                    ctx.replyWithVideo({
                                        url: "https://resize.test-tlg.ir/Videos/output.avi",
                                        filename: "resized_vid.avi",
                                    });
                                }

                                // ctx.replyWithVideo({
                                //     url: "https://bot.bamatop.ir/file_features/Videos/output.avi",
                                //     filename: "resized_vid.mpeg",
                                // });
                            }
                        }
                    })();
                } catch (err) {
                    console.log("There is an error => ", err);
                }
            }
        }
    }
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function RandArray(array) {
    var rand = (Math.random() * array.length) | 0;
    var rValue = array[rand];
    return rValue;
}
bot.launch();

process.once("SIGINT", () => {
    bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
    bot.stop("SIGTERM");
});
