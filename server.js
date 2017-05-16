// server.js
var express = require('express')
var path = require('path')
var compression = require('compression')


var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');


var app = express()

// must be first
app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory in React Router works
app.get('/oki-ui', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
/*app.get('/!*', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})*/
app.get('/oki-ui/ume/install', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/oki-ui/ume/orchestration', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.post('/api/file', function (req, res) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: './backups'});
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log('parse error: ' + err);

            res.writeHead(400, {'content-type': 'text/plain'});
            res.end("invalid request: " + err.message);
            return;
        } else {
            //util包可以查看对象的内部结构
            console.log("files are : " + util.inspect(files))

            var inputFile = (files.file)[0];
            var uploadedPath = inputFile.path;
            var dstPath = 'backups/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function (err) {
                if (err) {
                    console.log('rename error: ' + err);
                } else {
                    console.log('rename ok');
                }
            });
        }

        res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        res.write('success');
        res.end();
        console.log('response over')
    });
})


app.post('/install', function (req, res) {
    var response = {taskId: 123456, totalTime: 60}
    res.json(response)
    res.end();

    console.log('response over' + ' param is ' + req.query.host)
})

var percent = 10
var taskPercent = 0
var time = 60

var taskStatus = 'running'
var isFinished = 0


app.get('/query', function (req, res) {
    percent = percent === 100 ? percent : (percent + 10)
    taskPercent = taskPercent === 100 ? taskPercent : (taskPercent + 10)
    time = time === 0 ? time : (time - 5)
    console.log('start to query!')

    if (time === 0){
        taskStatus = 'success'
        isFinished = 1
    }

    var content = {
        stepInfo: [
            {
                id: "0088bbbd-6b5d-4b17-a8d2-43b4953531de",
                stepName: "ranoss-base_install",
                stepProgress: percent,
                stepStatus: "running",
                stepHistoryLogs: [
                    "2017-02-15 14:37:30  execute UmePackageRegisterService",
                    "2017-02-15 14:37:31  Registered NF package success",
                    "2017-02-15 14:37:31  初始化网络功能实例[VNFD=R1Base]数据。",
                    "2017-02-15 14:37:31  创建网络功能实例[VNFD=R1Base]。",
                    "2017-02-15 14:37:31  向VNFM申请资源。",
                    "2017-02-15 14:37:37  将VNFD转换成内部模型。",
                    "2017-02-15 14:37:37  调用插件，计算网络功能规格。",
                    "2017-02-15 14:37:37  开始创建网络服务实例。",
                    "2017-02-15 14:37:37  创建服务实例[ZTE_ranoss-portal_0]...",
                    "2017-02-15 14:37:49  无法创建服务实例。[download_blueprint_fail]",
                    "2017-02-15 14:37:49  创建网络功能实例[VNFD=R1Base]失败！",
                    "2017-02-15 14:37:49  向VNFM申请资源失败!",
                    "2017-02-15 14:37:49  创建网络功能实例[VNFD=R1Base]失败！",
                    "2017-02-15 14:37:49  instantiate job fail"
                ]
            }
        ],
        taskProgress: taskPercent,
        taskStatus: taskStatus,
        isFinished: isFinished,
        totalTime: time
    }

    res.json(content);
    res.end();
})


//orchestration
app.get('/ume/smallProducts/orchestration', function (req, res) {
    console.log("get vnfds")
    var content = {
        vnfds: [
            {
                name: "ranoss-portal.csar",
            },
            {
                name: "ranoss-base.csar",
            },
            {
                name: "ranoss-necontroll",
                nfd:[
                    {
                        name: "ranoss-cm.csar",
                    },
                    {
                        name: "ranoss-mt.csar",
                    },
                    {
                        name: "ranoss-infocollect.csar",
                    },
                    {
                        name: "ranoss-analysis.csar"
                    },
                    {
                        name: "ranoss-security.csar"
                    },
                    {
                        name: "ranoss-deploy.csar"
                    },
                    {
                        name: "ranoss-hwm.csar"
                    },
                    {
                        name: "ranoss-pub.csar"
                    }
                ]
            }
        ],
    }

    res.json(content);
    res.end();
})


var PORT = process.env.PORT || 8082
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})
