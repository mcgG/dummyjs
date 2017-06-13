var mysql = require('mysql');
var conf = require('./DBConfig');
var sql = require('./sqlMapping');

var pool = mysql.createPool(conf.mysql);

var jsonWrite = (res, ret) => {
    if (typeof ret === 'undefined') {
        res.json({
            code: '-200',
            msg: 'Failed'
        });    
    } else {
        res.json(ret);    
    }
    return 
}

module.exports = {
    
    add: function(params) {
        pool.getConnection((err, conn) => {
            conn.query(sql.Insert, [params.fileName, params.path], (err, result) => {
                if (err) {
                    console.log(sql.Insert);
                    console.log(params.fileName, params.path);
                    console.log('Insert error', err);
                    conn.release();
                    return;
                }
                conn.release();
                return result;
            });
        });    
    },

    update: function(params) {
        pool.getConnection((err, conn) => {
            conn.query(sql.Update, [params.fileName], (err, result) => {
                if (err) {
                    console.log('Update error', err);
                    conn.release();
                    return;
                }    
                conn.release();
                return result;
            });
        });    
    },  

    queryByDateRange: function(req, res, next) {
        pool.getConnection((err, conn) => {
            conn.query(sql.QueryByDateRange, [params.startDate, parmas.endDate], (err, result) => {
                if (err) {
                    console.log('Query error', err);
                    conn.release();
                    return;
                }    
                conn.release();
                return result;
            });    
        });    
    },

    queryAll: function(req, res, next) {
        pool.getConnection((err, conn) => {
            conn.query(sql.QueryAll, [], (err, result) => {
                if (err) {
                    console.log('Query all error', err);
                    conn.release();
                    return;
                }    
                jsonWrite(res, result);
                conn.release();
                return result;
            });    
        });    
    }

    

}

