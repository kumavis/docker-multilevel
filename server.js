const net = require('net')
const multilevel = require('multilevel')
const hat = require('hat')
const eos = require('end-of-stream')
const prettyHrtime = require('pretty-hrtime')

module.exports = remoteDbServer


function remoteDbServer(port, db, cb) {

  net.createServer(onConnect).listen(port, cb)

  function onConnect(duplex) {

    var id = hat()
    var start = process.hrtime()
    console.log(id, '- connected')
    
    var dbStream = multilevel.server(db)
    duplex.pipe(dbStream).pipe(duplex)

    eos(duplex, function(err){
      var duration = process.hrtime(start)
      if (err) console.error(id, err)      
      console.log(id, '- disconnected', prettyHrtime(duration))
    })

  }

}

