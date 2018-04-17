const connect = (req, res) => {
  const { id, password } = req.body;

  if(id === '' || password === ''){
    res.sendStatus(400);
  }else {
    connection.query(`select * from users where id='${id}'`, (err, rows) => {
      if(!rows.length || rows[0].password !== password){
        res.sendStatus(400);
      }else {
        res.redirect(`/main/?num=${rows[0].num}`);
      }
    })
  }
};

module.exports = {
  connect
}
