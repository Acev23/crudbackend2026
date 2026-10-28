const connection=require("../config/db");

exports.getAllUsers=(req,res)=> {
    connection.query("SELECT * FROM userdata",(err,rows,fields)=>{
        if(err) throw err;
        res.json(rows);
    }
    )
}

exports.hello=(req,res)=> {
    res.send("Hello World")
}


//get(search)
exports.getUserByID=(req,res)=> {
   const id=req.params.id;
   connection.query("SELECT * FROM userdata WHERE id=?",[id],(err, rows,fields)=>{
    if(err) throw err;
    if(rows.length>0)
        res.json(rows)
    else
        res.status(404).json ({message:"404 User not Found!"})
   })
}

exports.getUserByIP=(req,res)=> {
   const ip_address=req.params.ip_address;
   connection.query("SELECT * FROM userdata WHERE ip_address=?",[ip_address],(err, rows,fields)=>{
    if(err) throw err;
    if(rows.length>0)
        res.json(rows)
    else
        res.status(404).json ({message:"404 User not Found!"})
   })
}


exports.getUserBytwo=(req,res)=> {
 
    const ip_email=req.params.ip_email;
   connection.query("SELECT * FROM userdata WHERE (ip_address=? || email=?) ",[ip_email,ip_email],(err, rows,fields)=>{
    if(err) throw err;
    if(rows.length>0)
        res.json(rows)
    else
        res.status(404).json ({message:"404 User not Found!"})
   })
}

//POST
exports.createUser=(req,res)=>{
    //DOM
    const{fname,lname,email,gender,salary} = req.body;
    connection.query('INSERT INTO userdata (first_name, last_name, email, gender, salary) VALUES (?,?,?,?,?)',[fname,lname,email,gender,salary],
    (err,result)=>{
        if(err) throw err;
        res.json({message:"User created successfully", id:result.insertId})
    });
}

//update
exports.updateUser=(req,res)=>{
      const{id,fname,lname,email,gender,ip,salary,department} = req.body;
      connection.query('UPDATE userdata SET first_name=?, last_name=?, email=?, gender=?,ip=?, salary=? department=? WHERE id=?',
        [fname,lname,email,gender,ip,salary,department,id],
        (err,result)=>{
            if(err) throw err;
            if(result.affectedRows>0)
                res.json({message:"User created successfully", id:result.insertId})
            else
                res.status(404).json({message:'User Not Found'})

        })      
}

exports.deleteUser=(req,res)=>{
      const id = req.body;
      connection.query('DELETE FROM userdata WHERE id=?',[id],(err,result)=>{
        if(err) throw err;
          if(result.affectedRows>0)
                res.json({message:"User DELETED successfully", id:result.insertId})
            else
                res.status(404).json({message:'User Not Found'})



      })
    
}