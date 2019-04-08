var express = require('express');
var router = express.Router();
var mongodb = require("mongodb-curd");
var dbBase = "month";
var dbColl = "list";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//添加
router.post("/add", function(req, res, next) {
        var params = req.body;
        var name = params.name;
        var content = params.content;
        var height = params.height;
        var price = params.price;
        var type = params.type;
        mongodb.insert(dbBase, dbColl, { name: name, content: content, height: height, price: price, type: type }, function(result) {
            if (result) {
                res.send({ code: 0, msg: "添加成功" });
            } else {
                res.send({ code: 1, msg: "添加失败" });
            }
        })
    })
    //查询
router.get('/list', function(req, res, next) {
    var params = req.query;
    var page = params.page;
    var pageSize = params.pageSize;
    var search = params.search ? { name: { $regex: params.search } } : {};
    mongodb.find(dbBase, dbColl, search, function(result) {
        var len = result.length;
        var total = Math.ceil(len / pageSize);
        getData(total);
    })

    function getData(total) {
        var skip = (page - 1) * pageSize;
        mongodb.find(dbBase, dbColl, search, function(result) {
            if (result.length > 0) {
                res.send({ code: 0, data: result, total: total });
            } else {
                res.send({ code: 1, msg: "查找失败" })
            }
        }, {
            skip: skip,
            limit: pageSize
        })
    }
});

module.exports = router;